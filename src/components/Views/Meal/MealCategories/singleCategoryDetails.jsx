import {Grid, Paper, Typography } from "@mui/material";

const SingleCategoryDetails = ({ data }) => {
  return (
    <Paper elevation={0}>
      <Grid container spacing={2} sx={{ padding: "10px" }}>
        <Grid item xs={12}>
        <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Name :
          </Typography>
          <Typography
             variant="body1"
            color="text.secondary"
            sx={{  ml: "20px", mt: "20px" }}
          >
            {data.name}
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Description :
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            {data.description}
          </Typography>

        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleCategoryDetails;
