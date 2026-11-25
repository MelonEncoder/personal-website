import { getContext, setContext } from "svelte";
import type { Pathname } from "$app/types";
import { APPS } from "./apps";
import { folderForRoute, getNode } from "./fs";
import type { AppId, WinProps } from "./types";

export interface Win {
	id: string;
	appId: AppId;
	props: WinProps;
	x: number;
	y: number;
	w: number;
	h: number;
	z: number;
	minimized: boolean;
}

/** Leaves room for the desktop icon column on the left. */
const CASCADE_ORIGIN = { x: 132, y: 20 };
const CASCADE_STEP = 28;

export function normalizePath(path: string) {
	return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Which window a site route should open, if any. */
export function windowForRoute(path: string): { appId: AppId; props: WinProps } | undefined {
	const route = normalizePath(path);
	if (route === "/") return undefined;
	for (const [appId, app] of Object.entries(APPS) as [AppId, (typeof APPS)[AppId]][]) {
		if (appId !== "explorer" && app.route?.({}) === route) return { appId, props: {} };
	}
	const folder = folderForRoute(route);
	if (folder !== undefined) return { appId: "explorer", props: { path: folder } };
	return undefined;
}

export class WindowManager {
	windows = $state<Win[]>([]);
	/** Size of the area windows live in; updated by the layout on the client. */
	area = $state({ w: 1280, h: 760 });

	#z = 0;
	#opened = 0;
	#nextId = 0;

	// Plain getters rather than $derived: on the server, a derived value is computed once and
	// would miss windows opened during the same render.
	get active(): Win | undefined {
		let top: Win | undefined;
		for (const win of this.windows) {
			if (!win.minimized && (!top || win.z > top.z)) top = win;
		}
		return top;
	}

	/** The route the active window represents, if it has one. */
	get activeRoute(): Pathname | undefined {
		const win = this.active;
		return win ? APPS[win.appId].route?.(win.props) : undefined;
	}

	open(appId: AppId, props: WinProps = {}): Win {
		const app = APPS[appId];
		const key = app.key(props);
		const existing = this.windows.find((w) => w.appId === appId && app.key(w.props) === key);
		if (existing) {
			// Single-instance apps (e.g. Explorer) adopt the new props, such as a new folder.
			existing.props = { ...props };
			this.focus(existing.id);
			return existing;
		}

		const w = Math.min(app.size.w, Math.max(320, this.area.w - CASCADE_ORIGIN.x - 16));
		const h = Math.min(app.size.h, Math.max(240, this.area.h - CASCADE_ORIGIN.y - 16));
		const step = (this.#opened++ % 8) * CASCADE_STEP;
		const x = Math.max(0, Math.min(CASCADE_ORIGIN.x + step, this.area.w - w));
		const y = Math.max(0, Math.min(CASCADE_ORIGIN.y + step, this.area.h - h));

		this.windows.push({
			id: `win-${++this.#nextId}`,
			appId,
			props: { ...props },
			x,
			y,
			w,
			h,
			z: ++this.#z,
			minimized: false
		});
		return this.windows[this.windows.length - 1];
	}

	/** Opens or focuses the window for a route. Returns false if the route has none. */
	openRoute(path: string): boolean {
		const target = windowForRoute(path);
		if (!target) return false;
		const active = this.active;
		const app = APPS[target.appId];
		// Already showing this route, so leave it alone (avoids churn from URL sync).
		if (active && app.route?.(active.props) === normalizePath(path)) return true;
		this.open(target.appId, target.props);
		return true;
	}

	/** Opens whatever lives at a virtual filesystem path: folder → Explorer, document → Preview. */
	openPath(path: string) {
		const node = getNode(path);
		if (!node) return;
		if (node.kind === "folder") this.open("explorer", { path });
		else if (node.kind === "app") this.open(node.app);
		else this.open("preview", { path });
	}

	/** Pulls windows back inside the desktop, e.g. after a resize or server-side sizing. */
	clampToArea() {
		const { w: areaW, h: areaH } = this.area;
		if (areaW <= 0 || areaH <= 0) return;
		for (const win of this.windows) {
			const w = Math.min(win.w, areaW);
			const h = Math.min(win.h, areaH);
			const x = Math.max(0, Math.min(win.x, areaW - w));
			const y = Math.max(0, Math.min(win.y, areaH - h));
			if (w !== win.w) win.w = w;
			if (h !== win.h) win.h = h;
			if (x !== win.x) win.x = x;
			if (y !== win.y) win.y = y;
		}
	}

	get(id: string) {
		return this.windows.find((w) => w.id === id);
	}

	focus(id: string) {
		const win = this.get(id);
		if (!win) return;
		win.minimized = false;
		if (win.z !== this.#z) win.z = ++this.#z;
	}

	minimize(id: string) {
		const win = this.get(id);
		if (win) win.minimized = true;
	}

	close(id: string) {
		this.windows = this.windows.filter((w) => w.id !== id);
	}

	closeAll() {
		this.windows = [];
		this.#opened = 0;
	}
}

const KEY = Symbol("window-manager");

export function setWindowManager(wm: WindowManager) {
	return setContext(KEY, wm);
}

export function getWindowManager(): WindowManager {
	return getContext<WindowManager>(KEY);
}
