import React from "react";
import Link from "next/link";

type TextProps = React.PropsWithChildren<{
	href?: string;
}>;

function Text({ children, href }: TextProps) {
	const item = href
		? {
				component: Link,
				props: { href },
		  }
		: {
				component: "span",
				props: {},
		  };
	return (
		// @ts-ignore
		<item.component
			{...item.props}
			className={`font-semibold text-stone-700 ${
				href ? "uppercase px-1.5 py-0.5 bg-gray-300 rounded-lg" : ""
			}`}
		>
			{children}
		</item.component>
	);
}

export default Text;
