import { Text, Box } from "trade-portal-components";
import { TitleCard } from "./TitleCard";

export const QualityAssured = () => {
	return (
		<TitleCard icon="fi-circle-check" title="Already on NQAF / Quality Assured" hasDivider id="quality_assured">
			<Box gap="1.6rem">
				<Text textStyle="text_large" color="fi_text_90">
					If you are currently registered or approved on the National Quality Assurance Framework, you will not need to register your
					property on the Short Term Tourist Letting Register in 2023.
				</Text>
				<Text textStyle="text_large" color="fi_text_90">
					All properties approved or registered on the NQAF will be issued a Short Term Tourist Letting number for 2023, and this number
					must be used on all advertisements and booking platforms. Fáilte Ireland will be in contact with NQAF operators in 2023 with full
					details.
				</Text>
			</Box>
		</TitleCard>
	);
};
