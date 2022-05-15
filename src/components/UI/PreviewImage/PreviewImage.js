
import React from 'react';

const PreviewImage = ({url,file,image}) => {

  const [preview, setPreview] = React.useState(null)
 if(!url){
    const reader = new FileReader();

    reader.readAsDataURL(file);
  
    reader.onload = () => {
  
      setPreview(reader.result);
  
    }
  }

  return (
    <div>
    { image ?

     ( <img src={url?url:preview} alt="Preview" 
      width="30%" 
      height="100px" 
      style={{marginTop:"10px",marginBottom:"10px",marginLeft:"5px",borderRadius:"10px",objectFit:"fill"}}     
      />
     )
         :
         
        ( <video
             src={url?url:preview}
             controls
            style={{ width: "100%", height: "100%" }}
          />
        )
         }

    </div>
  )

}

export default PreviewImage