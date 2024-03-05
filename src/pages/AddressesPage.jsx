import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import CabinIcon from "@mui/icons-material/Cabin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import addressService from "../services/adresses.service";
import { useNavigate, useParams } from "react-router-dom";
import "./AddressesPage.css";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchAddress = () => {
    addressService
      .getAddressByUser(userId)
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/*");
      });
  };

  useEffect(() => {
    fetchAddress();
  }, [addresses]);

  const handleDelete = (addressId) => {
    addressService.deleteAddress(addressId);
  };

  return (
    <Container sx={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        My Addresses
      </Typography>
      <Grid justifyContent="center" alignItems="center">
        {addresses.map((address) => (
          <Box
            justifyContent={"center"}
            display={"flex"}
            alignItems={"center"}
            item
            xs={12}
            sm={6}
            key={address.id}
          >
            <Card
              sx={{
                margin: "10px",
                maxWidth: "350px",
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                <CabinIcon sx={{ fontSize: "48px", marginBottom: "10px" }} />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h5">{address.label}</Typography>
                  <Typography variant="h6" component="h2">
                    {address.street} {address.number} {address.city}
                  </Typography>
                </Box>
                <EditIcon
                  variant="contained"
                  color="#8D99AE"
                  onClick={() => {
                    navigate(`/hungry-hub/user-addresses/${address._id}/edit`);
                  }}
                >
                  Edit
                </EditIcon>
                <DeleteIcon
                  sx={{ backgroundColor: "white", color: "#EF233C" }}
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(address._id)}
                >
                  Delete
                </DeleteIcon>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
      <div className="EditButtons">
        <Button
          sx={{ backgroundColor: "white", color: "#EF233C" }}
          variant="outlined"
          color="error"
          onClick={() =>
            navigate(`/hungry-hub/user-addresses/${userId}/create`)
          }
        >
          Create Address
        </Button>
        <Button
          sx={{ backgroundColor: "#EF233C", color: "white" }}
          variant="contained"
          color="error"
          onClick={() => navigate("/hungry-hub/")}
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
}
