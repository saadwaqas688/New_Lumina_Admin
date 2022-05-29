import {  Grid, Paper, Typography } from "@mui/material";
const SingleUserDetails = ({data}) => {

  return (
    <Paper elevation={0} >
  <Grid container   spacing={2} sx={{padding:'10px'}}>
        <Grid item  md={12}>
        <Typography variant="h5" color="text.secondary" sx={{mb:'20px',mt:'20px',textAlign:'center',fontWeight:'bold'}}>
          User Details
          </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Name
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
        {data.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Gender
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
        {data.gender}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Height
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.height}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Date of Birth
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.dateOfBirth}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Phone Number
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.phone}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Email
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.email}
        </Typography>            
       {  data.address.length>0 && data.address.map((item,index)=>{
         return( <>
          <Typography variant="h5" color="text.secondary" sx={{mb:'20px',mt:'20px',textAlign:'center',fontWeight:'bold'}}>
           Adress {index+1}
          </Typography>
          <Grid container key={index} >
              <Typography variant="h5" color="text.secondary" sx={{mb:'10px',mt:'10px',textAlign:'center',fontWeight:'bold'}}>
          </Typography>
          <Grid container>
         <Grid item xs={12}>
         <Typography variant="body2" color="text.secondary" sx={{mt:'10px' ,ml:'20px',mr:'20px',fontSize:"20px"}}>
         Title :   {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:'10px' ,ml:'20px',mr:'20px',fontSize:"20px"}}>
         Phone :  {item.phone}
        </Typography>
         <Typography variant="body2" color="text.secondary" sx={{mt:'10px' ,ml:'20px',mr:'20px',fontSize:"20px"}}>
         Adress :
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'10px',ml:'20px',mr:'20px',fontSize:"20px"}}>
         {item.address}
        </Typography>
          </Grid>
          </Grid>
          
          </Grid>
         </>
       )
       })
       }
        </Grid>
 

    </Grid>
    </Paper>

  
  );
};

export default SingleUserDetails;
