import { Box } from "trade-portal-components";

export const Wrapper = ({ children, ...rest }: Record<string, any>) => {
	return (
		<Box padding="0 1.6rem" alignItems="center">
			<Box columns={[5, 9, 12]} {...rest}>
				{children}
			</Box>
		</Box>
	);
};
