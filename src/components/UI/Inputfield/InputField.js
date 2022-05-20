import React from 'react';
import { useField, useFormikContext } from 'formik';
import Button from '../Button/Button';
const Inputfield = ({
  video,
  name,
  setEditMode,
  ...otherProps
}) => {
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
  }

  const handleChange = async (evt) => {
    setEditMode(false)

    if(video){
     const duration = await getVideoDuration(evt.target.files[0]);
      setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0],duration]);    

    }else{
      setFieldValue(name, [evt.target.files[0].name,evt.target.files[0].type,evt.target.files[0]]);    
    }

    };

  return (
 <>
   { 
    <input
   accept={video? "video/mp4,video/x-m4v,video/*":"image/*"}
   style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
  onChange={handleChange }
/>
}
{configTextfield.error && <div>{configTextfield.helperText}</div>}

<label htmlFor="raised-button-file">
    <Button  variant="contained" component="span">
       {video?"Upload Video":"Upload Image"}
     </Button>
</label> 

    </>
  );
};

export default Inputfield;
