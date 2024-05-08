import React from "react";
import { Box, Button, Text, TextLink, Modal, theme } from "trade-portal-components";

export const PendingApplicationCard = ({ discardSaveAndResume }: { discardSaveAndResume: () => void }) => {
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	return (
		<>
			<Box padding={["3.2rem 2.4rem", "3.2rem"]} background="fi_surface_white">
				<Box
					paddingLeft={["2.4rem", "3.2rem"]}
					flexDirection={["column", "row"]}
					alignItems={["start", "center"]}
					gap="3.2rem"
					borderLeft={`2px solid ${theme.color.fi_secondary_sea_100}`}
					data-testid="saved-application-card"
				>
					<Box maxWidth={["100%", "15rem", "26rem"]}>
						<Text textStyle="text_large" color="fi_text_90">
							You have a saved STTL application
						</Text>
					</Box>
					<Box
						flexDirection={["column-reverse", "row"]}
						justifyContent={["space-between", "flex-end"]}
						alignItems={["start", "center"]}
						gap={["1.6rem", "2.4rem"]}
						flexWrap="wrap"
					>
						<TextLink as="button" size="large" variant="text_link" onClick={() => setIsModalOpen(true)}>
							Discard application
						</TextLink>

						<Button size="large" className="gtm-linkclick" trailingIcon="fi-arrow-right" as="a" href="/sttl/review">
							Resume application
						</Button>
					</Box>
				</Box>
			</Box>
			<Modal
				isOpen={isModalOpen}
				title="Discard application"
				description="Are you sure you want to discard this application?"
				onClose={() => setIsModalOpen(false)}
				primaryAction={{
					label: "Discard application",
					onClick: () => {
						discardSaveAndResume();
						setIsModalOpen(false);
					}
				}}
			>
				<Box alignItems="center">
					<Text color="fi_text_60" as="p" textStyle="text_large" textAlign="center">
						Your application progress will be deleted, and you will be required to start again.
					</Text>
				</Box>
			</Modal>
		</>
	);
};
