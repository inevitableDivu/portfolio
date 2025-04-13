import BackgroundBeams from "@/components/background-beams";
import BackgroundBoxes from "@/components/background-boxes";

export const user = {
	name: "Divyansh Pandey",
	nameInitials: "dp",
	profession: ["Full Stack Software Engineer", "Mobile App Developer"],
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
		`Consider yourself in the presence of your friendly neighborhood digital craftsman – a %PROFESSION% extraordinaire! I wield JavaScript like a digital sculptor, crafting websites and mobile apps that bring your ideas to life in interactive wonderlands.`,
		`Like my code, my taste in music blends classics with modern beats. This fuels my passion for crafting unique apps and sparking discussions on web & mobile development. While I'm new to writing, I bring enthusiasm to brainstorm sessions and musical discoveries. Let's turn creative ideas into digital symphonies!`,
	],
};

type SiteStyle = {
	background: "beam" | "boxes" | "none";
	cursor: boolean;
};

const backgroundsArr: SiteStyle["background"][] = ["beam", "boxes"];

export const styles: SiteStyle = {
	background: backgroundsArr[Math.floor(Math.random() * backgroundsArr.length)],
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
