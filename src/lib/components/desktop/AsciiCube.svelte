<script lang="ts">
	import { onMount } from "svelte";

	/**
	 * A cube drawn in text characters, spinning on two axes, for the boot screen. Each face
	 * is shaded by how much it faces a light above the viewer, and the edges are drawn in
	 * `#` so the shape still reads when two faces are lit alike. With reduced motion it
	 * shows one still frame.
	 */

	const COLS = 44;
	const ROWS = 22;
	/** Distance from the viewer to the cube's center, in cube half-widths. */
	const DISTANCE = 5;
	/**
	 * Projection scale; rows are about twice as tall as columns are wide. A corner can
	 * reach about 0.53 × scale from the center, which just fits the grid.
	 */
	const SCALE_X = 40;
	const SCALE_Y = 21;
	/** Points sampled along each face edge. */
	const STEPS = 60;
	/** Dark to bright. */
	const SHADES = ".,-~:;=!*$@";
	const EDGE = "#";
	/** Light from above, toward the viewer. */
	const LIGHT_Y = Math.SQRT1_2;
	const LIGHT_Z = -Math.SQRT1_2;

	let frame = $state(render(0.6, 0.8));

	function render(a: number, b: number): string {
		const chars: string[] = new Array(COLS * ROWS).fill(" ");
		const depth = new Float32Array(COLS * ROWS);
		const ca = Math.cos(a);
		const sa = Math.sin(a);
		const cb = Math.cos(b);
		const sb = Math.sin(b);

		// Rotate around the x axis by `a`, then the y axis by `b`.
		const rotate = (x: number, y: number, z: number): [number, number, number] => {
			const y1 = y * ca - z * sa;
			const z1 = y * sa + z * ca;
			return [x * cb + z1 * sb, y1, -x * sb + z1 * cb];
		};

		for (let axis = 0; axis < 3; axis++) {
			for (const side of [-1, 1]) {
				const normal: [number, number, number] = [0, 0, 0];
				normal[axis] = side;
				const [, ny, nz] = rotate(...normal);
				const light = ny * LIGHT_Y + nz * LIGHT_Z;
				const shade =
					SHADES[Math.max(0, Math.round((light * 0.5 + 0.5) * (SHADES.length - 1)))];

				for (let i = 0; i <= STEPS; i++) {
					const u = (i / STEPS) * 2 - 1;
					for (let j = 0; j <= STEPS; j++) {
						const v = (j / STEPS) * 2 - 1;
						const point: [number, number, number] = [0, 0, 0];
						point[axis] = side;
						point[(axis + 1) % 3] = u;
						point[(axis + 2) % 3] = v;
						const [x, y, z] = rotate(...point);

						const ooz = 1 / (z + DISTANCE);
						const col = Math.floor(COLS / 2 + SCALE_X * x * ooz);
						const row = Math.floor(ROWS / 2 - SCALE_Y * y * ooz);
						if (col < 0 || col >= COLS || row < 0 || row >= ROWS) continue;

						// Edges win ties with the faces next to them, so the outline stays solid.
						const onEdge = Math.abs(u) > 0.98 || Math.abs(v) > 0.98;
						const index = row * COLS + col;
						const nearness = ooz + (onEdge ? 0.01 : 0);
						if (nearness <= depth[index]) continue;
						depth[index] = nearness;
						chars[index] = onEdge ? EDGE : shade;
					}
				}
			}
		}

		const lines: string[] = [];
		for (let row = 0; row < ROWS; row++) {
			lines.push(chars.slice(row * COLS, (row + 1) * COLS).join(""));
		}
		return lines.join("\n");
	}

	onMount(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let raf = 0;
		let last = 0;
		const tick = (time: number) => {
			// About 30 frames a second is plenty for text.
			if (time - last >= 33) {
				last = time;
				frame = render(0.6 + time * 0.0009, 0.8 + time * 0.0006);
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<pre class="cube" aria-hidden="true">{frame}</pre>

<style>
	.cube {
		margin: 0 auto;
		font-family: var(--font-terminal), monospace;
		/* Shrinks on narrow and on short screens, so the login form still fits below it. */
		font-size: clamp(0.45rem, min(2.2vw, 1.1vh), 0.8rem);
		line-height: 1.1;
		color: var(--accent);
		user-select: none;
	}
</style>
