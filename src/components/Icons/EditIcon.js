import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '../UI/Button/Button';

 const EditIcon=(props)=> {
    return (
        <Button
   
       {...props}
      >
       <EditOutlinedIcon fontSize="small" />
      </Button>

    )
}


export default EditIcon
