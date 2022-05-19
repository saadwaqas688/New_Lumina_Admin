import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { setISODay } from "date-fns/esm";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../config /Firebase/firebase";
import { updateService } from "../../../services/services";
import Button from "../../UI/Button/Button";
const SingleClassDetails = ({ data ,getAllClasses, handleModal}) => {
  const [linkField, setLinkField] = useState(false);
  const [link, setLink] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [time, setTime] = useState(null);


function handleChange(e){
  setLink(e.target.value)
}

function handleClick(time,id){
  setLinkField(true)
  setId(id)
  setTime(time)
}
async function handleDelete(classTime,userId){
  setLoading(true)
  const docRef = doc(db, "classCategories", data.category.id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
  const newData= data.users.map((user)=>{
          if(user.id===userId && classTime===user.dateTime){
             delete user.classLink
            return user
          } else{
            return user
          }     
  })
  let list=docSnap.data()   
  const finalData=list.classes.map((item)=>{
    if(item.id===data.id){
      item.users=newData
      return item
    }else{
     return item
    }
  })

  list.classes=finalData
    await updateService("classCategories",data.category.id,list)
    getAllClasses()
    handleModal()
    setLoading(false)
}
   
}
async function handleSubmit(){ 
     setLoading(true)
  const docRef = doc(db, "classCategories", data.category.id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
  const newData= data.users.map((user)=>{
          if(user.id===id && time===user.dateTime){
            return {...user,classLink:link}
          } else{
            return user
          }     
  })
  let list=docSnap.data()
  console.log("listWaqas",list)
   
  const finalData=list.classes.map((item)=>{
    if(item.id===data.id){
      item.users=newData
      return item
    }else{
     return item
    }
  })

  list.classes=finalData

  console.log('finalData',list)

    await updateService("classCategories",data.category.id,list)
    getAllClasses()
    handleModal()
    setLinkField(false)
    setLoading(false)

}
    
}
 function submit(e){
  e.preventDefault()
  handleSubmit()
}
  return (
    <Paper elevation={6}>
      <Grid container spacing={2} sx={{ padding: "10px" }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ textAlign: "center", mt: "20px", fontWeight: "bold" }}
          >
            {data.title}
          </Typography>

          <img
            src={data.image}
            alt="Paella dish"
            width="80%"
            height="400px"
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              borderRadius: "10px",
              objectFit: "fill",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ padding: "20px" }}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Description :
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: "20px" }}
          >
            {data.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mt: "20px", fontWeight: "bold" }}
              >
                Starting Date
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "20px" }}
              >
                {data.startingDate}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mt: "20px", fontWeight: "bold" }}
              >
                Total Students
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "20px" }}
              >
                {data.users.length > 0
                  ? data.users.length
                  : "No Student Enrolled"}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", fontWeight: "bold" }}
          >
            {!linkField ? "Classes Sheduled" : "Make Zoom Link For Classs"}
          </Typography>
          {(!linkField && data.users.length>0)?(
            data.users.map((item, index) => {
              return (
                <Grid container key={index}>
                  {
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" color="text.secondary">
                          {item.dateTime}
                        </Typography>
                       { !item.classLink ?<Button
                          size="small"
                          variant="contained"
                          onClick={() => handleClick(item.dateTime,item.id)}
                        >
                            <Typography variant="body1">
                              <strong>Generate Link</strong>
                                </Typography>
                        </Button>:
                      <Button
                          custombgcolor="#ff1a53"
                          size="small"
                          variant="contained"
                          onClick={() => handleDelete(item.dateTime,item.id)}
                        >
                             <Typography variant="body1">
                                  <strong>{loading?"please wait .....":'Delete Link'}</strong>
                                </Typography>
                        </Button>
                       }
                      </Box>
                    </Grid>
                  }
                </Grid>
              );
            })
            ): !linkField ?
            <Typography variant="h6" color="text.secondary" sx={{mt:'20px'}}>
            No Classes Sheduled
            </Typography>:
            <></>
            }
          {linkField && (
            <>
              <TextField
                name="description"
                label="Enter Link"
                size="small"
                fullWidth
                onChange={handleChange}
                sx={{ marginTop: "10px" }}
              />
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                onClick={submit}
              >
                  <Typography variant="body1">
                                  <strong>{loading?"please wait .....":'submit'}</strong>
                                </Typography>
                
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleClassDetails;

