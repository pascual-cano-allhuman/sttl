type ValidateNumberInputProps = {
	min?: number;
	max?: number;
	required?: string | boolean;
	shouldBeWholeNumber?: boolean;
};

export const validateNumberInput = ({
	min = 1,
	max = 9999,
	required = "This field is required",
	shouldBeWholeNumber = false
}: ValidateNumberInputProps = {}) => ({
	required,
	min: { value: min, message: `Minimum value is ${min}` },
	max: { value: max, message: `Maximum value is ${max}` },
	valueAsNumber: true,
	validate: value => (shouldBeWholeNumber ? validateWholeNumber(value) : true)
});

export const validateWholeNumber = value => {
	if (!Number.isInteger(Number(value))) {
		return "Please enter a whole number.";
	}
	return true;
};

export const validateDecimalNumber = value => {
	if (!/^\d+(\.\d{1,2})?$/.test(value) && value) {
		return "Please enter a maximum of 2 decimal places.";
	}
	return true;
};

type ValidateTextInputProps = {
	min?: number;
	max?: number;
	required?: string | boolean;
};

export const validateTextInput = ({ min = 2, max = 50, required = "This field is required" }: ValidateTextInputProps = {}) => ({
	required,
	minLength: { message: `Minimum length is ${min}`, value: min },
	maxLength: { message: "Maximum length exceeded", value: max }
});
