import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Button from '../UI/Button/Button';


 const DeleteIcon=(props)=> {
    return (
        <Button
       {...props}
      >
     <CloseIcon fontSize="small"/>
      </Button>
    )
}


export default DeleteIcon

// ActionButton.defaultProps={
//     variant:"outlined"
// }