import React from 'react';
import { useField, useFormikContext } from 'formik';
import { MenuItem, TextField } from '@mui/material';

const Select = ({
   type,
  name,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = evt => {
    const { value } = evt.target;

      setFieldValue(name, value)
  };


  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }


  return (
    <TextField {...configSelect}>
           {options.map((item) => {
        return (
          <MenuItem  key={item.id} value={type==="id"?item.id:type==="item"?item:item.value}>
            {item.value}
          </MenuItem>
        )
      })}
    </TextField>
  );
};

export default Select;