import React from "react";
import { Loader, Box, Text } from "trade-portal-components";

type LoaderWithContentProps = {
	children: React.ReactNode;
};

export const LoaderWithContent = (props: LoaderWithContentProps) => {
	const { children } = props;
	React.useEffect(() => {
		window.scroll(0, 0);
	}, []);
	return (
		<Box padding="0 1.6rem" alignItems="center">
			<Box background="white" borderRadius="8px" alignItems="center" columns={8} gap="2.4rem" padding="4rem 1.6rem">
				<Loader width={50} />
				<Text color="fi_text_60">{children}</Text>
			</Box>
		</Box>
	);
};
