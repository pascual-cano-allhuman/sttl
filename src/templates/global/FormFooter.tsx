import React from "react";
import { Box, Button } from "trade-portal-components";

type FormFooterProps = {
	onNextBtnClick?: () => void;
	onPrevBtnClick?: () => void;
	backBtnLabel?: string;
	nextBtnLabel?: string;
	isNextBtnDisabled?: boolean;
};

export const FormFooter = (props: FormFooterProps) => {
	const { onNextBtnClick, onPrevBtnClick, nextBtnLabel, backBtnLabel, isNextBtnDisabled } = props;

	return (
		<Box justifyContent="space-between" flexDirection={["column-reverse", "row"]} columns="full" gap="1.6rem" margin="0.8rem 0">
			<Box width={["100%", "9.5rem"]} data-testid="footer-prev-button">
				{onPrevBtnClick && (
					<Button size={["medium", "large"]} variant="tertiary" width="100%" onClick={onPrevBtnClick} data-testid="footer-back-button">
						{backBtnLabel || "Back"}
					</Button>
				)}
			</Box>
			<Box minWidth={["100%", "9.5rem"]} width="auto">
				{onNextBtnClick && (
					<Button
						size={["medium", "large"]}
						width="100%"
						onClick={onNextBtnClick}
						disabled={isNextBtnDisabled}
						data-testid="footer-next-button"
					>
						{nextBtnLabel || "Next"}
					</Button>
				)}
			</Box>
		</Box>
	);
};
