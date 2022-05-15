
// import { useFormikContext } from 'formik';

// const Button = ({
//   children,
//   ...otherProps
// }) => {
//   // const { submitForm } = useFormikContext();

//   // const handleSubmit = () => {
//   //   submitForm();
//   // }

//   const configButton = {
//     variant: 'contained',
//     // color: 'pink',
//     fullWidth: true,
//     // onClick: handleSubmit
//   }

//   return (
//     <MaterialButton
//       {...configButton}
//     >
//       {children}
//     </MaterialButton>
//   );
// };

// export default Button;


// const useStyles = makeStyles(theme => ({
//     root: {
//         minWidth: 0,
//         margin: theme.spacing(0.5),
//         '&:hover': {
//             backgroundColor: '#ffb3b3',
//             color: 'white',
//         }
//     },
//     secondary: {
//         backgroundColor:'#ff6699',//hot pink
//         '& .MuiButton-label': {
//             color: '#ffe6e6',//light pink
//         }
//     },
//     primary: {
//         backgroundColor: '#ff6699',
//         '& .MuiButton-label': {
//             color: 'white',
//         }
//     },
// }))
import React from 'react';
import MaterialButton from '@mui/material/Button';

 const Button=(props )=> {

    const { color, children, onClick,variant } = props;
    console.log("children",children)

    return (
        <MaterialButton
            color={color}
            onClick={onClick}
            variant = {variant}
            {...props}
            >
            {children}
        </MaterialButton>
    )
}


export default Button

Button.defaultProps={
    variant:"outlined"
}