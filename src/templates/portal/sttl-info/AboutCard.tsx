import { Box, Text, Divider, RichText } from "trade-portal-components";
import { TitleCard } from "./TitleCard";
import { InformationCard } from "./InformationCard";

export const AboutCard = () => {
	return (
		<TitleCard title="About Short Term Tourist Letting Register" icon="fi-circle-exclamation" id="about_sttl_register">
			<Box gap="2.4rem">
				<Box gap="2.4rem">
					<Text textStyle="text_large" color="fi_text_90">
						Anyone offering paid tourist accommodation for periods of up to and including 21 nights will be required to register on the
						Short Term Tourist Letting Register.
					</Text>
					<Divider color="fi_action_primary_40" />
				</Box>
				<InformationCard title="Short Term Tourist Letting property types">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							Short Term Tourist Letting properties include the following:
						</Text>
						{/* 1 */}
						<Box gap="1.6rem">
							<Text textStyle="text_large" color="fi_text_90">
								<b>Room(s) in your home</b>
							</Text>
							<RichText>
								<ul>
									<li>If you rent out a room(s) in your own home - your Principle private residence</li>
									<li>The host resides on the premises during provision of accommodation and it is their primary residence</li>
								</ul>
							</RichText>
						</Box>
						{/*	2 */}
						<Box gap="1.6rem">
							<Text textStyle="text_large" color="fi_text_90">
								<b>Entire property</b>
							</Text>
							<RichText>
								<ul>
									<li>
										Guests have the whole place to themselves. Also includes single units of accommodation such as an annex, a
										cabin, a boat, a treehouse etc.
									</li>
									<li>The host does not reside at the premises, it is a secondary property</li>
									<li>
										This will generate an STTL number per entire property, which will allow you to place an individual advert per
										property on online platforms
									</li>
								</ul>
							</RichText>
						</Box>
						{/* 3 */}
						<Box gap="1.6rem">
							<Text textStyle="text_large" color="fi_text_90">
								<b>Multiple units at a site / Complex </b>
							</Text>
							<RichText>
								<ul>
									<li>
										Multiple units at the same address or Eircode (includes but not limited to a holiday park / apartment block /
										camping resort / holiday village etc)
									</li>
									<li>
										This will generate one STTL number for your site / complex, this will allow you to place one advert for your
										site / complex on an online platform
									</li>
								</ul>
							</RichText>
						</Box>
					</Box>
				</InformationCard>
				<InformationCard title="Who is this for?">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							Anyone offering paid tourist accommodation for periods of up to and including 21 nights.
						</Text>
					</Box>
				</InformationCard>
				<InformationCard title="Why do I need to do this?">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							Fáilte Ireland’s aim, as directed by the Government’s Housing for All policy, is to require any party offering
							accommodation on a short term basis to tourists (referred to as “Short Term Tourist Letting” or “STTL”) to be registered
							on a Register and hold a valid registration number issued by Fáilte Ireland. You will need to ensure your Short Term
							Tourist Letting number is displayed on all booking platforms (including property websites) and advertisements.
						</Text>
						<Text textStyle="text_large" color="fi_text_90">
							This register will be underpinned by amendments to the Tourist Traffic Acts 1939 – 2016. The live online register will be
							made publicly available on the Fáilte Ireland website.
						</Text>
					</Box>
				</InformationCard>
				<InformationCard title="What information will be publicly available once registered?">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							Once your Short Term Tourist Letting has been registered on the Short Term Tourist Letting Register, the following
							information will be publicly available:{" "}
						</Text>
						<RichText>
							<ul>
								<li>The Eircode</li>
								<li>Property Type</li>
								<li>Business / Owner’s Name</li>
								<li>Short Term Tourist Letting number</li>
							</ul>
						</RichText>
					</Box>
				</InformationCard>
				<InformationCard title="How much is the fee?">
					<Box gap="1.6rem">
						<Text textStyle="text_large" color="fi_text_90">
							The current annual fees* are
						</Text>
						<Text textStyle="text_large" color="fi_text_90">
							Room(s) in your home - €50.00
						</Text>{" "}
						<Text textStyle="text_large" color="fi_text_90">
							Entire property - €150.00
						</Text>{" "}
						<Text textStyle="text_large" color="fi_text_90">
							Multiple units at a site / Complex
						</Text>
						<RichText>
							<ul>
								<li>Up to 20 guests - €500</li>
								<li>21 to 100 guests - €1000</li>
								<li>Greater than 101 guests - €1500</li>
							</ul>
						</RichText>
						<Text textStyle="text_large" color="fi_text_90">
							*fees are non-refundable, an invoice will be issued once payment is complete, the fee is VAT exempt.
						</Text>
					</Box>
				</InformationCard>
			</Box>
		</TitleCard>
	);
};
