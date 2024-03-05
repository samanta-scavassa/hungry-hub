import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

const categories = [
  "American",
  "Asian",
  "Burger",
  "Dessert",
  "German",
  "Italian",
  "Japanese",
  "Pizza",
  "Poke",
  "Salad",
  "Vegan",
  "French",
  "Indian",
  "Mediterranean",
  "Mexican",
];

export default function RestaurantsFilter({ onFilterChange, value }) {
  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Rating</InputLabel>
        <Select
          sx={{ borderRadius: 20 }}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value.rating}
          label="Rating"
          onChange={(event) =>
            onFilterChange({ ...value, rating: event.target.value })
          }
        >
          <MenuItem value="null">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1 and up</MenuItem>
          <MenuItem value={2}>2 and up</MenuItem>
          <MenuItem value={3}>3 and up</MenuItem>
          <MenuItem value={4}>4 and up</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          sx={{ borderRadius: 20 }}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value.category}
          label="Category"
          onChange={(event) =>
            onFilterChange({ ...value, category: event.target.value })
          }
        >
          <MenuItem value="null">
            <em>None</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
