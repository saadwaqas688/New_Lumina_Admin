import React, { useState } from "react";
import { Formik, Form} from "formik";
// import * as Yup from "yup";
import Textfield from "../../UI/Textfield/TextField";

import { Container, Grid,Paper } from "@mui/material";
import Button from "../../UI/Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config /Firebase/firebase";

const AddAdminUser = ({handleModal}) => {
  // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];
  const INITIAL_FORM_STATE = {
    email: "",
    passwrod: "",
    time:"",
    status:"active",
    loader: false,
    error: null,
  };

  // let FORM_VALIDATION = "";

  // if (editMode) {
  //   FORM_VALIDATION = Yup.object().shape({
  //     title: Yup.string()
  //       .typeError("Please enter a valid phone number")
  //       .required("Required"),
  //       protiens: Yup.number().integer().required("Required"),
  //       fats: Yup.number().integer().required("Required"), 
  //       carbs: Yup.number().integer().required("Required"),
  //       ingredients:Yup.array(
  //         Yup.object({
  //           ingredient: Yup.string()
  //             .required('Ingredient name needed'),
  //             // .min(3, 'Ingredient name needs to be at least 3 characters')
  //             // .max(
  //             //   10,
  //             //   'Ingredient name needs to be at most 10 characters'
  //             // ),
  //           quantity: Yup.number()
  //             .required('Quantity needed')
  //             // .min(1, 'Quantity needs to be at least 1%')
  //             // .max(100, 'Quantity can be at most 100%'),
  //         })
  //       )
  //         .min(1, 'You need to provide at least 1 ingredient')
  //         .max(3, 'You can only provide 3 ingredient'),
  //         recipe: Yup.array()
  //         .of(
  //           Yup.string("String is Required!")
  //             .min(4, "Too Short")
  //             .max(20, "Too Long")
  //             .required("Required")
  //         )
  //         .min(1, "Atleast One Social Media is Required!")
  //         .required("Required"),

  //     // file: Yup.array()
  //     //   .required("Required Field")
  //   });
  // } else {
  //   FORM_VALIDATION = Yup.object().shape({
  //     title: Yup.string()
  //     .typeError("Please enter a valid phone number")
  //     .required("Required"),
  //     protiens: Yup.number().integer().required("Required"),
  //     fats: Yup.number().integer().required("Required"), 
  //     carbs: Yup.number().integer().required("Required"),
  //     ingredients:Yup.array(
  //       Yup.object({
  //         ingredient: Yup.string()
  //           .required('Ingredient name needed')
  //           .min(3, 'Ingredient name needs to be at least 3 characters')
  //           .max(
  //             10,
  //             'Ingredient name needs to be at most 10 characters'
  //           ),
  //         quantity: Yup.number()
  //           .required('Quantity needed')
  //           // .min(1, 'Quantity needs to be at least 1%')
  //           // .max(100, 'Quantity can be at most 100%'),
  //       })
  //     )
  //       .min(1, 'You need to provide at least 1 ingredient')
  //       .max(3, 'You can only provide 3 ingredient'),
  //       recipe: Yup.array()
  //       .of(
  //         Yup.string("String is Required!")
  //           .min(4, "Too Short")
  //           .max(20, "Too Long")
  //           .required("Required")
  //       )
  //       .min(1, "Atleast One Social Media is Required!")
  //       .required("Required"),
  //     file: Yup.mixed()
  //       .nullable()
  //       .required("Required Field")
  //       .test(
  //         "type",
  //         "Invalid file format selection",
  //         (value) =>
  //           !value || (value && SUPPORTED_FORMATS.includes(value[2].type))
  //       ),
  //   });
  // }
  const initialValues = INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);
  
    function handelclick(values){
      setloader(true)
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      return    setDoc(doc(db, "adminUsers", userCredential.user.uid), {
        id:userCredential.user.uid,
        email: userCredential.user.email,
        status : "active",
        time:serverTimestamp()
      });
    }).then((data)=>{
      handleModal()
      setloader(false)
      console.log('data',data)
    }
    )
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      handleModal()
      alert(error.message)
      console.log('error+++++',error.message)
      setloader(false)


    });
  }

  return (
    <Paper >
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={{
                  ...initialValues,
                }}
                // validationSchema={FORM_VALIDATION}
                onSubmit={(values) => handelclick(values)}
                render={({ values, errors, touched,submitForm}) => (
                  <>
                  {console.log(values)}
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{mt:'20px'}}>
                        <Textfield name="email" label="Email" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield name="password" label="Password" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                      <Button variant="contained"  color="primary"  sx={{marginBottom:'20px'}}
                                    fullWidth
                                     onClick={() =>submitForm()
                                   
                                  } >
                       {loader ? "Please Wait..." : "Submit Form"}

                                    </Button>
                      
                      </Grid>
                    </Grid>
                  </Form>
                  </>
                )}
              ></Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddAdminUser;


