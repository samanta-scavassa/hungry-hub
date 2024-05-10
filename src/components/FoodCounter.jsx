import { ButtonGroup, Button, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./FoodCounter.css";

export default function FoodCounter({ onChange, value, id }) {
  const handleChange = (count) => {
    onChange(id, count);
  };

  return (
    <Box>
      <ButtonGroup>
        <Button
          className="styled-button"
          onClick={() => handleChange(value - 1)}
          disabled={value === 0}
          sx={{ width: "24px" }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <TextField
          className="styled-input"
          size="small"
          disabled
          value={value}
          sx={{ width: "48px" }}
        />
        <Button
          className="styled-button"
          onClick={() => handleChange(value + 1)}
          sx={{ width: "24px" }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </Box>
  );
}
