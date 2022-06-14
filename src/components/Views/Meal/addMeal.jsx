import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Textfield from "../../UI/Textfield/TextField";
import Inputfield from "../../UI/Inputfield/InputField";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";
import { Container, Grid,Paper } from "@mui/material";
import Button from "../../UI/Button/Button";
import { postService, updateService } from "../../../services/services";
import Select from "../../UI/Select/Select";

const AddMeal = ({ recordForEdit,handleModal,getAllMeals,categories }) => {
  const [editMode, setEditMode] = useState(false);
  // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];

  const INITIAL_FORM_STATE = {
    title: "",
    protiens: "",
    fats:"",
    carbs: "",
    calories:"",
    category:"",
    status:'notFeatured',
    ingredients: [{ ingredient: '', quantity: '' }],
    recipe: [""],
    file: null,
    file2:null,
    imageUrl: null,
    videoUrl:null,
    fileDataVideo:"",
    fileDataImage:"",
    loader: false,
    error: null,
  };

  let FORM_VALIDATION = "";

  if (editMode) {
    FORM_VALIDATION = Yup.object().shape({
      title: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
        protiens: Yup.number().integer().required("Required"),
        fats: Yup.number().integer().required("Required"), 
        carbs: Yup.number().integer().required("Required"),
        calories: Yup.number().integer().required("Required"),
        category:Yup.string().required("Required"),
        ingredients:Yup.array(
          Yup.object({
            ingredient: Yup.string()
              .required('Ingredient name needed'),
              // .min(3, 'Ingredient name needs to be at least 3 characters')
              // .max(
              //   10,
              //   'Ingredient name needs to be at most 10 characters'
              // ),
            quantity: Yup.string()
              .required('Quantity needed')
              // .min(1, 'Quantity needs to be at least 1%')
              // .max(100, 'Quantity can be at most 100%'),
          })
        ),
          recipe: Yup.array()
          .of(
            Yup.string("String is Required!")

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
      protiens: Yup.number().integer().required("Required"),
      fats: Yup.number().integer().required("Required"), 
      carbs: Yup.number().integer().required("Required"),
      calories: Yup.number().integer().required("Required"),
      category:Yup.string().required("Required"),
      ingredients:Yup.array(
        Yup.object({
          ingredient: Yup.string()
            .required('Ingredient name needed'),
          quantity: Yup.string()
            .required('Quantity needed')
            // .min(1, 'Quantity needs to be at least 1%')
            // .max(100, 'Quantity can be at most 100%'),
        })
      ),
        recipe: Yup.array()
        .of(
          Yup.string("String is Required!")
            .required("Required")
        )
        .min(1, "Atleast One Social Media is Required!")
        .required("Required"),
      // file: Yup.mixed()
      //   .nullable()
      //   .required("Required Field")
      //   .test(
      //     "type",
      //     "Invalid file format selection",
      //     (value) =>
      //       !value || (value && SUPPORTED_FORMATS.includes(value[2].type))
      //   ),
    });
  }
  const initialValues = recordForEdit ? recordForEdit : INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);
  const [imageLoader, setImageloader] = useState(false);
  const [videoLoader, setVideoloader] = useState(false);



  async function handelclick(values) {
    setloader(true);
    console.log("values",values)
    try {
      if (!recordForEdit) {
                const record = {
                  title: values.title,
                  protiens: values.protiens,
                  status:'notFeatured',
                  fats: values.fats,
                  carbs: values.carbs,
                  calories: values.calories,
                  category:values.category,
                  ingredients:values.ingredients,
                  recipe: values.recipe,
                  image: values.imageUrl,
                  video:values.videoUrl,
                  videofile: values.fileDataVideo,
                  imagefile: values.fileDataImage, 
                };
                  await postService("meal",record)
                  setloader(false);
                  handleModal();
                  getAllMeals()
      } else {
        const record = {
          title: values.title,
          protiens: values.protiens,
          fats: values.fats,
          carbs: values.carbs,
          calories: values.calories,
          category:values.category,
          status:values.status,
          ingredients:values.ingredients,
          recipe:values.recipe,
          image:values.imageUrl?values.imageUrl:values.image,
          video:values.videoUrl?values.videoUrl:values.video,
          videofile:values.fileDataVideo?values.fileDataVideo:values.videofile,
          imagefile:values.fileDataImage?values.fileDataImage:values.imagefile,
        };
        await updateService("meal",recordForEdit.id,record)
        setloader(false);
        handleModal();
        getAllMeals()
      }
    } catch (error) {
      alert(error)
      setloader(false);
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
                  {console.log(values)}
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Textfield name="title" label="Title" size="small" />
                      </Grid>
                      <Grid item xs={2}>
                        <Textfield name="calories" label="Calories" size="small" />
                      </Grid>
                      <Grid item xs={2}>
                        <Textfield name="protiens" label="Protiens" size="small" />
                      </Grid>
                      <Grid item xs={2}>
                        <Textfield name="fats" label="Fats" size="small" />
                      </Grid>
                      <Grid item xs={2}>
                        <Textfield name="carbs" label="Carbs" size="small" />
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

                      <Grid item xs={12}>
                        <FieldArray
                          name="ingredients"
                          render={(arrayHelpers) => (
                            <div>
                              {values.ingredients && values.ingredients.length > 0 && (
                                <>
                                  <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {values.ingredients.map((friend, index) => (
                                      <React.Fragment key={index}>
                                      <Grid item xs={6} key={index}>
                                        <div key={index}>
                                          <Textfield
                                           name={`ingredients.${index}.ingredient`}
                                           label="Ingredient"
                                            size="small"
                                          />
                                        </div>
                                      </Grid>
                                       <Grid item xs={6}>
                                       <div key={index}>
                                         <Textfield
                                           name={`ingredients[${index}].quantity`}
                                           label="Quantity"
                                           size="small"
                                         />
                                       </div>
                                     </Grid>
                                     </React.Fragment>
                                    ))}
                                  </Grid>
                                </>
                              )}
                              <>
                                {values.ingredients.length > 1 && (
                                  <Button  style={{ marginRight: "10px" }}
                                  variant="contained"  color="primary" size='small'
                                     onClick={() =>
                                      arrayHelpers.remove(
                                        values.ingredients.length - 1
                                      )
                                    } 
                                   >
                                       Remove Ingredients
                                    </Button>
                                )}
                                  <Button variant="contained"  color="primary"  
                                    size='small'
                                     onClick={() =>
                                    arrayHelpers.insert(
                                      values.ingredients.length,
                                      ""
                                    )
                                  } >
                                       Add Ingredients
                                    </Button>
                              </>
                            </div>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FieldArray
                          name="recipe"
                          render={(arrayHelpers) => (
                            <div>
                              {values.recipe && values.recipe.length > 0 && (
                                <>
                                  <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {values.recipe.map((friend, index) => (
                                      <React.Fragment key={index}>
                                      <Grid item xs={12}>
                                        <div key={index}>
                                          <Textfield
                                            name={`recipe.${index}`}
                                            label={index+1}
                                            size="small"
                                            fullWidth
                                            variant="standard" 
                                          />
                                        </div>
                                      </Grid>
                                      </React.Fragment>
                                    ))}
                                  </Grid>
                                </>
                              )}
                              <>
                                {values.recipe.length > 1 && (
                          
                                  <Button  style={{ marginRight: "10px" }}
                                  variant="contained"  color="primary" size='small'
                                     onClick={() =>
                                      arrayHelpers.remove(
                                        values.recipe.length - 1
                                      )
                                    } 
                                   >
                                       Remove Recipe
                                    </Button>
                                )}
                                  <Button variant="contained"  color="primary"  
                                    size='small'
                                     onClick={() =>
                                    arrayHelpers.insert(
                                      values.recipe.length,
                                      ""
                                    )
                                  } >
                                       Add Recipe
                                    </Button>
                              </>
                            </div>
                          )}
                        />
                      </Grid>
                      {values.error && <div>{values.error}</div>}
                       
                      <Grid item xs={12}>
                          {(recordForEdit && editMode  && recordForEdit.image)? (
                            <PreviewImage url={recordForEdit.image} image={true} />
                          ) : values.file && values.file[2] ? (
                            <PreviewImage file={values.file[2]} image={true}/>
                          ) : (
                            <></>
                          )}
                          <Inputfield name="file" id="raised-button-file" setloader={setImageloader}  videoAndImage={true} video={false} setEditMode={setEditMode} />
                        </Grid>
                      
                          
                         <Grid item xs={6}>
                          {(recordForEdit && editMode && recordForEdit.video )? (
                            <PreviewImage url={recordForEdit.video} image={false} />
                          ) : values.file2 && values.file2[2] ? (
                            <PreviewImage file={values.file2[2]} image={false}/>
                          ) : (
                            <></>
                          )}
                          <Inputfield name="file2" id="raised-button-file2" setloader={setVideoloader}  videoAndImage={true} video={true} setEditMode={setEditMode} />
                        </Grid> 
                      <Grid item xs={12}>
                      <Button variant="contained"  color="primary" sx={{marginTop:"40px",marginBottom:"20px",height:"40px",width:"200px",fontWeight:"bold"}}
                                    disabled={(loader || imageLoader || videoLoader)?true:false}
                                     onClick={() =>submitForm()
                                   
                                  } >
                       {(loader || imageLoader || videoLoader)? "Please Wait..." : "Submit Form"}

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

export default AddMeal;
