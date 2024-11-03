import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";

const VoteNumber = ({
  number = 8,
  caption = "Last vote",
  includeCaption = false,
  alt = false,
}) => {
  const theme = useTheme();

  const mainColor = alt
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const lightColor = alt
    ? theme.palette.secondary.light
    : theme.palette.primary.light;

  return (
    <Stack alignItems={"center"} height={"fit-content"} width={"fit-content"}>
      <Box
        height={"fit-content"}
        width={"fit-content"}
        borderRadius={"50%"}
        bgcolor={lightColor}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={"2px"}
      >
        <Avatar
          sx={{
            fontSize: "0.75rem",
            height: "1.8rem",
            width: "1.8rem",
            border: 1,
            background: `linear-gradient(45deg, ${mainColor} 0%, ${lightColor} 100%)`,
          }}
        >
          {number}
        </Avatar>
      </Box>
      {includeCaption && (
        <Typography variant="caption" fontSize={"10px"}>
          {caption}
        </Typography>
      )}
    </Stack>
  );
};

export default VoteNumber;
