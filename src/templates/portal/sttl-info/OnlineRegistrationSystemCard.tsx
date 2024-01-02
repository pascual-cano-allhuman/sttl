import { Box, Text, Divider, RichText } from "trade-portal-components";
import { TitleCard } from "./TitleCard";
import { InformationCard } from "./InformationCard";

export const OnlineRegistrationSystemCard = () => {
	return (
		<TitleCard icon="fi-phone" title="About the online registration system" id="online_registration_system">
			<Box gap="2.4rem">
				<Box gap="2.4rem">
					<Box gap="1.6rem">
						<RichText>
							<p>To complete the online registration, you will require the following:</p>
							<ul>
								<li>Property address including Eircode*. </li>
								<li>
									{" "}
									Details such as capacity information and confirmation that the property being registered is compliant with
									planning regulations. (For further information on planning please contact the planning department of your local
									authority).
								</li>
								<li>Details of the property owner.</li>
								<li>Payment details for registration fee.</li>
							</ul>
							<p>*Contact customer support if the property being registered does not have an Eircode.</p>
						</RichText>
					</Box>
					<Divider color="fi_action_primary_40" />
				</Box>

				<InformationCard title="Can I contact Customer Support if I experience an issue with the online registration system?">
					<Text textStyle="text_large" color="fi_text_90">
						If you experience an issue, please contact Customer Support on 0818 888800 or +353 (0)1-5741990 or
						customersupport@failteireland.ie.
					</Text>
				</InformationCard>
				<InformationCard title="What do I need to do once I get my Short Term Tourist Letting number?">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							Once you register your property / properties you will receive confirmation of your Short Term Tourist Letting number, this
							will be valid for 12 months from the date of issue.
						</Text>
						<Text textStyle="text_large" color="fi_text_90">
							You will need to ensure your Short Term Tourist Letting number is displayed on all booking platforms (including property
							websites) and advertisements. There is no impact on your existing bookings. Your property details will be displayed on the
							Short Term Tourist Letting Register which will be publicly available on the Fáilte Ireland website.
						</Text>
					</Box>
				</InformationCard>
				<InformationCard title="When will I get my Short Term Tourist Letting number?">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							You will receive your Short Term Tourist Letting number, for each property you register, once payment has been received
							via the online registration system.
						</Text>
					</Box>
				</InformationCard>
			</Box>
		</TitleCard>
	);
};