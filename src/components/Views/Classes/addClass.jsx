
import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import { updateService } from "../../../services/services";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../config /Firebase/firebase";
import { Container, Grid, Paper} from "@mui/material";
import Textfield from "../../UI/Textfield/TextField";
import Button from "../../UI/Button/Button";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";
import Inputfield from "../../UI/Inputfield/InputField";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Select from "../../UI/Select/Select";
// import * as Yup from "yup";

// 05/15/2022 09:00 pm
// const categories=[{id:'1'},{id:'2'},{id:'3'}]
// const equipments=[{id:'1'},{id:'2'},{id:'3'}]

const AddClass = ({ recordForEdit,handleModal,getAllClasses,equipments,categories}) => {
  const [editMode, setEditMode] = useState(false);
  // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];
  const INITIAL_FORM_STATE = {
    title: "",
    description:"",
    category:"",
    startingDate:"",
    equipments: [" "],
    file: null,
    imageUrl: "",
    loader: false,
    error: null,
  };

  // let FORM_VALIDATION = "";

  // if (editMode) {
  //   FORM_VALIDATION = Yup.object().shape({
  //     title: Yup.string()
  //       .typeError("Please enter a valid phone number")
  //       .required("Required"),
  //       description: Yup.string().required("Required"),
  //       category: Yup.string().required("Required"),
  //       shedule:Yup.array(
  //         Yup.object({
  //           startTime: Yup.string()
  //             .required('Ingredient name needed'),
  //             // .min(3, 'Ingredient name needs to be at least 3 characters')
  //             // .max(
  //             //   10,
  //             //   'Ingredient name needs to be at most 10 characters'
  //             // ),
  //           endTime: Yup.number()
  //             .required('Quantity needed')
  //             // .min(1, 'Quantity needs to be at least 1%')
  //             // .max(100, 'Quantity can be at most 100%'),
  //         })
  //       )
  //         .min(1, 'You need to provide at least 1 startTime')
  //         .max(3, 'You can only provide 3 startTime'),
  //         workOuts: Yup.array()
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
  //     description: Yup.string().required("Required"),
  //     category: Yup.string().required("Required"),
  //     shedule:Yup.array(
  //       Yup.object({
  //         startTime: Yup.string()
  //           .required('Ingredient name needed')
  //           .min(3, 'Ingredient name needs to be at least 3 characters')
  //           .max(
  //             10,
  //             'Ingredient name needs to be at most 10 characters'
  //           ),
  //         endTime: Yup.number()
  //           .required('Quantity needed'),
  //           // .min(1, 'Quantity needs to be at least 1%')
  //           // .max(100, 'Quantity can be at most 100%'),
  //       })
  //     )
  //       .min(1, 'You need to provide at least 1 startTime')
  //       .max(3, 'You can only provide 3 startTime'),
  //       workOuts: Yup.array()
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
  const initialValues = recordForEdit ? recordForEdit : INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);
	const uniqueID = () => {
		return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
	};
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
                  id:uniqueID(),
                  title: values.title,
                  image: downloadURL,
                  description:values.description,
                  startingDate:values.startingDate,
                  equipments:values.equipments,
                  users:[],
                  category:values.category,
                  file: filedata,
                };
                if (recordForEdit) {
                  const docRef = doc(db, "classCategories", values.category.id);
                  const docSnap = await getDoc(docRef);
                  
                  if (docSnap.exists()) {
                  console.log("Document data viky:", docSnap.data());
                   let data=[]
                   let list=docSnap.data()
                   list.classes.map((item)=>{
                      if(item.id===values.id){
                        data.push(record)
                      }else{
                        data.push(item)
                      }
                    })
                     list.classes=data
                    // list.classes[index]=record
                    await updateService("classCategories",values.category.id,list)
                    // console.log("Document data firday:", docSnap.data());
                    // setData(docSnap.data())
                    // setLoading(false)
              
                  } else {
                    console.log("No such document!");
                    // setLoading(false)
                  }
                  // await updateService("test",recordForEdit.id,record)
                  // await postService(`test/${values.category.id}/class`,record)
                  setloader(false);
                  handleModal();
                  getAllClasses()
                  
                  // await updateService("classCategories",recordForEdit.id,record)
                  // setloader(false);
                  // handleModal();
                  // getAllClasses()
                } else {
                  const docRef = doc(db, "classCategories", values.category.id);
                  const docSnap = await getDoc(docRef);
                  
                  if (docSnap.exists()) {
                  console.log("Document data viky:", docSnap.data());

                    let list=docSnap.data()
                    list.classes.push(record)
                    await updateService("classCategories",values.category.id,list)
                    // console.log("Document data firday:", docSnap.data());
                    // setData(docSnap.data())
                    // setLoading(false)
              
                  } else {
                    console.log("No such document!");
                    // setLoading(false)
                  }
                  // await updateService("test",recordForEdit.id,record)
                  // await postService(`test/${values.category.id}/class`,record)
                  setloader(false);
                  handleModal();
                  getAllClasses()

                }
              }
            );
          }
        );
      } else {
        const record = {
          id:values.id,
          title: values.title,
          image: values.image,
          description: values.description,
          category:values.category,
          equipments:values.equipments,
          users:[],
          startingDate:values.startingDate,
          file: values.file,
        };

        const docRef = doc(db, "classCategories", values.category.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
        console.log("Document data viky:", docSnap.data());
         let data=[]
         let list=docSnap.data()
         list.classes.map((item)=>{
            if(item.id===values.id){
              data.push(record)
            }else{
              data.push(item)
            }
          })
           list.classes=data
          // list.classes[index]=record
          await updateService("classCategories",values.category.id,list)
          // console.log("Document data firday:", docSnap.data());
          // setData(docSnap.data())
          // setLoading(false)
    
        } else {
          console.log("No such document!");
          // setLoading(false)
        }
        // await updateService("classCategories",recordForEdit.id,record)
        setloader(false);
        handleModal();
        getAllClasses()
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
                // validationSchema={FORM_VALIDATION}
                onSubmit={(values) => handelclick(values)}
                render={({ values, errors, touched,submitForm}) => (
                  <>
                  {console.log(values)}
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="title" label="Title" size="small" />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield name="startingDate" label="Starting Date" size="small" />
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          name="category"
                          label="Category"
                          size="small"
                          options={categories}
                        />
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
                        <FieldArray
                          name="equipments"
                          render={(arrayHelpers) => (
                            <div>
                              {values.equipments && values.equipments.length > 0 && (
                                <>
                                  <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {values.equipments.map((friend, index) => (
                                      <Grid item xs={6}>
                                        <div key={index}>
                                        <Select
                                              name={`equipments.${index}`}
                                              label="Equipment"
                                              size="small"
                                              options={equipments}
                                            />
                                        </div>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </>
                              )}
                              <>
                                {values.equipments.length > 1 && (
                                  <Button  style={{ marginRight: "10px" }}
                                  variant="contained"  color="primary" size='small'
                                     onClick={() =>
                                      arrayHelpers.remove(
                                        values.equipments.length - 1
                                      )
                                    } 
                                   >
                                       Remove Equipment
                                    </Button>
                                )}
                                  <Button variant="contained"  color="primary"  
                                    size='small'
                                     onClick={() =>
                                    arrayHelpers.insert(
                                      values.equipments.length,
                                      ""
                                    )
                                  } >
                                       Add Equipment
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

export default AddClass;

