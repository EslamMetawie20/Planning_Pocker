import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import VoteNumber from "./../../../Components/Typograpghy/VoteNumber";
import GoogleAvatars from "../../../Common/Vars/GoogleAvatars";

const MemberComponent = ({
  name = "John Lee",
  role = "Frontend Developer",
  avatarIndex = 0,
  vote = 0,
  voted = false,
  revealed = false,
}) => {
  const theme = useTheme();
  return (
    <Stack
      border={voted ? 2 : 1}
      borderColor={
        voted ? theme.palette.secondary.main : theme.palette.grey[300]
      }
      borderRadius={3}
      padding={1}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Avatar
          sx={{ height: "2.5rem", width: "2.5rem" }}
          src={GoogleAvatars[avatarIndex]}
        />
        <Stack>
          <Typography variant="h5" textOverflow={"ellipsis"}>
            {name}
          </Typography>
          <Typography variant="caption" textOverflow={"ellipsis"}>
            {role}
          </Typography>
        </Stack>
      </Stack>
      <VoteNumber number={revealed ? vote : "--"} />
    </Stack>
  );
};

export default MemberComponent;
