import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { Container, Grid, Paper } from "@mui/material";
import { postService, updateService } from "../../../../services/services";
import Textfield from "../../../UI/Textfield/TextField";
import Button from "../../../UI/Button/Button";

const AddMealCategory = ({ recordForEdit,handleModal,getAllCategories }) => {

  const INITIAL_FORM_STATE = {
    name: "",
    description: "",
  };


const    FORM_VALIDATION = Yup.object().shape({
      name: Yup.string()
        .typeError("Please enter a name ")
        .required("Required"),
        description: Yup.string().required("Required")
    });
  const initialValues = recordForEdit ? recordForEdit : INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);

  async function handelclick(values) {
    
    setloader(true);

    try {
                const record = {
                  description: values.description,
                  name: values.name,
                };
                if (recordForEdit) {
                  await updateService("mealCategories",recordForEdit.id,record)
                  setloader(false);
                  handleModal();
                  getAllCategories()
                } else {
                  await postService("mealCategories",record)
                  setloader(false);
                  handleModal();
                  getAllCategories()

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
                render={({ values,submitForm}) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Textfield name="name" label="Name" size="small" />
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
                      {values.error && <div>{values.error}</div>}

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

export default AddMealCategory;
