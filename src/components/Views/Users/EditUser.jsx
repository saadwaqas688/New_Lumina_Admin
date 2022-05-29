import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import Textfield from "../../UI/Textfield/TextField";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Button from "../../UI/Button/Button";
import { updateService } from "../../../services/services";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config /Firebase/firebase";

const EditUser = ({ recordForEdit, handleModal, getAllUsers }) => {

  const initialValues = recordForEdit;
  const [loader, setloader] = useState(false);
  async function handelclick(values) {
    setloader(true);
    try {
      const docRef = doc(db, "Users",recordForEdit.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
       let list=docSnap.data()
       list.address=values.address;
       list.dateOfBirth=values.dateOfBirth
       list.name=values.name
       list.gender= values.gender
       list.height= values.height
       list.phone=values.phone
       list.weight=values.weight
       console.log('list',list)
      await updateService("Users",recordForEdit.id,list)
      getAllUsers()
      setloader(false);
      handleModal();

    } 
  }catch (error) {
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
                onSubmit={(values) => handelclick(values)}
                render={({ values, submitForm }) => (
                  <>
                    {console.log(values)}
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{
                              mb: "20px",
                              mt: "20px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Edit User Information
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield name="name" label="Name" size="small" />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="dateOfBirth"
                            label="Date of Birth"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="height"
                            label="Height"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="gender"
                            label="Gender"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield name="weight" label="Weight" size="small" />
                        </Grid>
                        <Grid item xs={4}>
                          <Textfield
                            name="phone"
                            label="Phone Number"
                            size="small"
                          />
                        </Grid>
                  {values.address && values.address.length > 0 &&
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{
                              mb: "20px",
                              mt: "20px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            All Address
                          </Typography>
                        </Grid>
                }
                        <Grid item xs={12}>
                          <FieldArray
                            name="address"
                            render={(arrayHelpers) => (
                              <div>
                                {values.address && values.address.length > 0 && (
                                  <>
                                    <Grid
                                      container
                                      spacing={2}
                                      style={{ marginBottom: "10px" }}
                                    >
                                      {values.address.map((friend, index) => (
                                        <React.Fragment key={index}>
                                          <Grid item xs={6} key={index}>
                                            <div key={index}>
                                              <Textfield
                                                name={`address[${index}].title`}
                                                label="Title"
                                                size="small"
                                                />
                                            </div>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <div key={index}>
                                              <Textfield
                                                name={`address[${index}].phone`}
                                                label="Phone"
                                                size="small"
                                              />
                                            </div>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <div key={index}>
                                              <Textfield
                                                name={`address[${index}].address`}
                                                label="Address"
                                                size="small"
                                                multiline={true}
                                                minRows={4}
                                              />
                                            </div>
                                          </Grid>
                                        </React.Fragment>
                                      ))}
                                    </Grid>
                                  </>
                                )}
                                <>
                                  {values.address.length > 0 && (
                                    <Button
                                      style={{ marginRight: "10px" }}
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      onClick={() =>
                                        arrayHelpers.remove(
                                          values.address.length - 1
                                        )
                                      }
                                    >
                                      Remove address
                                    </Button>
                                  )}
                                    <Button variant="contained"  color="primary"  
                                    size='small'
                                     onClick={() =>
                                    arrayHelpers.insert(
                                      values.address.length,
                                      ""
                                    )
                                  } >
                                       Add Address
                                    </Button>
                                </>
                              </div>
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => submitForm()}
                          >
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

export default EditUser;
