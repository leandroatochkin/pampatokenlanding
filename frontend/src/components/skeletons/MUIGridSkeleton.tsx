import { Box, Skeleton } from "@mui/material"

export const TableSkeleton = () => (// for later use
    <Box
      sx={{ width: "100%", height: "calc(100vh - 300px)", minHeight: "400px" }}
    >
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Skeleton
            key={i}
            height={35}
            animation="wave"
            sx={{
              my: 0.5,
              opacity: 1 - i * 0.1, // Fades as it goes down
            }}
          />
        ))}
    </Box>
  )