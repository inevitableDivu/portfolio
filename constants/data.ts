import BackgroundBeams from "@/components/background-beams";
import BackgroundBoxes from "@/components/background-boxes";

export const user = {
	name: "Divyansh Pandey",
	nameInitials: "dp",
	profession: ["Full Stack Developer", "JavaScript Guru", "Mobile App Developer"],
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
	title: "Your Friendly Neighborhood Digital Craftsman: Building Apps with Beats of Code",
	about: [
		`Consider yourself in the presence of your friendly neighborhood digital craftsman – a %PROFESSION% extraordinaire! I wield JavaScript like a digital sculptor, crafting websites and mobile apps that bring your ideas to life in interactive wonderlands.`,
		`When I step away from the keyboard, the world pulsates with a vibrant symphony. Classic favorites find perfect harmony with modern pop anthems, creating a soundtrack that's as unique as my coding approach. It's a fusion of the tried-and-true with the fresh and innovative, much like the apps I build. While I haven't yet built my library of written knowledge, my passion for sharing extends to web development discussions, brainstorming sessions for mobile apps, or simply diving deep into the latest musical discoveries. Let's connect and collaborate on transforming those sparks of imagination into digital masterpieces!`,
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
