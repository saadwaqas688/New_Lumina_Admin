import { FormControl, MenuItem, Select } from "@mui/material";
import React from 'react'

const SelectMui = ({options,selectedValue,handleChange}) => {

  return (
  <FormControl size="small" required sx={{ m: 1, minWidth: 210 }}>
  <Select
      labelId="demo-simple-select-required-label"
      id="demo-simple-select-required"
      value={selectedValue}
      onChange={handleChange}
  >
       <MenuItem value="All">
              All
          </MenuItem>
    {
    
    options.map((ele) => {
      return (
          <MenuItem  key={ele.id} value={ele.value}>
              {ele.value}
          </MenuItem>
      )
  })

      }
  </Select>

</FormControl>
  )
}

export default SelectMui