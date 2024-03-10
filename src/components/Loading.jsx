import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="error" />
    </Stack>
  );
}
