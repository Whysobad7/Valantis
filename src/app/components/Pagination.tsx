import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}


export default function BasicPagination( {currentPage, totalPages, onPageChange}:Props) {

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		onPageChange(value)
	}

  return (
    <Stack spacing={2} 	  sx={{
		display: 'flex',
		position: 'fixed',
		bottom: '10px',
		left: '50%',
		transform: 'translateX(-50%)',
	  }} >
      <Pagination
	  count={totalPages}
	   color="primary"
	   page={currentPage}
	   onChange={handlePageChange}
	   />
    </Stack>
  );
}