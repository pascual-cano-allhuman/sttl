export enum PermissionStatus {
	have = "have",
	will_have = "will_have",
	do_not_have = "do_not_have"
}

export const PLANNING_PERMISSION_AS_TEXT = {
	have: "Granted",
	will_have: "Outstanding",
	do_not_have: "None"
} as const;

export const TEXT_TO_PLANNING_PERMISSION = Object.entries(PLANNING_PERMISSION_AS_TEXT).reduce((acc, [category, text]) => {
	acc[text] = category;
	return acc;
}, {});

export const PERMISSION_STATUS_DISPLAY_TEXT = {
	have: "Confirmed",
	will_have: "Pending"
};

export const PERMISSION_ANALYTICS_MAP = {
	have: "Correct",
	will_have: "Will have correct",
	do_not_have: "Don't have"
};
