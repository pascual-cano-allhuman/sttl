import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export const usePagination = (list: Array<any>) => {
	const searchParams = useSearchParams();
	const pageNumber = +searchParams.get("page");
	const router = useRouter();

	const goToPage = pageNumber => router.push(`/dashboard?page=${pageNumber}`);

	const pageItems = React.useMemo(() => {
		if (!list?.length) return [];
		const firstItem = pageNumber > 0 ? (pageNumber - 1) * ITEMS_PER_PAGE : 0;
		return list.slice(firstItem, firstItem + ITEMS_PER_PAGE);
	}, [list, pageNumber]);

	const totalNumberOfPages = React.useMemo(() => {
		if (!list?.length) return 0;
		return Math.ceil(list.length / ITEMS_PER_PAGE);
	}, [list]);

	return { pageNumber, pageItems, totalNumberOfPages, goToPage };
};
