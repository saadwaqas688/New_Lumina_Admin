import { Box, Grid, Paper, Typography } from "@mui/material";
import Button from "../../UI/Button/Button";

const SingleBlogDetails = ({ data }) => {
  return (
    <Paper elevation={6}>
      <Grid container spacing={2} sx={{ padding: "10px" }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ textAlign: "center", mt: "20px" }}
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
        <Grid item xs={12} md={6}>
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
          <Box sx={{ display: "flex", mt: "5px", ml: "20px", mr: "20px" }}>
            <Button variant="contained">
              <a
                href={data.blogUrl}
                style={{ textDecoration: "none", color: "White" }}
              >
                Visit Link
              </a>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleBlogDetails;
