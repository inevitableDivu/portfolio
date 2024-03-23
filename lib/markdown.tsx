import Text from "@/components/text.rich";
import { user } from "@/constants/data";

function formatAbout(paragraph: string): (JSX.Element | string)[] {
	let response: (JSX.Element | string)[] = [];

	let jsxEl: (JSX.Element | string)[] = [];
	if (paragraph.includes("%PROFESSION%")) {
		let profession: (JSX.Element | string)[] = [];
		user.profession.forEach((title, index) => {
			let isLastIndex = index === user.profession.length - 1;
			if (isLastIndex) profession.push("and ");
			profession.push(<Text key={Math.random()}>{title}</Text>);
			if (!isLastIndex) profession.push(", ");
		});
		let updatedPara = paragraph.split("%PROFESSION%");
		jsxEl = [updatedPara[0], ...profession, ...updatedPara.slice(1)];
	} else {
		jsxEl = [paragraph];
	}

	if (jsxEl) response.push(...jsxEl);

	return response;
}

export { formatAbout };
