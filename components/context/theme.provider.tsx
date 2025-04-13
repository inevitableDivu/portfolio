import { PropsWithChildren, createContext, useEffect, useState, useContext } from "react";

type IThemes = "dark" | "light" | "system";

type ThemeContextType = {
	theme: IThemes;
	setTheme(theme: IThemes): void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	setTheme() {},
});

export function useTheme() {
	return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: PropsWithChildren) {
	const [theme, setTheme] = useState<IThemes | null>(null);

	useEffect(() => {
		let theme: IThemes = localStorage.theme || "light";

		setTheme(theme);
	}, []);

	useEffect(() => {
		if (theme !== null) localStorage.theme = theme;
	}, [theme]);

	if (!theme) return null;
	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
