import BackgroundBeams from "@/components/background-beams";
import BackgroundBoxes from "@/components/background-boxes";

export const user = {
	name: "Divyansh Pandey",
	nameInitials: "dp",
	profession: ["Full Stack Software Engineer", "Mobile App Developer"],
	tagline: "Crafting Digital Experiences with a Touch of Creativity",
};

export const socialNetworks = {
	email: "pandeydivyansh070501@gmail.com",
	github: "inevitableDivu",
	instagram: "divu_inevitable_0_o",
	linkedin: "divyansh-pandey-8b0981181",
	twitter: "inevitableDivu7",
};

export const profile = {
	title: "Your Friendly Neighborhood Digital Craftsman: Building Apps with Beats of Code",
	about: [
		`I’m a digital creator who turns ideas into seamless web and mobile experiences. With a deep love for JavaScript and a passion for interactive design, I bring concepts to life with code that feels as smooth as a favorite track. Inspired by everything from timeless classics to modern beats, my work blends creativity with functionality. Whether it’s building unique applications or diving into conversations about the future of tech, I’m all about crafting thoughtful, engaging digital experiences.`,
		`Let’s turn great ideas into something extraordinary—one line of code at a time.`,
	],
};

type SiteStyle = {
	background: "beam" | "boxes" | "none";
	cursor: boolean;
};

export const backgroundsArr: SiteStyle["background"][] = ["beam", "boxes", "none"];

export const styles: SiteStyle = {
	background: "beam",
	cursor: true,
};

export const beamStyle = {
	"z-20 w-fit": styles.background === "boxes",
};

export const background: Record<SiteStyle["background"], any> = {
	beam: BackgroundBeams,
	boxes: BackgroundBoxes,
	none: () => null,
};
