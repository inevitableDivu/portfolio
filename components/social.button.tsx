import { socialNetworks } from "@/constants/data";
import { cn } from "@/lib/utils";
import { GithubIcon, Instagram, Linkedin, LucideIcon, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const socials: Record<keyof typeof socialNetworks, { url: string; icon: LucideIcon }> = {
	github: {
		url: "https://github.com/",
		icon: GithubIcon,
	},
	instagram: {
		url: "https://www.instagram.com/",
		icon: Instagram,
	},
	linkedin: {
		url: "https://www.linkedin.com/in/",
		icon: Linkedin,
	},
	twitter: {
		url: "https://twitter.com/",
		icon: Twitter,
	},
	email: {
		url: "mailto:",
		icon: Mail,
	},
};

function SocialButtons() {
	return (
		<div className="fixed inset-x-0 bottom-0 sm:relative sm:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 sm:p-0 flex items-center justify-around sm:justify-start sm:gap-8 z-50 sm:z-20">
			{Object.keys(socials).map((key, index) => {
				let value = key as keyof typeof socialNetworks;
				const Icon = socials[value];
				const url = `${Icon.url}${socialNetworks[value]}`;

				if (socialNetworks[value] === "") return null;
				return (
					<Link
						target="_blank"
						key={key}
						href={url}
						className={cn(
							"flex-1 sm:flex-none flex items-center justify-center sm:text-slate-800 dark:sm:text-slate-200 group",
							{
								"border-r-2 border-zinc-500/20 sm:border-none":
									index !== Object.keys(socials).length - 1,
							}
						)}
					>
						<Icon.icon className="h-5 w-5 group-hover:scale-125 transition-all duration-300" />
					</Link>
				);
			})}
		</div>
	);
}

export default SocialButtons;
