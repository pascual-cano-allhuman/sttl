"use client";

import { Box, Text, Image, TextLink, Button, theme } from "trade-portal-components";
import { Animation } from "./Animation";

type Props = {
	onSignUpClick: () => void;
	onSignInClick: () => void;
};

export const NotLoggedInTemplate = ({ onSignUpClick, onSignInClick }: Props) => {
	return (
		<Animation>
			<Box position="relative" gap={["4rem", "4rem", "5.6rem"]} marginBottom={["4rem", "4rem", "6.4rem"]} zIndex="1" paddingTop="2.4rem">
				<Box textAlign="center" position="relative" zIndex="1" padding="0 1.6rem">
					<Text as="h1" textStyle="heading_large">
						Welcome to the Short-Term Tourist Letting Register
					</Text>
				</Box>

				{/* wrapper */}
				<Box margin="0 auto" position="relative" alignItems="center" padding="0 1.6rem" gap="4rem" maxWidth={["", "55.4rem", "99rem"]}>
					{/* centered container */}
					<Box position="relative" alignItems={["center", "center", "end"]}>
						{/* image */}
						<Box
							borderRadius="0.8rem"
							overflow="hidden"
							boxShadow="fi_shadow_level_5"
							position={["relative", "relative", "absolute"]}
							left="0"
							maxWidth="54rem"
							top="0"
							bottom={["auto", "auto", "0"]}
							zIndex="2"
						>
							<Image
								width={540}
								aspectRatio={[1.8, 1.8, 0.9]}
								src={["/images/homepage-hero-small.jpg", "/images/homepage-hero-small.jpg", "/images/homepage-hero-large.jpg"]}
								alt=""
							/>
						</Box>

						{/* content card */}
						<Box
							position="relative"
							maxWidth="52rem"
							top={["-4.8rem", "-4.8rem", "0"]}
							zIndex="3"
							padding={["0 1rem", "0 1.6rem", "2.4rem 0"]}
						>
							<Box
								background="#fff"
								borderRadius="0.8rem"
								padding={["4rem 2.4rem", "5.6rem"]}
								alignItems="flex-start"
								gap={["3.2rem", "3.2rem", "4.8rem"]}
								zIndex="1"
								boxShadow="fi_shadow_level_5"
							>
								<Box gap={["2.4rem", "3.2rem"]}>
									<Text textStyle="text_large">Sign up to get your short-term tourist letting number and enjoy benefits like:</Text>
									<Box
										paddingLeft={["2.4rem", "4rem"]}
										justifyContent="space-between"
										borderLeft={`2px solid ${theme.color.fi_secondary_sea_100}`}
										gap="3.4rem"
									>
										<Box flexDirection="row" alignItems="center" gap="1.6rem">
											<Box as="ul" listStyleType="none" padding="0" margin="0" gap="1.6rem" fontWeight={400}>
												<Box as="li">More visibility and promotion</Box>
												<Box as="li">Trust from guests</Box>
												<Box as="li">Quality assurance</Box>
												<Box as="li">Legal compliance</Box>
												<Box as="li">Market insights</Box>
											</Box>
										</Box>
									</Box>
								</Box>
								<Box columns={3} alignItems={["stretch", "start"]}>
									<Button onClick={onSignUpClick}>Create an account</Button>
								</Box>
								<Text textStyle="text_large">
									Already have an account?{" "}
									<TextLink as="button" onClick={onSignInClick} variant="standard_link" colorCode="fi_action_primary_100">
										Sign in
									</TextLink>
								</Text>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Animation>
	);
};
