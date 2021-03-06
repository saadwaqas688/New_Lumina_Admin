
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
import * as Yup from "yup";
import DateAndTimePicker from "../../UI/DateTimePicker/DateTimePicker";

const AddClass = ({ recordForEdit,handleModal,getAllClasses,equipments,categories}) => {
  const [editMode, setEditMode] = useState(false);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];
  const INITIAL_FORM_STATE = {
    title: "",
    description:"",
    category:"",
    targetArea:"",
    startingDate:new Date(),
    equipments: [" "],
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
        description: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
        targetArea:Yup.string().required("Required"),
        // startingDate: Yup.string().required("Required"),
        equipments: Yup.array()
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
      title: Yup.string()
      .typeError("Please enter a valid phone number")
      .required("Required"),
      description: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      targetArea:Yup.string().required("Required"),
      // startingDate: Yup.string().required("Required"),
      equipments: Yup.array()
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
	const uniqueID = () => {
		return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
	};
  async function handelclick(values) {
    setloader(true);
    let equipmentsData=[]
    if(values.equipments){
      equipments.map((item)=>{
        if(values.equipments.indexOf(item.id) !== -1)  {
          equipmentsData.push(item.record)
          }

      })
    }
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
            alert("error occur uploading image")
            setloader(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const filedata = [values.file[0], values.file[1]];
                const record = {
                  id:values.id,
                  title: values.title,
                  image: downloadURL,
                  description:values.description,
                  targetArea:values.targetArea,
                  startingDate:values.startingDate.seconds?new Date(values.startingDate.seconds*1000):values.startingDate,
                  equipments:equipmentsData,
                  users:[],
                  category:values.category,
                  file: filedata,
                };
                if (!recordForEdit) {
                  record.id=uniqueID()
                }
                  const docRef = doc(db, "classCategories", values.category.id);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                  console.log("Document data viky:", docSnap.data());
                   let data=[]
                   let list=docSnap.data()
                   if(!recordForEdit){
                    list.classes.push(record)
                   }else{
                    list.classes.map((item)=>{
                      if(item.id===values.id){
                        data.push(record)
                      }else{
                        data.push(item)
                      }
                    })
                     list.classes=data
                   }
                
                    await updateService("classCategories",values.category.id,list)
                    handleModal();
                    getAllClasses()
                  } else {
                    setloader(false);
                    alert("Error Occur while posting or updating")
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
          targetArea:values.targetArea,
          description: values.description,
          category:values.category,
          equipments:equipmentsData,
          users:[],
          startingDate:values.startingDate.seconds?new Date(values.startingDate.seconds*1000):values.startingDate,
          file: values.file,
        };

        const docRef = doc(db, "classCategories", values.category.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
         let data=[]
         let list=docSnap.data()
         console.log("Document data viky with out image:", list.classes);

         list.classes.map((item)=>{
            if(item.id===values.id){
              data.push(record)
            }else{
              data.push(item)
            }
          })
           list.classes=data
           console.log("list",list)
           try{
            await updateService("classCategories",values.category.id,list)

           }catch(error){
            alert(error)
           }
        } else {
          alert("error occur while updating")
          setloader(false);
        }
        setloader(false);
        handleModal();
        getAllClasses()
      }
    } catch (error) {
      alert("error Occur try catch",error)
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
                  <>
                  {console.log("values in form",values)}
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="title" label="Title" size="small" />
                      </Grid>
                      <Grid item xs={6}>
                        < DateAndTimePicker  value={values.startingDate.seconds?new Date(values.startingDate.toDate()).toDateString():values.startingDate} name="startingDate" size="small" />

                      </Grid>
          {!recordForEdit &&
                      (<Grid item xs={6}>
                        <Select
                          name="category"
                          label="Category"
                          size="small"
                          options={categories}
                          type="item"
                        />
                      </Grid>)
                }
                      <Grid item xs={6}>
                        <Textfield name="targetArea" label="Target Area" size="small" />
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
                                              type="id"
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

