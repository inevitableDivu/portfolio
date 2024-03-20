import React from "react";
import { ArrowUp, GithubIcon, Instagram, Mail, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socials = {
	github: GithubIcon,
	instagram: Instagram,
	linkedin: Linkedin,
	twitter: Twitter,
	mail: Mail,
};

function SocialButtons() {
	return (
		<div className="fixed inset-x-0 bottom-0 sm:relative sm:bg-transparent backdrop-blur-md p-5 sm:p-0 flex items-center justify-around sm:justify-start sm:gap-8 z-50 sm:z-20">
			{Object.keys(socials).map((key, index) => {
				const Icon = socials[key as keyof typeof socials];
				return (
					<Link
						href={"#"}
						className={cn(
							"flex-1 sm:flex-none flex items-center justify-center sm:text-stone-800 dark:sm:text-stone-200 group",
							{
								"border-r-2 border-zinc-500/20 sm:border-none":
									index !== Object.keys(socials).length - 1,
							}
						)}
					>
						<Icon className="h-5 w-5 group-hover:scale-125 transition-all duration-300" />
					</Link>
				);
			})}
		</div>
	);
}

export default SocialButtons;
