import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Stack,
  Grid,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  FormHelperText,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ChevronRight } from "@mui/icons-material";
import GoogleAvatars from "../../Common/Vars/GoogleAvatars";
import BoxHeader from "../../Components/Frames/BoxHeader";
import { getSessionIds } from "../../Common/Service/SessionService";

function JoinSession() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [sessionIds, setSessionIds] = useState([]);
  const [errors, setErrors] = useState({
    name: false,
    sessionId: false,
  });

  const handleSwap = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === GoogleAvatars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleJoinClick = () => {
    const newErrors = {
      name: name.trim() === "",
      sessionId: sessionId === "",
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.sessionId) {
      navigate("/members");
    }
  };

  useEffect(() => {
    getSessionIds()
      .then((data) => {
        setSessionIds(data.map((session) => session.id));
      })
      .catch((error) => {
        console.error("Fehler bei : ", error);
      });
  }, []);

  return (
    <Grid container>
      <BoxHeader />
      <Grid item xs={12} container spacing={2} mt={1}>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <img
              src={GoogleAvatars[currentAvatarIndex]}
              alt="avatar-logo"
              style={{ width: "140px", height: "140px", borderRadius: "50%" }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: "5%",
                boxShadow: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                backgroundColor: "common.white",
                color: "common.white",
                "&:hover": {
                  backgroundColor: "common.white",
                  transform: "scale(1.1)",
                  boxShadow: 6,
                },
              }}
              onClick={handleSwap}
            >
              <SwapHorizIcon sx={{ color: "primary.main" }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ mt: 2 }}>
          <Stack
            spacing={2}
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              size="small"
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              helperText={errors.name ? "This field is required" : ""}
            />
            <FormControl fullWidth size="small" error={errors.sessionId}>
              <InputLabel>Session</InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                label="Session"
              >
                {sessionIds.map((id) => (
                  <MenuItem key={id} value={id}>
                    Session: {id}
                  </MenuItem>
                ))}
              </Select>
              {errors.sessionId && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ChevronRight />}
          onClick={handleJoinClick}
          sx={{
            mt: 2,
          }}
        >
          JOIN
        </Button>
      </Grid>
    </Grid>
  );
}

export default JoinSession;
