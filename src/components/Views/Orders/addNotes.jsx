import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { Container, Grid, Paper } from "@mui/material";
import Textfield from "../../UI/Textfield/TextField";
import Button from "../../UI/Button/Button";
import {  updateService } from "../../../services/services";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config /Firebase/firebase";
const AddNotes = ({ id,handleModal,getAllOrders,recordForEdit }) => {
  console.log("recordForEdit",recordForEdit)
  const INITIAL_FORM_STATE = {
    subject: "",
    orderId: "",
    description: "",
    loader: false,
    error: null,
  };

const  FORM_VALIDATION = Yup.object().shape({
      subject: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
    orderId: Yup.number().integer().required("Required"),    
      description: Yup.string().required("Required"),
    });
  const initialValues = recordForEdit? recordForEdit.notes : INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);

  async function handelclick(values) {
    console.log(values)
    
    setloader(true);
   try{
     const record = {
                  subject:values.subject,
                  description: values.description,
                  orderId:values.orderId
                };
                  const docRef = doc(db, "orders",id );
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                  console.log("Document data viky:", docSnap.data());
                   let list=docSnap.data()
                   list.notes=record;
                   console.log('list',list)
                  await updateService("orders",id,list)
                  getAllOrders()
                  setloader(false);
                  handleModal();

                }
              } catch (error) {
      console.log("catchError", error);
    }
  }

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={{
                  ...initialValues,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values) => handelclick(values)}
                render={({ submitForm}) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Textfield name="subject" label="Subject" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield name="orderId" label="OrderId" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield
                          name="description"
                          label="Description"
                          size="small"
                          multiline={true}
                          maxRows={6}
                          minRows={6}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <Button variant="contained"  color="primary"  
                                    fullWidth
                                     onClick={() =>submitForm()
                                   
                                  } >
                       {loader ? "Please Wait..." : "Submit Form"}

                                    </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              ></Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddNotes;
