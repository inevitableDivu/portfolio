import React from "react";

function Logo(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 1305 1305" fill="none" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M761 1222.88C1029.75 1172.07 1233 936.02 1233 652.5C1233 331.899 973.101 72 652.5 72C444.833 72 262.636 181.045 160.043 345H76.8549C186.766 139.674 403.322 0 652.5 0C1012.87 0 1305 292.134 1305 652.5C1305 1000.62 1032.39 1285.06 689 1304V1233V1231.87V1161V705V633H761H772H844V705H772H761V1161V1222.88ZM617 1231.93C312.931 1213.59 72 961.181 72 652.5C72 595.728 80.1498 540.859 95.3432 489H144H314H386V417H314H144H121.757H72H43.7922C15.5105 490.051 0 569.464 0 652.5C0 1000.96 273.142 1285.61 617 1304.05V1231.93ZM318 561H246V633V777V849H318H329H401V777H329H318V633V561ZM689 489V417H761H772H844V489H772H761H689Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M545 633C545 712.529 480.529 777 401 777V849C520.293 849 617 752.294 617 633C617 513.706 520.293 417 401 417C337.028 417 279.551 444.81 240 489H401C480.529 489 545 553.471 545 633Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M844 705C923.529 705 988 640.529 988 561C988 481.471 923.529 417 844 417V489C883.764 489 916 521.235 916 561C916 600.764 883.764 633 844 633V705Z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M650.548 489C643.859 477.423 636.388 466.354 628.206 455.866C617.239 441.809 604.996 428.795 591.651 417H663H752H824V489H752H663H650.548Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default Logo;