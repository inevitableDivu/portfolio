import Text from "@/components/text.rich";
import { user } from "@/constants/data";

type AboutFormatConstant = "PROFESSION" | "TAGLINE";

type AboutFormatConstantType = `%${AboutFormatConstant}%`;

export const ABOUT_FORMAT_CONSTANTS: AboutFormatConstantType[] = ["%PROFESSION%", "%TAGLINE%"];

type FromatTextReturnType = (JSX.Element | string)[];

function formatText<T extends string>(
	paragraph: string,
	format_constant_arr: T[] = []
): FromatTextReturnType {
	let response: FromatTextReturnType = [];

	let jsxEl: (JSX.Element | string)[] = [];
	const is_plain_para = format_constant_arr.every((item) => !paragraph.includes(item));

	if (is_plain_para) {
		response.push(paragraph);
	} else {
		format_constant_arr.map((item) => {
			jsxEl = [];
			if (paragraph.includes(item)) {
				let newText: (JSX.Element | string)[] = [];
				const key = item.replace(/%/g, "") as AboutFormatConstant;
				let content = user[key.toLowerCase() as keyof typeof user];
				if (!Array.isArray(content)) content = [content];

				content.forEach((title, index) => {
					let isLastIndex = index === user.profession.length - 1;
					if (isLastIndex) newText.push("and ");
					newText.push(<Text key={Math.random()}>{title}</Text>);
					if (!isLastIndex) newText.push(", ");
				});
				let updatedPara = paragraph.split(item);
				jsxEl = [updatedPara[0], ...newText, ...updatedPara.slice(1)];
			}
			if (jsxEl) response.push(...jsxEl);
		});
	}

	return response;
}

export { formatText };
