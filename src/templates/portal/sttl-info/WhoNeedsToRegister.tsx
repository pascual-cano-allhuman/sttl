import { Box, Text, Divider, RichText } from "trade-portal-components";
import { TitleCard } from "./TitleCard";
import { InformationCard } from "./InformationCard";

export const WhoNeedsToRegister = () => {
	return (
		<TitleCard icon="fi-user" title="Who needs to register?" id="who_needs_to_register">
			<Box gap="2.4rem">
				<Box gap="2.4rem">
					<Text textStyle="text_large" color="fi_text_90">
						Anyone offering paid tourist accommodation for periods of up to and including 21 nights will be required to register on the
						Short Term Tourist Letting Register.
					</Text>
					<Divider color="fi_action_primary_40" />
				</Box>
				<InformationCard title="Examples of who needs to register.">
					<RichText>
						<ul>
							<li>
								John has a self-catering house and a glamping pod in Westport. He only rents his self-catering house out during the
								summer months for two-week periods and has been doing so for the last fifteen years. He only rents out his glamping
								pod one night a year, advertising on one website, the rest of the year he uses it for family and friends. John will
								need to register his properties.
							</li>
							<li>
								Rodrigo in Galway is renting an apartment, he has an agreement with his landlord that he can sub-let a bedroom in the
								apartment. Rodrigo doesn’t want a full-time roommate, so he rents out the room for 6-9 months and then he will let the
								room for a few nights or a weekend occasionally. He only advertises on social media. Rodrigo will need to register his
								property.
							</li>
							<li>
								Elena in Dublin goes on holiday for Christmas every year, she only rents out her house for this one-week period in the
								year. She advertises it on multiple websites to ensure it gets booked. Elena will need to register her property.
							</li>
							<li>
								An annual festival is coming soon to where Joe lives, he has not been involved in short term letting accommodation or
								camping before, but he decides he will rent his field to festival goers for them to pitch their tents for the duration
								of the festival of up to 3 nights. He charges a low price for it; he advertises this on the festival website and
								social media. Joe will need to register his property.
							</li>
						</ul>
					</RichText>
				</InformationCard>
				<InformationCard title="Examples of who doesn’t need to register.">
					<RichText>
						<ul>
							<li>
								Mary from Dungarvan has been renting out a room to a student for the last year. The student stays with her for nine
								months of the year, Mary then leaves the room empty for summer. Mary does not need to register her property.
							</li>
							<li>
								Jean-Paul in Newbridge spends a lot of his time in Paris as his parents live there and he can work remotely. He rents
								out his apartment via a local agent but only for a minimum of 22+ consecutive nights. Jean-Paul will not need to
								register his property
							</li>
						</ul>
					</RichText>
				</InformationCard>
				<InformationCard title="What if I don’t register my property?">
					<Box>
						<Text textStyle="text_large" color="fi_text_90">
							If you don’t register your property, you will not be issued with a Short Term Tourist Letting number. This means that you
							will not be able to advertise your property on any booking platforms or advertisements. It is an offence to advertise a
							Short Term Tourist Letting property without displaying a valid Short Term Tourist Letting registration number and any
							person who fails to comply with the requirements may be liable to penalties.
						</Text>
					</Box>
				</InformationCard>
			</Box>
		</TitleCard>
	);
};