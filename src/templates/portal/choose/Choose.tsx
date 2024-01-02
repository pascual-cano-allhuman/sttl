import { Box, Button, Icon, Text, TextLink } from "trade-portal-components";
import { useRouter } from "next/navigation";

export const Choose = () => {
	const router = useRouter();
	return (
		<Box as="section">
			<Box justifyContent="center" alignItems="center" columns="12" margin="0 auto">
				<Box gap="0.4rem" justifyContent="center" alignItems="center" margin="3.2rem 0" padding="0 2rem">
					<Text textStyle="heading_extra_small" as="h1" color="fi_text_70" textAlign="center">
						{`Welcome to the Fáilte Ireland's Trade Portal`}
					</Text>
					<Text textStyle="heading_extra_large" as="h2" color="fi_text_80" textAlign="center">
						Choose the best Fáilte Ireland account for you
					</Text>
				</Box>
				<Box flexDirection={["column", "row"]} justifyContent="center" alignItems="center" gap="1.6rem" flexWrap="wrap">
					<Box
						id="leftCard"
						columns={4}
						background="fi_surface_white"
						borderRadius="0.8rem"
						padding="4.8rem"
						gap="2.4rem"
						alignItems="center"
						justifyContent="center"
					>
						<Box alignItems="center" justifyContent="center" margin={["0", "0 0 1.2rem 0"]}>
							<Icon size={["36px", "72px"]} codename="fi-bed-spot" color="fi_action_primary_100" />
						</Box>
						<Box alignItems="center" justifyContent="center" gap="1.6rem" minHeight="210px">
							<Text textStyle="heading_extra_small" as="h3" color="fi_text_100" textAlign="center">
								Short Term Tourist Letting Register
							</Text>
							<Text textStyle="text_small" as="h3" color="fi_text_100" textAlign="center">
								Sign up to get your Short Term Tourist Letting number for your property / properties.
							</Text>
							<Text textStyle="text_small" as="h3" color="fi_text_100" textAlign="center">
								Get your STL account number in minutes{" "}
							</Text>
						</Box>
						<Box columns={8} alignItems="center" justifyContent="center" margin="0">
							<Box columns={["full", 2]}>
								<Button
									width="100%"
									type="button"
									size="large"
									variant="primary"
									onClick={() => {
										router.push(process.env.TRADE_PORTAL_STTL_APP_URL ?? "");
									}}
								>
									Create account
								</Button>
							</Box>
						</Box>
						<Box columns={8} alignItems="center" justifyContent="center" flexDirection="row">
							<TextLink variant="text_link" colorCode="fi_action_primary_100" href="/sttl-info">
								Find out more
							</TextLink>
						</Box>
					</Box>
					<Box
						id="rightCard"
						columns={4}
						background="fi_surface_white"
						borderRadius={[0, "0.8rem"]}
						padding="4.8rem"
						gap="2.4rem"
						alignItems="center"
						justifyContent="center"
					>
						<Box alignItems="center" justifyContent="center" margin={["0", "0 0 1.2rem 0"]}>
							<Icon size={["36px", "72px"]} codename="fi-award-spot" colorCode="fi_action_primary_100" />
						</Box>
						<Box alignItems="center" justifyContent="center" gap="1.6rem" minHeight="210px">
							<Text textStyle="heading_extra_small" as="h3" color="fi_text_100" textAlign="center">
								Register for a Fáilte Ireland account
							</Text>
							<Text textStyle="text_small" as="h3" color="fi_text_100" textAlign="center">
								Sign up to avail of additional Fáilte Ireland services including Enterprise Supports, Quality Assurance, Trade Events
								etc.
							</Text>
							<Text textStyle="text_small" as="h3" color="fi_text_100" textAlign="center">
								Apply for funding, register for events and much more
							</Text>
						</Box>
						<Box columns={8} alignItems="center" justifyContent="center" margin="0">
							<Box columns={["full", 2]}>
								<Button
									width="100%"
									type="button"
									size="large"
									variant="primary"
									onClick={() => {
										router.push(
											process.env.TRADE_PORTAL_LEGACY_SITE_URL ? `${process.env.TRADE_PORTAL_LEGACY_SITE_URL}/signin` : ""
										);
									}}
								>
									Create account
								</Button>
							</Box>
						</Box>
						<Box columns={8} alignItems="center" justifyContent="center" flexDirection="row">
							<TextLink
								href={`${process.env.FAILTE_IRELAND_SITE_URL || ""}/Supports/Get-quality-assured.aspx`}
								variant="text_link"
								colorCode="fi_action_primary_100"
							>
								Find out more
							</TextLink>
						</Box>
					</Box>
				</Box>
				<Box id="footer" alignItems="center" justifyContent="center" flexDirection="row" margin="4rem 0 16rem 0" gap="1.6rem">
					<Text textStyle="text_small" color="fi_text_80">
						Already registered?
					</Text>
					<TextLink variant="text_link" colorCode="fi_action_primary_100" href={`${process.env.TRADE_PORTAL_LEGACY_SITE_URL ?? ""}/SignIn`}>
						Sign in now
					</TextLink>
				</Box>
			</Box>
		</Box>
	);
};
