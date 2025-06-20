import Wrapper from "@/components/animation-wrapper";
import Heading from "@/components/heading";
import { beamStyle, profile, user } from "@/constants/data";
import { formatText } from "@/lib/markdown";
import { cn } from "@/lib/utils";

const AboutRenderer = (props: { text: React.ReactNode }) => {
	return (
		<p
			className={cn(
				"dark:font-normal text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-700",
				beamStyle
			)}
		>
			{props.text}
		</p>
	);
};

const StatRenderer = (props: { title: number | string; description: string }) => {
	return (
		<div className="px-4 md:px-16 flex flex-col gap-4">
			<div className="text-2xl md:text-4xl font-semibold">{props.title}+</div>
			<div className="text-[#0F172A]/50 text-xs font-medium md:font-normal md:text-base">
				{props.description}
			</div>
		</div>
	);
};

function Home() {
	return (
		<Wrapper>
			<div className="text-xl uppercase text-zinc-400 font-medium mt-10 sm:mt-16">
				Hey, I&apos;m {user.name}
			</div>
			<Heading>Full Stack Developer</Heading>
			<div className="space-y-3 flex flex-col">
				{Array.isArray(profile.about) ? (
					profile.about.map((item, index) => (
						<AboutRenderer key={index} text={String(item)} />
					))
				) : (
					<AboutRenderer text={formatText(String(profile.about))} />
				)}
			</div>

			<div className="flex-1 mb-0 my-16 flex items-center justify-center">
				<div className="grid grid-cols-3 divide-x-[0.5px] divide-[#0F172A]/20">
					<StatRenderer title={15} description="Full Stack Projects" />
					<StatRenderer title={3} description="Years of Experience" />
					<StatRenderer title={"300K"} description="Lines of code" />
				</div>
			</div>
		</Wrapper>
	);
}

export default Home;
