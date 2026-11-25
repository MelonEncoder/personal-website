import githubLogo from "#lib/assets/logos/github.svg";
import itchLogo from "#lib/assets/logos/itch.svg";
import linkedinLogo from "#lib/assets/logos/linkedin.svg";

export interface ExternalLink {
	label: string;
	handle: string;
	href: string;
	icon: string;
	alt: string;
}

/** Ian's external profiles, shown in the Links app and on the About page. */
export const LINKS: ExternalLink[] = [
	{
		label: "GitHub",
		handle: "MelonEncoder",
		href: "https://github.com/MelonEncoder",
		icon: githubLogo,
		alt: "GitHub logo"
	},
	{
		label: "itch.io",
		handle: "karpoonz",
		href: "https://karpoonz.itch.io/",
		icon: itchLogo,
		alt: "Itch.io logo"
	},
	{
		label: "LinkedIn",
		handle: "iangillette",
		href: "https://www.linkedin.com/in/iangillette",
		icon: linkedinLogo,
		alt: "LinkedIn logo"
	}
];
