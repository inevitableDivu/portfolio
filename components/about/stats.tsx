import React from "react";

function Stats() {
	return (
		<div className="relative pl-5 before:content-[''] before:w-[1px] before:absolute before:bg-black/40 before:bottom-0 before:top-2 before:left-0">
			<StatsHead>Stats</StatsHead>
			<div className="h-56"></div>

			<StatsHead>Technology Stacks</StatsHead>
			<div className="h-56"></div>

			<StatsHead>Experience</StatsHead>
			<div className="h-56"></div>
		</div>
	);
}

const StatsHead = ({ children }: React.PropsWithChildren) => (
	<h2 className="font-semibold text-xl relative flex items-center">
		<span>{children}</span>
		<div className="absolute h-4 w-4 rounded-full border-2 border-black/70 bg-gray-200 -left-7" />
	</h2>
);

export default Stats;
