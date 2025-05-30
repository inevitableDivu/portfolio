import Wrapper from "@/components/animation-wrapper";
import Heading from "@/components/heading";
import CustomLink from "@/components/link";
import { beamStyle, profile, user } from "@/constants/data";
import { ABOUT_FORMAT_CONSTANTS, formatText } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

function Home() {
	return (
		<Wrapper>
			<div className="text-xl uppercase text-zinc-400 font-medium mt-16">
				Hey, I&apos;m {user.name}
			</div>
			<div className="text-theme-purple text-5xl font-medium mt-6 mb-12">
				Full Stack Developer
			</div>
			<div className="space-y-3 flex flex-col">
				{Array.isArray(profile.about) ? (
					profile.about.map((para, index) => (
						<p
							key={index}
							className={cn(
								"dark:font-normal text-2xl leading-relaxed text-gray-700",
								beamStyle
							)}
						>
							{para}
						</p>
					))
				) : (
					<p
						className={cn(
							"dark:font-normal text-2xl leading-relaxed text-gray-700",
							beamStyle
						)}
					>
						{formatText(String(profile.about))}
					</p>
				)}
			</div>
			<div className="flex-1 my-16 flex items-center justify-center">
				<div className="grid grid-cols-3 divide-x-[0.5px] divide-[#0F172A]/20">
					<div className="px-16 flex flex-col gap-4">
						<div className="text-4xl font-semibold">15+</div>
						<div className="text-[#0F172A]/50">Full Stack Projects</div>
					</div>
					<div className="px-20 flex flex-col gap-4">
						<div className="text-4xl font-semibold">3+</div>
						<div className="text-[#0F172A]/50">Years of Experience</div>
					</div>
					<div className="px-20 flex flex-col gap-4">
						<div className="text-4xl font-semibold">10+</div>
						<div className="text-[#0F172A]/50">Mobile Apps</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}

export default Home;
