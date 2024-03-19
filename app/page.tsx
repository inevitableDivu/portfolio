import Text from "@/components/text.rich";
import { beamStyle, profile, user } from "@/constants/data";
import { formatAbout } from "@/lib/markdown";
import { cn } from "@/lib/utils";

function Home() {
	return (
		<div className="py-20 lg:pt-48 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto space-y-6 flex flex-col z-20">
			<h1
				className={cn(
					"uppercase font-semibold text-4xl tracking-widest text-stone-900 dark:text-stone-200",
					beamStyle
				)}
			>
				I&apos;m {user.name}
			</h1>
			<p
				className={cn(
					"text-xs md:text-sm leading-[2.5] md:leading-[2.5] tracking-wide font-normal",
					beamStyle
				)}
			>
				{formatAbout(profile.about)}
			</p>
		</div>
	);
}

export default Home;
