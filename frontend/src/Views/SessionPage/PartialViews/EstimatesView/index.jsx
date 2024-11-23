import React, { useState } from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Divider, IconButton, Stack, Dialog } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import StoryComp from "./Components/StoryComp";
import RoundComp from "./Components/RoundComp";
import EstimateForm from "./Components/EstimateForm";
import EstimatesFooter from "./Components/EstimatesFooter";
import useStories from "../../../../Common/Hooks/useStories";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import QuilEditor from "../../../../PartialViews/QuilEditor.jsx";
import { STATUS } from "../../../../Common/Vars/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addStory } from "../../../../_redux/reducers/storySlice";
import {
  endSession,
  leaveSession,
} from "../../../../_redux/reducers/sessionSlice.js";

const EstimatesView = () => {
  const { status, stories, selectedStory, handleSelectStory } = useStories();
  const [openQuilEditor, setOpenQuilEditor] = useState(false);
  const dispatch = useDispatch();
  const sessionId = useSelector((state) => state.session.sessionId);
  const isScrumMaster = useSelector((state) => state.session.isScrumMaster);

  const handleAddStory = (title, content) => {
    const newStory = {
      id: `story-${Date.now()}`,
      title,
      content,
      estimate: 0,
    };
    dispatch(addStory(newStory));
    setOpenQuilEditor(false);
  };

  const handleLeaveSession = () => {
    dispatch(leaveSession());
  };

  const handleEndSession = () => {
    dispatch(endSession());
  };

  return (
    <>
      <FrameComponent
        paperSx={{
          flex: 1,
        }}
        sx={{
          paddingY: 1,
          paddingX: 0,
          mt: 2,
        }}
        title={"User stories"}
        icon={
          isScrumMaster && (
            <IconButton onClick={() => setOpenQuilEditor(true)}>
              <AddCircleOutline color="secondary" fontSize="small" />
            </IconButton>
          )
        }
      >
        {status === STATUS.LOADING ? (
          <LoaderComp />
        ) : (
          <>
            <Stack spacing={1} height={"25%"} overflow={"auto"} paddingX={1}>
              {stories.map((story) => (
                <StoryComp
                  key={story?.id}
                  title={story?.title}
                  selected={selectedStory.id === story?.id}
                  estimate={story?.estimate}
                  disabled={!isScrumMaster}
                  onClick={() => handleSelectStory(story?.id)}
                />
              ))}
            </Stack>
            <Stack height={"65%"} spacing={2} px={2} mt={2}>
              <Divider />
              <RoundComp
                title="Current round:"
                time="01:27"
                onClick={() => {}}
              />
              <Divider />
              <Stack justifyContent={"space-between"} flex={1}>
                {isScrumMaster && <EstimateForm />}
                <EstimatesFooter
                  sessionId={sessionId}
                  buttonLabel={isScrumMaster ? "End Session" : "Leave Session"}
                  onClick={
                    isScrumMaster ? handleEndSession : handleLeaveSession
                  }
                />
              </Stack>
            </Stack>
          </>
        )}
      </FrameComponent>

      {/* Dialog لإظهار QuilEditor */}
      <Dialog
        open={openQuilEditor}
        onClose={() => setOpenQuilEditor(false)}
        maxWidth="md"
        fullWidth
      >
        <QuilEditor
          sendData={handleAddStory}
          onSubmit={() => setOpenQuilEditor(false)}
          initial={{ title: "", content: "" }}
          buttonLabel="Save"
        />
      </Dialog>
    </>
  );
};

export default EstimatesView;
