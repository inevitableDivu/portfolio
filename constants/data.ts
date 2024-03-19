import BackgroundBeams from "@/components/background-beams";
import BackgroundBoxes from "@/components/background-boxes";

export const user = {
	name: "Divyansh Pandey",
	nameInitials: "dp",
	profession: ["Full Stack Developer", "JavaScript Developer", "Mobile App Developer"],
};

export const socialNetworks = {
	email: "pandeydivyansh070501@gmail.com",
	github: "inevitableDivu",
	instagram: "divu_inevitable_0_o",
	linkedin: "divyansh-pandey-8b0981181",
	twitter: "inevitableDivu7",
	facebook: "#",
};

export const profile = {
	about: [
		`Your friendly neighborhood %PROFESSION%. I spend my days (and often all nights) painting the canvas of internet or your mobile phone screen with #PROJECTS# and lines of code, turning zeros and ones (0's and 1's) into something which feels like immersive and provides interactive experiences.`,
	],
};

type SiteStyle = {
	background: "beam" | "boxes" | "none";
	cursor: boolean;
};

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
