import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Paper,
  Box,
} from "@mui/material";

const SkeletonCards: React.FC = () => {
  return (
    <Grid container>
      {[...Array(3)].map((_, index) => (
        <Grid item xs={12} sm={12} md={12} key={index}>
          <Card
            sx={{ display: "flex", p: 2, my: 2 }}
            component={Paper}
            elevation={2}
          >
            <CardMedia>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: 100,
                  width: 150,
                }}
              />
            </CardMedia>

            <CardContent
              component={Skeleton}
              variant="rectangular"
              sx={{
                height: 80,
                width: "100%",
              }}
            ></CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonCards;
