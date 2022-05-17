import React, { useEffect, useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Textfield from "../../UI/Textfield/TextField";
import Inputfield from "../../UI/Inputfield/InputField";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";
import { Container, Grid,Paper } from "@mui/material";
import Button from "../../UI/Button/Button";
import { storage } from "../../../config /Firebase/firebase";
import { postService, updateService } from "../../../services/services";

const AddBlog = ({ recordForEdit,handleModal,getAllMeals }) => {
  const [editMode, setEditMode] = useState(false);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];
  const urlValidation = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm


  const INITIAL_FORM_STATE = {
    title: "",
    description:"",
    blogUrl:"",
    file: null,
    imageUrl: "",
    loader: false,
    error: null,
  };

  let FORM_VALIDATION = "";

  if (editMode) {
    FORM_VALIDATION = Yup.object().shape({
      title: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
        description: Yup.string()
        .typeError("Please enter a valid description")
        .required("Required"),
        blogUrl: Yup.string().matches(urlValidation,'URL is not valid')
        .required("Required"),
      // file: Yup.array()
      //   .required("Required Field")
    });
  } else {
    FORM_VALIDATION = Yup.object().shape({
      title: Yup.string()
      .typeError("Please enter a valid phone number")
      .required("Required"),
      description: Yup.string()
      .typeError("Please enter a valid description")
      .required("Required"),
      blogUrl: Yup.string().matches(urlValidation,'URL is not valid')
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
                  title: values.title,
                  description:values.description,
                  blogUrl:values.blogUrl,
                  image: downloadURL,
                  file: filedata,
                 
                };
                if (recordForEdit) {
                  await updateService("blogs",recordForEdit.id,record)
                  setloader(false);
                  handleModal();
                  getAllMeals()
                } else {
                  await postService("blogs",record)
                  setloader(false);
                  handleModal();
                  getAllMeals()

                }
              }
            );
          }
        );
      } else {
        const record = {
              title: values.title,
              description:values.description,
              image: values.image,
              blogUrl:values.blogUrl,
              file: values.file,
        };
        await updateService("blogs",recordForEdit.id,record)
        setloader(false);
        handleModal();
        getAllMeals()
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
    <Paper >
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
                  <>
                  {console.log(values)}
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Textfield name="title" label="Title" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield
                          name="description"
                          label="Description"
                          size="small"
                          multiline={true}
                          minRows={4}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield name="blogUrl" label="Enter Video Url" size="small" />
                      </Grid>
                      
                      {values.error && <div>{values.error}</div>}

                      {
                        <Grid item xs={12}>
                          {recordForEdit && editMode ? (
                            <PreviewImage url={recordForEdit.image} image={true}/>
                          ) : values.file && values.file[2] ? (
                            <PreviewImage file={values.file[2]}  image={true}/>
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

export default AddBlog;
