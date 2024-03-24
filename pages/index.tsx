import Wrapper from "@/components/animation-wrapper";
import CustomLink from "@/components/link";
import SocialButtons from "@/components/social.button";
import { beamStyle, profile, user } from "@/constants/data";
import { formatAbout } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

function Home() {
	return (
		<Wrapper>
			<h1
				className={cn(
					"uppercase font-semibold text-4xl tracking-widest text-slate-900 dark:text-slate-200 mt-8 mb-6",
					beamStyle
				)}
			>
				I&apos;m {user.name}
			</h1>
			<div className="space-y-3 flex flex-col">
				{Array.isArray(profile.about) ? (
					profile.about.map((para, index) => (
						<p
							key={index}
							className={cn(
								"text-xs dark:font-normal md:text-sm leading-[2.5] md:leading-[2.5] lg:leading-[2.5] tracking-wide z-20",
								beamStyle
							)}
						>
							{formatAbout(para)}
						</p>
					))
				) : (
					<p
						className={cn(
							"text-xs dark:font-normal md:text-sm leading-[2.5] md:leading-[2.5] lg:leading-[2.5] tracking-wide z-20",
							beamStyle
						)}
					>
						{formatAbout(String(profile.about))}
					</p>
				)}
			</div>
			<br className="hidden md:block" />
			<div className="my-3 md:my-0">
				<div className="flex items-center gap-3">
					<CustomLink
						href="/about"
						underlineClass="origin-left mx-0"
						className="text-sm dark:text-white"
					>
						<span>See more about me</span>{" "}
					</CustomLink>
					<span className="rotate-90">
						<ArrowUp className="h-5 w-5 animate-bounce" />
					</span>
				</div>
			</div>
			<br className="hidden md:block" />
			<br className="hidden md:block" />
			<SocialButtons />
		</Wrapper>
	);
}

export default Home;
