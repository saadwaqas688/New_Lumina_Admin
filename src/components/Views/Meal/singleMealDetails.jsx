import { Box, Grid, Paper, Typography } from "@mui/material";
import CircleBulletIcon from "../../Icons/CircleIcon";

const SingleMealDetails = ({ data }) => {
  return (
    <Paper elevation={0}>
      <Grid container spacing={2} sx={{ padding: "10px" }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ borderBottom: "lightgrey 3px solid", mt: "20px" }}
            >
              {data.title}
            </Typography>
          </Box>

          <img
            src={data.image}
            alt="Paella dish"
            width="80%"
            height="250px"
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              marginLeft: "20px",
              borderRadius: "10px",
              objectFit: "fill",
            }}
          />
          <video
            src={data.video}
            controls
            style={{
              width:"80%",
              height:"250px",
              marginBottom: "20px",
              marginTop: "20px",
              marginLeft: "20px",
              borderRadius: "10px",
              objectFit: "fill",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
                sx={{
                  mt: "20px",
                  ml: "20px",
                  mr: "20px",
                  fontWeight: "bold",
                  borderBottom: "lightgrey 3px solid",
                }}
              >
                Calories
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "20px", ml: "20px", mr: "20px" }}
              >
                {data.calories}
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
                sx={{
                  mt: "20px",
                  ml: "20px",
                  mr: "20px",
                  fontWeight: "bold",
                  borderBottom: "lightgrey 3px solid",
                }}
              >
                Protien
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "20px", ml: "20px", mr: "20px" }}
              >
                {data.protiens}
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
                sx={{
                  mt: "20px",
                  ml: "20px",
                  mr: "20px",
                  fontWeight: "bold",
                  borderBottom: "lightgrey 3px solid",
                }}
              >
                Fats
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "20px", ml: "20px", mr: "20px" }}
              >
                {data.fats}
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
                sx={{
                  mt: "20px",
                  ml: "20px",
                  mr: "20px",
                  fontWeight: "bold",
                  borderBottom: "lightgrey 3px solid",
                }}
              >
                Carbs
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: "20px", ml: "20px", mr: "20px" }}
              >
                {data.carbs}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "20px",
              mt: "20px",
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: "bold", borderBottom: "lightgrey 3px solid" }}
            >
              Ingredients
            </Typography>
          </Box>

          {data.ingredients.map((item, index) => {
            return (
              <Grid container key={index}>
                {
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        ml: "20px",
                        mr: "20px",
                      }}
                    >
                      <Typography variant="h6" color="text.secondary">
                        <CircleBulletIcon
                          sx={{ fontSize: "10px", mr: "5px" }}
                        />
                        {item.ingredient}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mr: "20%" }}
                      >
                        {item.quantity}
                      </Typography>
                    </Box>
                  </Grid>
                }
              </Grid>
            );
          })}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "20px",
              mt: "20px",
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mt: "20px",
                textAlign: "center",
                fontWeight: "bold",
                borderBottom: "lightgrey 3px solid",
              }}
            >
              Recipe
            </Typography>
          </Box>
          <Typography
            component="div"
            variant="body1"
            color="text.secondary"
            sx={{ mt: "20px", ml: "20px", mr: "20px" }}
          >
            {data.recipe.map((item, index) => {
              return (
                <Box key={index}>
                  <CircleBulletIcon sx={{ fontSize: "10px", mr: "5px" }} />
                  {item}
                </Box>
              );
            })}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleMealDetails;
