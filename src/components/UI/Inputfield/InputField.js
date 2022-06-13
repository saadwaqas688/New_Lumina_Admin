import React from 'react';
import { useField, useFormikContext } from 'formik';
import Button from '../Button/Button';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../config /Firebase/firebase';
import { Box, Typography } from '@mui/material';
const Inputfield = ({
  setloader,
  video,
  name,
  setEditMode,
  id,
  videoAndImage,
  ...otherProps
}) => {
  const [inputLoader,setInputLoader]=React.useState(false)
  const [upLoadingprogress,setUpLoadingprogress]=React.useState("1")


  const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const media = new Audio(reader.result);
      media.onloadedmetadata = () => resolve(media.duration);
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',

  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
    console.log('mata.error',mata.error)
  }

  const handleChangeVideoAndImage = async (evt) => {
    setEditMode(false)    
      setloader(true);
      setInputLoader(true)
      try {
          const value = evt.target.files[0];
          const name2 = new Date().getTime() + "" + value.name;
          const storageRef = ref(storage, "videos/" + name2);
          const uploadTask = uploadBytesResumable(storageRef, value);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
              Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setUpLoadingprogress(progress)
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
              alert(error)
              setloader(false);
              setInputLoader(false)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  const filedata = [evt.target.files[0].name, evt.target.files[0].type]
                  
                  if(video){
                    setFieldValue("videoUrl",downloadURL)
                    const duration = await getVideoDuration(evt.target.files[0]);
                    setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0],duration]); 
                    setFieldValue("fileDataVideo",filedata)
                  }else{
                    setFieldValue("imageUrl",downloadURL)
                    setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0]]);    
                    setFieldValue("fileDataImage",filedata)

                  }
                  setloader(false);
                  setInputLoader(false)
                }
              );
            }
          );
        
      } catch (error) {
        alert(error)
        console.log("catchError", error);
      }


    };

    const handleChange = async (evt) => {
      setEditMode(false)
      if(video){
       const duration = await getVideoDuration(evt.target.files[0]);
        setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0],duration]);    
  
      }else{
        setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0]]);    
      }
    }
  return (
 <>
   { 
    <input
   accept={video? "video/mp4,video/x-m4v,video/*":"image/*"}
   style={{ display: 'none'}}
  id={id}
  multiple
  type="file"
  onChange={inputLoader?undefined:videoAndImage?handleChangeVideoAndImage:handleChange }
/>
}
{configTextfield.error && <div>{configTextfield.helperText}</div>}

{
  !inputLoader?
(  <label htmlFor={id}>
    <Button variant="outlined"  component="span" disabled={inputLoader?true:false} >
       {inputLoader?"Upload is " + upLoadingprogress + "% done":video?"Upload Video":"Upload Image"}
     </Button>
</label> ):
(<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"4px",background:"lightgrey",width:"170px",height:"40px"}}>
  <Typography sx={{color:"#ff6699"}}>
  {"Upload is " + upLoadingprogress + "% done"}
  </Typography>

</Box>)
}

    </>
  );
};

export default Inputfield;
