import { Box, Grid, Paper,Typography } from "@mui/material";

const SingleClassDetails = ({data}) => {
  return (
    <Paper elevation={6} >
  <Grid container   spacing={2} sx={{padding:'10px'}}>
    <Grid item xs={12}  md={6}>
       <Typography variant="h5" color="text.secondary"  sx={{textAlign:'center',mt:'20px',fontWeight:'bold'}}>
          {data.title}
        </Typography>
      
    <img src={data.image} alt="Paella dish" width="80%" 
    height="400px" style={{marginTop:"20px",marginLeft:"20px",borderRadius:"10px",objectFit:"fill"}}
  />
            </Grid>
        <Grid item xs={12} md={6}>
    <Typography variant="h5" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Description :
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.description}
        </Typography>
        <Box  sx={{display:'flex' ,justifyContent:'space-between',marginRight:'20px',marginTop:'20px'}}>
           <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',fontWeight:'bold'}}>
           Starting Date
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
            12 July
          </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',fontWeight:'bold'}}>
           Total Students
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
            12
          </Typography>
          </Box>
          </Box>
          
        <Typography variant="h5" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',fontWeight:'bold'}}>
          Classes Sheduled Time :
          </Typography>
          <Grid container >
         <Grid item xs={12}>
         <Box  sx={{display:'flex' ,justifyContent:'space-between',marginRight:'20px',marginTop:'20px'}}>
           <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px',}}>
         12 July 12 pm
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
            13 July 12 pm
          </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignItems:'center',marginRight:'20px'}}>
         <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         14 July 12 pm
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
          15 July 12 pm
          </Typography>
          </Box>
          </Box>
 
            
          </Grid>
          
          </Grid>

        </Grid>
 

    </Grid>
    </Paper>

  
  );
};

export default SingleClassDetails;

