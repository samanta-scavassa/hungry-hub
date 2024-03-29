import { ButtonGroup, Button, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: blueGrey[50],
  borderColor: blueGrey[200],
  "&:hover": {
    backgroundColor: blueGrey[100],
    borderColor: blueGrey[300],
  },
}));

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
      borderColor: blueGrey[200],
    },
    "&:hover fieldset": {
      borderColor: blueGrey[300],
    },
    "&.Mui-focused fieldset": {
      borderColor: blueGrey[500],
    },
    "& input": {
      textAlign: "center",
      width: 60,
      color: blueGrey[700],
    },
  },
});

export default function FoodCounter({ onChange, value, id }) {
  const handleChange = (count) => {
    onChange(id, count);
  };

  return (
    <Box>
      <ButtonGroup>
        <StyledButton
          onClick={() => handleChange(value - 1)}
          disabled={value === 0}
          sx={{ width: "24px" }}
        >
          <RemoveIcon fontSize="small" />
        </StyledButton>
        <StyledInput
          size="small"
          disabled
          value={value}
          sx={{ width: "48px" }}
        />
        <StyledButton
          onClick={() => handleChange(value + 1)}
          sx={{ width: "24px" }}
        >
          <AddIcon fontSize="small" />
        </StyledButton>
      </ButtonGroup>
    </Box>
  );
}
