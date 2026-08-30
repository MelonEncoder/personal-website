import type { Pathname } from "$app/types";

export interface FolderProps {
	label: string;
	description?: string;
	url: Pathname;
	tag: string;
	icon: string;
	iconAlt: string;
}
