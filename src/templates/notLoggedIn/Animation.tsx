import { styled } from "styled-components"; // eslint-disable-line

export const Animation = styled.div`
	background: rgb(245, 245, 245) url("/images/fi-logo-animated.svg") no-repeat left 40vw top 0;
	flex: 1;
	padding-bottom: 4.8rem;

	@keyframes content {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.Homepage__Content {
		animation: content 0.5s linear both;
	}

	@keyframes listItem {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: 0;
		}
	}

	li {
		animation: listItem 0.5s linear both;
	}

	li:nth-child(1) {
		animation-delay: 0.3s;
	}
	li:nth-child(2) {
		animation-delay: 0.6s;
	}
	li:nth-child(3) {
		animation-delay: 0.9s;
	}
	li:nth-child(4) {
		animation-delay: 1.2s;
	}
	li:nth-child(5) {
		animation-delay: 1.5s;
	}
`;
