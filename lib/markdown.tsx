import Text from "@/components/text.rich";
import { user } from "@/constants/data";

type AboutFormatConstant = "PROFESSION" | "TAGLINE";

type AboutFormatConstantType = `%${AboutFormatConstant}%`;

export const ABOUT_FORMAT_CONSTANTS: AboutFormatConstantType[] = ["%PROFESSION%", "%TAGLINE%"];

type FromatTextReturnType = (JSX.Element | string)[];

function formatText<T extends string>(paragraph: string, format_constant_arr: T[] = []): FromatTextReturnType {
	let response: FromatTextReturnType = [];

	let jsxEl: (JSX.Element | string)[] = [];
	const is_plain_para = format_constant_arr.every(item => !paragraph.includes(item));
	console.log({ is_plain_para })

	if (is_plain_para) {
		response.push(paragraph);
	} else {
		format_constant_arr.map((item) => {
			jsxEl = [];
			if (paragraph.includes(item)) {
				let profession: (JSX.Element | string)[] = [];
				user.profession.forEach((title, index) => {
					let isLastIndex = index === user.profession.length - 1;
					if (isLastIndex) profession.push("and ");
					profession.push(<Text key={Math.random()}>{title}</Text>);
					if (!isLastIndex) profession.push(", ");
				});
				let updatedPara = paragraph.split("%PROFESSION%");
				jsxEl = [updatedPara[0], ...profession, ...updatedPara.slice(1)];
			}
			if (jsxEl) response.push(...jsxEl);
		})
	}

	return response;
}

export { formatText };
