import Text from "@/components/text.rich";
import Link from "next/link";

function Home() {
	return (
		<div className="py-20 lg:pt-48 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto space-y-6">
			<h1 className="uppercase font-semibold text-4xl tracking-widest text-stone-900">
				I&apos;m Divyansh Pandey
			</h1>
			<p className="text-xs md:text-sm leading-[2.5] md:leading-loose tracking-wide font-normal">
				Your friendly neighborhood <Text>Full Stack Developer</Text>
				,&nbsp;
				<Text>JavaScript Developer</Text> and <Text>Mobile App Developer</Text>. I spend my
				days (and often all nights) painting the canvas of internet or your mobile phone
				screen with <Text href="/projects">Projects</Text> and lines of code, turning zeros
				and ones (0&apos;s and 1&apos;s) into something which feels like immersive and
				provides interactive experiences.
			</p>
		</div>
	);
}

export default Home;
