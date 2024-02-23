import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
	sortOption: string;
	onChangeSortOption: (event: SelectChangeEvent) => void;
  }

  const BasicSelect: React.FC<Props> = ({ sortOption, onChangeSortOption }) => {
  return (
    <Box sx={{ minWidth: 120, maxWidth: 200, mb: 2, }}>
      <FormControl fullWidth sx={{mt: 2}}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortOption}
          label="Sort"
          onChange={onChangeSortOption}
        >
          <MenuItem value={'name'}>name</MenuItem>
          <MenuItem value={'price'}>price</MenuItem>
          <MenuItem value={'brand'}>brand</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;