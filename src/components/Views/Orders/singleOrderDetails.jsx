import { Box, Grid, Paper, Typography } from "@mui/material";
const SingleOrderDetails = ({data}) => {

  function isEmpty(obj){
return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  return (
    <Paper elevation={0} >
  <Grid container   spacing={2} sx={{padding:'10px'}}>
        <Grid item  md={12}>
        <Typography variant="h5" color="text.secondary" sx={{mb:'20px',mt:'20px',textAlign:'center',fontWeight:'bold'}}>
          Order Details
          </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Adress
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
        {data.address}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Phone Number
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
        {data.phone}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Email
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.email}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Grand Total
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         Rs {data.grandTotal}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{mt:'20px' ,ml:'20px',mr:'20px',fontWeight:'bold'}}>
         Number of Products
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:'20px',ml:'20px',mr:'20px'}}>
         {data.items.length}
        </Typography>
       
                         
       {   data.items.map((item,index)=>{
         return( <>
          <Typography variant="h5" color="text.secondary" sx={{mb:'20px',mt:'20px',textAlign:'center',fontWeight:'bold'}}>
          Items Details
          </Typography>
          <Grid container key={index} >
         { <Grid item xs={12}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',ml:'20px',mr:'20px'}}>
            <Typography variant="h6" color="text.secondary">
            Name
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mr:'20%'}}>
          {item.name}
          </Typography>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',ml:'20px',mr:'20px'}}>
            <Typography variant="h6" color="text.secondary">
            Price
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mr:'20%'}}>
          {item.price}
          </Typography>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',ml:'20px',mr:'20px'}}>
            <Typography variant="h6" color="text.secondary">
            Quantity
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{mr:'20%'}}>
          {item.quantity}
          </Typography>
            </Box>
            
          </Grid>
          }
          </Grid>
         </>)
       })
       }
                                

 {  !isEmpty(data.notes) &&
          <>
      <Typography variant="h5" color="text.secondary" sx={{mb:'10px',mt:'10px',textAlign:'center',fontWeight:'bold'}}>
           Notes about the Order
          </Typography>
          <Grid container>
         <Grid item xs={12}>
         <Typography variant="body2" color="text.secondary" sx={{mt:'10px' ,ml:'20px',mr:'20px',fontSize:"20px"}}>
         subject :   {data.notes.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:'10px' ,ml:'20px',mr:'20px',fontSize:"20px"}}>
         issue Id :  {data.notes.orderId}
        </Typography>
         <Typography variant="body2" color="text.secondary" sx={{mt:'10px' ,ml:'20px',mr:'20px',fontSize:"20px"}}>
         Description :
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mt:'10px',ml:'20px',mr:'20px',fontSize:"20px"}}>
         {data.notes.description}
        </Typography>
          </Grid>
          </Grid>
          </>
}
        </Grid>
 

    </Grid>
    </Paper>

  
  );
};

export default SingleOrderDetails;
