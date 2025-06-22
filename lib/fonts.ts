import { Iceland, Poppins } from "next/font/google";

export const iceland = Iceland({ weight: ["400"], subsets: ["latin"], variable: "--font-iceland" });

export const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	subsets: ["latin"],
});
