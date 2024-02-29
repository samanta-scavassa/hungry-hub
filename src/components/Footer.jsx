import { Copyright } from "@mui/icons-material";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function Footer() {
  return (
    <footer className="Footer">
      <Paper elevation={3} sx={{ height: 200, padding: "32px" }}>
        <Container maxWidth="md" sx={{ height: "100%" }}>
          <Box className="SocialMediaContainer">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We are Hungry Hub, dedicated to providing the best food
                  service to our customers.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  HauptStraße 123, Berlin, Germany
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: hungry-hub@email.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: +49 234 567 8901
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Follow Us
                </Typography>
                <Link href="https://www.facebook.com/">
                  <Facebook />
                </Link>
                <Link href="https://www.instagram.com/" sx={{ pl: 1, pr: 1 }}>
                  <Instagram />
                </Link>
                <Link href="https://www.twitter.com/">
                  <Twitter />
                </Link>
              </Grid>
            </Grid>
          </Box>
          <hr />
          <Typography variant="body2">
            <Copyright /> {new Date().getFullYear()} - Hungry Hub
          </Typography>
        </Container>
      </Paper>
    </footer>
  );
}
