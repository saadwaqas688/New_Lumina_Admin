import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Container, Grid, Paper } from "@mui/material";
import Textfield from "../../UI/Textfield/TextField";
import Select from "../../UI/Select/Select";
import Button from "../../UI/Button/Button";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";
import Inputfield from "../../UI/Inputfield/InputField";
import { postService, updateService } from "../../../services/services";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config /Firebase/firebase";
const quantity = [{id:1,value:1},{id:2,value:2},{id:3,value:3},{id:4,value:4},{id:5,value:5},{id:6,value:6},
  {id:7,value:7},{id:8,value:8},{id:9,value:9},{id:10,value:10}]


const AddProduct = ({ recordForEdit, records,  handleModal,getAllProducts }) => {
  const [editMode, setEditMode] = useState(false);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];

  const INITIAL_FORM_STATE = {
    name: "",
    price: "",
    discountPrice: "Not given",
    quantity: "",
    description: "",
    colors: [ ],
    weight:[ ],
    file: null,
    imageUrl: "",
    loader: false,
    error: null,
  };

  let FORM_VALIDATION = "";

  if (editMode) {
    FORM_VALIDATION = Yup.object().shape({
      name: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
      price: Yup.number().integer().required("Required"),
      discountPrice: Yup.string(), 
      quantity: Yup.string()
        .required("Required"),

      description: Yup.string().required("Required"),
      weight: Yup.array()
        .of(
          Yup.string("String is Required!")
            
        ),
        colors: Yup.array()
        .of(
          Yup.string("String is Required!")
            
        ),
        

      file: Yup.array()
        .required("Required Field")
    });
  } else {
    FORM_VALIDATION = Yup.object().shape({
      name: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
      price: Yup.number().integer().required("Required"),
      discountPrice: Yup.string(), 
      quantity: Yup.number()
        .integer()
        .typeError("Please enter a valid phone number")
        .required("Required"),

      description: Yup.string().required("Required"),
      weight: Yup.array()
        .of(
          Yup.string("String is Required!")
            
        ),
        colors: Yup.array()
        .of(
          Yup.string("String is Required!")
            
        ),
      file: Yup.mixed()
        .nullable()
        .required("Required Field")
        .test(
          "type",
          "Invalid file format selection",
          (value) =>
            !value || (value && SUPPORTED_FORMATS.includes(value[2].type))
        ),
    });
  }
  const initialValues = recordForEdit ? recordForEdit : INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);

  // const classes = useStyles();
  async function handelclick(values) {
    
    setloader(true);

    try {
      if (values.file[2]) {
        const value = values.file[2];
        const name2 = new Date().getTime() + "" + value.name;
        const storageRef = ref(storage, "photos/" + name2);
        const uploadTask = uploadBytesResumable(storageRef, value);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
            setloader(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const filedata = [values.file[0], values.file[1]];
                const record = {
                  colors: values.colors,
                  weight:values.weight,
                  description: values.description,
                  image: downloadURL,
                  likedBy: [],
                  name: values.name,
                  numberOfViews: [],
                  price: values.price,
                  quantity: values.quantity,
                  rating: 3,
                  discountPrice: values.discountPrice,
                  file: filedata,
                };
                if (recordForEdit) {
                  await updateService("shop",recordForEdit.id,record)
                  setloader(false);
                  handleModal();
                  getAllProducts()
                } else {
                  await postService("shop",record)
                  setloader(false);
                  handleModal();
                  getAllProducts()

                }
              }
            );
          }
        );
      } else {
        const record = {
          colors: values.colors,
          description: values.description,
          image: values.image,
          weight:values.weight,
          likedBy: [],
          name: values.name,
          numberOfViews: [],
          price: values.price,
          quantity: values.quantity,
          rating: 3,
          discountPrice: values.discountPrice,
          file: values.file,
        };
        await updateService("shop",recordForEdit.id,record)
        setloader(false);
        handleModal();
        getAllProducts()
      }
    } catch (error) {
      console.log("catchError", error);
    }
  }

  useEffect(() => {
    if (recordForEdit) {
      setEditMode(true);
    }
  }, [recordForEdit]);

  return (
    <Paper elevation={0}>
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
                render={({ values, errors, touched,submitForm}) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="name" label="Name" size="small" />
                      </Grid>
                      <Grid item xs={3}>
                        <Textfield name="price" label="Price" size="small" />
                      </Grid>
                      <Grid item xs={3}>
                        <Textfield
                          name="discountPrice"
                          label="Discount Price"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="description"
                          label="Description"
                          size="small"
                          multiline={true}
                          minRows={4}
                          maxRows={8}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Select
                          name="quantity"
                          label="Quantity"
                          size="small"
                          options={quantity}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FieldArray
                          name="weight"
                          render={(arrayHelpers) => (
                            <div>
                              {values.weight && values.weight.length > 0 && (
                                <>
                                  <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {values.weight.map((friend, index) => (
                                      <Grid item xs={4}>
                                        <div key={index}>
                                          <Textfield
                                            name={`weight.${index}`}
                                            label="Weight"
                                            size="small"
                                          />
                                        </div>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </>
                              )}
                              <>
                                {values.weight.length > 0 && (
                                  <Button  style={{ marginRight: "10px" }}
                                  variant="contained"  color="primary" size='small'
                                     onClick={() =>
                                      arrayHelpers.remove(
                                        values.weight.length - 1
                                      )
                                    } 
                                   >
                                       Remove Weight
                                    </Button>
                                )}
                                  <Button variant="contained"  color="primary"  
                                    size='small'
                                     onClick={() =>
                                    arrayHelpers.insert(
                                      values.weight.length,
                                      ""
                                    )
                                  } >
                                       Add Weight
                                    </Button>
                              </>
                            </div>
                          )}
                        />
                      </Grid>
                                         <Grid item xs={12}>
                        <FieldArray
                          name="colors"
                          render={(arrayHelpers) => (
                            <div>
                              {values.colors && values.colors.length > 0 && (
                                <>
                                  <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {values.colors.map((friend, index) => (
                                      <Grid item xs={4}>
                                        <div key={index}>
                                          <Textfield
                                            name={`colors.${index}`}
                                            label="color"
                                            size="small"
                                          />
                                        </div>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </>
                              )}
                              <>
                                {values.colors.length > 0 && (
                                  <Button  style={{ marginRight: "10px" }}
                                  variant="contained"  color="primary" size='small'
                                     onClick={() =>
                                      arrayHelpers.remove(
                                        values.colors.length - 1
                                      )
                                    } 
                                   >
                                       Remove Color
                                    </Button>
                                )}
                                  <Button variant="contained"  color="primary"  
                                    size='small'
                                     onClick={() =>
                                    arrayHelpers.insert(
                                      values.colors.length,
                                      ""
                                    )
                                  } >
                                       Add Color
                                    </Button>
                              </>
                            </div>
                          )}
                        />
                      </Grid>
                      {values.error && <div>{values.error}</div>}

                      {
                        <Grid item xs={12}>
                          {recordForEdit && editMode ? (
                            <PreviewImage url={recordForEdit.image} image={true} />
                          ) : values.file && values.file[2] ? (
                            <PreviewImage file={values.file[2]} image={true}/>
                          ) : (
                            <></>
                          )}
                          <Inputfield name="file" id="raised-button-file"  setEditMode={setEditMode} />
                        </Grid>
                      }

<Grid item xs={12}>
                      <Button variant="contained"  color="primary" sx={{marginTop:"40px",marginBottom:"20px",height:"40px",width:"200px",fontWeight:"bold"}}
                                    disabled={loader?true:false}
                                     onClick={() =>submitForm()
                                   
                                  } >
                       {loader? "Please Wait..." : "Submit Form"}

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

export default AddProduct;
