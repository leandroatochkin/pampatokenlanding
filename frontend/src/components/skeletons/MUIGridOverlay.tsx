import { GridOverlay } from "@mui/x-data-grid"
import { CircularProgress } from "@mui/material"

export const CustomLoadingOverlay = () => (
    <GridOverlay
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={40} />
    </GridOverlay>
  )
