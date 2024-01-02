import { CollapsePanel } from "trade-portal-components";
import { ReactNode } from "react";

type InformationCardProps = {
	title: string;
	defaultCollapsed?: boolean;
	padding?: string;
	children: ReactNode;
};

export const InformationCard = ({ title, defaultCollapsed = false, padding = "0", children }: InformationCardProps) => {
	const defaultCollapseProps = {
		expandText: "Read more",
		collapseText: "Read less",
		titleColor: "fi_text_90"
	};

	return (
		<CollapsePanel {...defaultCollapseProps} defaultCollapsed={defaultCollapsed} padding={padding} title={title}>
			{children}
		</CollapsePanel>
	);
};
