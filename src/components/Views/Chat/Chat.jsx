import { Box, Grid,TextField,Typography } from "@mui/material";
import { AvatarWrapper, ChatBox } from "./Chat.style";
import ProfileImage from  "../../../assets/images/profileImg.png"
import { convertTimeStampToTime } from "../../../Utils/utils";
import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import { SendIcon } from "../../Icons/SendIcon";
import { getServiceById, updateService } from "../../../services/services";
import {Timestamp } from "firebase/firestore";

const Chat = ({previousData} ) => {
    const [message,setMessage]=useState("")
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState( )

    const getAllMessages = async() => {
        setLoading(true)
        const docSnap =await getServiceById("orders",previousData.id)

        if (docSnap.exists()) {
            setData(docSnap.data())
            setLoading(false)
          } else {
          alert("error occurred")
          setLoading(false)

        }
            };

            async function handleClick(){
                setLoading(true)
                let newData=data.messages

                const newMessage={
                    from:"admin",
                    message:message,
                    time:Timestamp.now()
                }

                newData.push(newMessage)
                await updateService('orders',previousData.id,{messages:newData})
                getAllMessages()
            }

            console.log("data",data)

    useEffect(()=>{
        if(previousData){
setData(previousData)
        }
    },[])

  return (
    loading?<h1>please wait .....</h1>:
  <Grid container   spacing={2}>
        <Grid item  md={12}>
        <Typography variant="h5" color="text.secondary" sx={{textAlign:'center',fontWeight:'bold'}}>
          Chat Messages
          </Typography>
  
          </Grid>
{
          data?.messages.map((item,index)=>{
         if(item.from==="admin"){
            return(
          <Grid item xs={12}>
          <ChatBox background="#ddd" border="1px solid #ccc">
            <Box sx={{display:"flex",alignItems:"center"}}>
            <AvatarWrapper alt="Remy Sharp" src={ProfileImage} />
            <Typography variant="body1"  sx={{marginLeft:"20px"}}>
             {item.message}
          </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"flex-end",color:"#aaa"}}>

            <Typography variant="body1"  >
            
           { convertTimeStampToTime(new Date(item.time.toDate()) )}
            
          </Typography>
            </Box>
            </ChatBox>
          </Grid>
            )
         }  else{
            return(
                <Grid item xs={12}>
                <ChatBox background="#f1f1f1" border="1px solid #dedede">
      
                  <Box sx={{display:"flex",alignItems:"center"}}>
                  <AvatarWrapper alt="Remy Sharp"/>
                  <Typography variant="body1"  sx={{marginLeft:"20px"}}>
                   {item.message}
                </Typography>
                  </Box>
                  <Box sx={{display:"flex",justifyContent:"flex-end",color:"#aaa"}}>
      
                  <Typography variant="body1"  >
                  { convertTimeStampToTime(new Date(item.time.toDate()) )}
                </Typography>
                  </Box>
                  </ChatBox>
                </Grid>
            )
         }          

    
           })

}

<Grid item xs={12}>
    <Box sx={{display:"flex"}}>

<TextField  variant="outlined"  placeholder='Enter Message'  fullWidth required  onChange={(e)=>setMessage(e.target.value)}/>
<Button
                                variant="contained"
                                onClick={handleClick}
                                endIcon={<SendIcon />}
                              >
                              </Button>
    </Box>
    </Grid>
    </Grid>
  );
};

export default Chat;
