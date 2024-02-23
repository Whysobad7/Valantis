"use client"

import { Item, fetchIds, fetchItems, selectError, selectIds, selectItems, selectLoading } from "@/lib/redux/apiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { useEffect, useState } from "react";
import BasicPagination from "./Pagination";
import { Box, List, ListItem, SelectChangeEvent, TextField } from "@mui/material";
import Loader from "./Loader";
import BasicSelect from "./Select";

const ProductList: React.FC = () => {
	const dispatch = useAppDispatch();
	const ids = useAppSelector(selectIds)
	const items = useAppSelector(selectItems)
	const loading = useAppSelector(selectLoading)
	const error = useAppSelector(selectError)
	const itemsPerPage = 50;
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [sortOption, setSortOption] = useState('');



	const handleChangeSortOption = (event: SelectChangeEvent) => {
	  setSortOption(event.target.value as string);
	};

	useEffect(() => {
			dispatch(fetchIds({ offset: 0, limit: 200 }));
	  }, [dispatch]);

	useEffect(() => {
		if (ids) {
			const start = (currentPage - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			const pageIds = ids.slice(start, end);
			dispatch(fetchItems(pageIds))
		}

	}, [dispatch, ids, currentPage, itemsPerPage, sortOption])

	const sortItems = (items: Record<string, Item>, sortOption: string) => {
		const sortedKeys = Object.keys(items).sort((a, b) => {
		  switch (sortOption) {
			case 'brand':
			  return (items[a]?.brand || '').localeCompare(items[b]?.brand || '');
			case 'price':
			  return items[a]?.price - items[b]?.price;
			case 'name':
			  return items[a]?.product.localeCompare(items[b]?.product);
			default:
			  return 0;
		  }
		});
	  
		const sortedItems: Record<string, Item> = {};

		sortedKeys.forEach(key => {
		  sortedItems[key] = items[key];
		});
	  
		return sortedItems;
	  };
	  const sortedItems = sortItems(items, sortOption);
	  

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	}

	return (
		<div style={{marginBottom: '50px'}}>
		  <h1>Product List</h1>
		  <Box display='flex' alignItems='center' gap={2}>
			<BasicSelect onChangeSortOption={handleChangeSortOption} sortOption={sortOption} />
		  </Box>
		  <Box>
			{loading && <Loader/>}
			{error && <h1>{error}</h1>}
			{!loading && (
				<>
				{Object.keys(sortedItems).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((id, index) => (
			  <List key={index} sx={{
				border: '1px solid black'
			  }} >
				<ListItem>ID: {id}</ListItem>
				<ListItem>Name: {items[id]?.product}</ListItem>
				<ListItem>Price: {items[id]?.price}</ListItem>
				<ListItem>Brand: {items[id]?.brand || 'N/A'}</ListItem>
			  </List>
			))}
				</>
			)}
		  </Box>
		  <BasicPagination
		 	currentPage={currentPage}
			totalPages={ ids && Math.ceil(ids.length / itemsPerPage)}
			onPageChange={handlePageChange}
		  />
		</div>
	  );
	};
	
	export default ProductList;