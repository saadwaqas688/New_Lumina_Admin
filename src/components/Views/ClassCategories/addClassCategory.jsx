import React, { useEffect, useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { Container, Grid, Paper } from "@mui/material";
import Textfield from "../../UI/Textfield/TextField";
import Button from "../../UI/Button/Button";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";
import Inputfield from "../../UI/Inputfield/InputField";
import { postService, updateService } from "../../../services/services";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config /Firebase/firebase";

const AddClassCategory = ({ recordForEdit, records,  handleModal,getAllProducts }) => {
  const [editMode, setEditMode] = useState(false);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];

  const INITIAL_FORM_STATE = {
    name: "",
    description: "",
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
      discountPrice: Yup.number().integer().required("Required"), 
      quantity: Yup.number()
        .integer()
        .typeError("Please enter a valid phone number")
        .required("Required"),

      description: Yup.string().required("Required"),
      colors: Yup.array()
        .of(
          Yup.string("String is Required!")
            .min(4, "Too Short")
            .max(20, "Too Long")
            .required("Required")
        )
        .min(1, "Atleast One Social Media is Required!")
        .required("Required"),

      // file: Yup.array()
      //   .required("Required Field")
    });
  } else {
    FORM_VALIDATION = Yup.object().shape({
      name: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
      price: Yup.number().integer().required("Required"),
      discountPrice: Yup.number().integer().required("Required"), 
      quantity: Yup.number()
        .integer()
        .typeError("Please enter a valid phone number")
        .required("Required"),

      description: Yup.string().required("Required"),
      colors: Yup.array()
        .of(
          Yup.string("String is Required!")
            .min(4, "Too Short")
            .max(20, "Too Long")
            .required("Required")
        )
        .min(1, "Atleast One Social Media is Required!")
        .required("Required"),
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
                  description: values.description,
                  image: downloadURL,
                  name: values.name,
                  file: filedata,
                };
                if (recordForEdit) {
                  await updateService("classCategories",recordForEdit.id,record)
                  setloader(false);
                  handleModal();
                  getAllProducts()
                } else {
                  await postService("classCategories",record)
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
          description: values.description,
          image: values.image,
          name: values.name,
          file: values.file,
        };
        await updateService("classCategories",recordForEdit.id,record)
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
    <Paper>
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
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="name" label="Name" size="small" />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="description"
                          label="Description"
                          size="small"
                          multiline={true}
                          minRows={4}
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
                          <Inputfield name="file" setEditMode={setEditMode} />
                        </Grid>
                      }

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

export default AddClassCategory;
