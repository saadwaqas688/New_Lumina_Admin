import { Box, Grid, Paper, Typography } from "@mui/material";
import CircleBulletIcon from "../../Icons/CircleIcon";

const SingleMealDetails = ({data}) => {
  return (
    <Paper elevation={0} >
  <Grid container   spacing={2} sx={{padding:'10px'}}>
    <Grid item xs={12}  md={6}>
       <Typography variant="h5" color="text.secondary"  sx={{textAlign:'center',mt:'20px'}}>

          {data.title}
        </Typography>
      
    <img src={data.image} alt="Paella dish" width="80%" 
    height="400px" style={{marginBottom:'20px',marginTop:"20px",marginLeft:"20px",borderRadius:"10px",objectFit:"fill"}}
  />
            </Grid>
        <Grid item xs={12} md={6}>
        <Box  sx={{display:'flex' ,justifyContent:'space-between',marginRight:'20px',marginTop:'20px'}}>
           <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',fontWeight:'bold'}}>
           Protien
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          {data.protiens}
          </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Fats
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          {data.fats}
          </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Carbs
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          {data.carbs}
          </Typography>
          </Box>
          </Box>
          <Typography variant="h5" color="text.secondary" sx={{mb:'20px',mt:'20px',textAlign:'center',fontWeight:'bold'}}>
          Ingredients 
          </Typography>
                         
       {   data.ingredients.map((item,index)=>{
         return( 
          <Grid container key={index} >
         { <Grid item xs={12}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',ml:'20px',mr:'20px'}}>
            <Typography variant="h6" color="text.secondary">
            <CircleBulletIcon sx={{fontSize:"10px" ,mr:'5px'}}/>{item.ingredient}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mr:'20%'}}>
          {item.quantity}
          </Typography>
            </Box>
            
          </Grid>
          }
          </Grid>
         )
       })
       }
    <Typography variant="h5" color="text.secondary" sx={{mt:'20px',textAlign:'center',fontWeight:'bold'}}>
         Recipe 
        </Typography>
        <Typography  component="div" variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.recipe.map((item,index)=>{
          return (
          <Box key={index} >
            <CircleBulletIcon sx={{fontSize:"10px" ,mr:'5px'}}/>
            {item}
          </Box>
          )
         })}
        </Typography>
        </Grid>
 

    </Grid>
    </Paper>

  
  );
};

export default SingleMealDetails;
