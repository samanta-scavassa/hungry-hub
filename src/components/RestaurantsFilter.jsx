import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RestaurantsFilter({ onFilterChange, value }) {
  return (
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
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>1 and up</MenuItem>
        <MenuItem value={2}>2 and up</MenuItem>
        <MenuItem value={3}>3 and up</MenuItem>
        <MenuItem value={4}>4 and up</MenuItem>
      </Select>
    </FormControl>
  );
}
