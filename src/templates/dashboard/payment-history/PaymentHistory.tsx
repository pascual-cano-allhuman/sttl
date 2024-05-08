import { Payment, usePagination } from "models/dashboard";
import { Text, Box, TextLink, Pagination, theme } from "trade-portal-components";

type Props = {
	payments: Payment[];
};

export const PaymentHistory = ({ payments }: Props) => {
	const { pageItems, pageNumber, goToPage, totalNumberOfPages } = usePagination(payments);
	if (!(payments?.length > 0)) return null;
	return (
		<Box gap="3.2rem">
			<Box minHeight="4.6rem" flexDirection="row" alignItems="center">
				<Text textStyle="heading_medium" as="h1">
					Invoices and payment history
				</Text>
			</Box>
			<Box gap="2.4rem">
				{pageItems.map((item, i) => {
					return <InvoiceCard key={i} {...item} />;
				})}
				<Pagination totalNumberOfPages={totalNumberOfPages} currentPage={pageNumber} onPageChange={goToPage} />
			</Box>
		</Box>
	);
};

export const InvoiceCard = (props: { invoiceNumber: string; invoiceDate: string; invoiceUrl?: string }) => {
	const { invoiceNumber, invoiceDate = "N/A", invoiceUrl } = props;
	const invoiceText = invoiceNumber ? `Payment #${invoiceNumber}` : "N/A";
	const onDownloadButtonClick = () => window.open(invoiceUrl);

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
					<TextLink size="large" variant="icon_link" leadingIcon="fi-download" onClick={onDownloadButtonClick}>
						Download invoice
					</TextLink>
				)}
			</Box>
		</Box>
	);
};
