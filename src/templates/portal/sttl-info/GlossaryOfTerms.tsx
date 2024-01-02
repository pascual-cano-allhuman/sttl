import { Text, Box } from "trade-portal-components";
import { TitleCard } from "./TitleCard";

export const GlossaryOfTerms = () => {
	return (
		<TitleCard title="Glossary of terms" hasDivider id="glossary" icon="fi-glossary">
			<Box gap="1.6rem">
				<Text textStyle="text_large" color="fi_text_90">
					<b>Accommodation</b> – a room, group of rooms, or building in which someone may live or stay
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					<b>NQAF</b> – National Quality Assurance Framework
				</Text>{" "}
				<Text textStyle="text_large" color="fi_text_90">
					<b>Principal Private Residence (PPR)</b> – a house or apartment which you own and occupy as your only, or main, residence. (It is
					also referred to as a primary residence or main residence)
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					<b>STTL</b> – Short Term Tourist Letting
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					<b>Tourist</b> – means a person who travels from their place of residence:
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					{" "}
					(a) to visit the State,
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					(b) to spend their holiday in the State, or{" "}
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					(c) to travel within the State
				</Text>
			</Box>
		</TitleCard>
	);
};