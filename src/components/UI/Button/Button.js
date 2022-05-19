import React from 'react';
import MaterialButton from '@mui/material/Button';
import { styled } from '@mui/system';

       const MaterialButtonWrapper=styled(MaterialButton)(({theme,
                                                         customcolor,
                                                         custombgcolor,
                                                      customHoverBgColor,
                                                     customHovercolor})=>({
                   minWidth: 0,
                 margin: theme.spacing(0.5),
                 color:customcolor,
                 backgroundColor:custombgcolor ? custombgcolor:"#ff6699",//hot pink
                '&:hover': {
            backgroundColor: customHoverBgColor?customHoverBgColor:'#ffb3b3',
            color:customHovercolor?customHovercolor:'white'
                },
       }))

       

 const Button=(props )=> {

    const { color, children, onClick,variant } = props;
    return (
        <MaterialButtonWrapper
            color={color}
            onClick={onClick}
            variant = {variant}
            {...props}
            >
            {children}
        </MaterialButtonWrapper>
    )
}


export default Button

Button.defaultProps={
    variant:"outlined"
}