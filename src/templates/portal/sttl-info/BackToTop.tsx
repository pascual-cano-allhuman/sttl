import { Text } from "trade-portal-components";

export const BackToTop = () => {
	const scrollToTop = e => {
		e.preventDefault();
		const item = document.getElementById(`sttl-info`);
		setTimeout(() => {
			item?.scrollIntoView({ behavior: "smooth" });
		}, 500);
	};

	return (
		<Text textStyle="text_small" color="fi_action_primary_100" cursor="pointer" onClick={e => scrollToTop(e)}>
			Back to top
		</Text>
	);
};
