import { Box, Grid, Paper, Rating, Typography } from "@mui/material";

const SingleProductDetails = ({ data }) => {
  return (
    <Paper elevation={6}>
      <Grid container spacing={2} sx={{ padding: "10px" }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ textAlign: "center", mt: "20px" }}
          >
            {data.name}
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
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Price :
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            {data.price}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Discount Price :
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            {data.discountPrice ? data.discountPrice : "Discount not give"}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Rating :
          </Typography>

          <Rating
            name="read-only"
            value={data.rating}
            readOnly
            sx={{ ml: "20px" }}
          />
            { data.colors.length > 0 &&  <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Available Colors :
          </Typography>}
          <Box sx={{ display: "flex", mt: "5px", ml: "20px", mr: "20px" }}>
            {data.colors.length > 0 &&
              data.colors.map((ele, index, colors) => {
                return (
                  <Typography variant="body1" color="text.secondary">
                    {index === colors.length - 1 ? ele : ele + ","}
                  </Typography>
                );
              })}
          </Box>
       { data.weight.length > 0 &&  <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Available Weights :
          </Typography>}
          <Box sx={{ display: "flex", mt: "5px", ml: "20px", mr: "20px" }}>
            {data.weight.length > 0 &&
              data.weight.map((ele, index, weight) => {
                return (
                  <Typography variant="body1" color="text.secondary">
                    {index === weight.length - 1 ? ele : ele + ","}
                  </Typography>
                );
              })}
          </Box>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            Quantity :
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            {data.quantity}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleProductDetails;
