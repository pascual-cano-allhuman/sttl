import { Payment, usePagination } from "models/dashboard";
import { Text, Box, TextLink, Pagination, Button, theme } from "trade-portal-components";

type Props = {
	payments: Payment[];
	openInvoice: (invoiceUrl: string) => void;
};

export const PaymentHistory = ({ payments, openInvoice }: Props) => {
	const { pageItems, pageNumber, goToPage, totalNumberOfPages } = usePagination(payments);
	return (
		<Box gap="3.2rem">
			<Box minHeight="4.6rem" flexDirection="row" alignItems="center">
				<Text textStyle="heading_medium" as="h1">
					Invoices and payment history
				</Text>
			</Box>
			{payments?.length > 0 && (
				<Box gap="2.4rem">
					{pageItems.map((item, i) => {
						return <InvoiceCard key={i} {...item} openInvoice={openInvoice} />;
					})}
					<Pagination totalNumberOfPages={totalNumberOfPages} currentPage={pageNumber} onPageChange={goToPage} />
				</Box>
			)}
			{payments?.length === 0 && <EmptyCard />}
		</Box>
	);
};

type CardProps = {
	invoiceNumber: string;
	invoiceDate: string;
	invoiceUrl?: string;
	openInvoice: (invoiceUrl: string) => void;
};

export const InvoiceCard = (props: CardProps) => {
	const { invoiceNumber, invoiceDate = "N/A", invoiceUrl, openInvoice } = props;
	const invoiceText = invoiceNumber ? `Payment #${invoiceNumber}` : "N/A";

	return (
		<Box padding={["2.4rem", "3.2rem"]} background="fi_surface_white" data-testid="invoice-card">
			<Box
				borderLeft={`2px solid ${theme.color.fi_secondary_sea_100}`}
				minHeight="4.8rem"
				paddingLeft={["2.4rem", "3.2rem"]}
				gap="3.2rem"
				flexDirection={["column", "row"]}
				justifyContent="space-between"
				alignItems={["start", "center"]}
			>
				<Box>
					<Text textStyle="link_large" textDecoration="none" as="span">
						{invoiceText}
					</Text>
					<Text textStyle="text_large">{invoiceDate}</Text>
				</Box>
				{invoiceUrl && (
					<TextLink size="large" variant="icon_link" leadingIcon="fi-download" onClick={() => openInvoice(invoiceUrl)}>
						Download invoice
					</TextLink>
				)}
			</Box>
		</Box>
	);
};

const EmptyCard = () => (
	<Box padding={["3.2rem 2.4rem", "3.2rem"]} background="fi_surface_white">
		<Box
			paddingLeft={["2.4rem", "3.2rem"]}
			flexDirection={["column", "row"]}
			justifyContent="space-between"
			alignItems={["start", "center"]}
			gap="3.2rem"
			borderLeft={`2px solid ${theme.color.fi_secondary_sea_100}`}
		>
			<Text>You have no payments registered</Text>
			<Button size="large" as="a" href="/sttl">
				Register a property now
			</Button>
		</Box>
	</Box>
);
