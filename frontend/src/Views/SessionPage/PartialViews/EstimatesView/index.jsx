import React from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Divider, IconButton, Stack } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import StoryComp from "./Components/StoryComp";
import RoundComp from "./Components/RoundComp";
import EstimateForm from "./Components/EstimateForm";
import EstimatesFooter from "./Components/EstimatesFooter";
import useStories from "../../../../Common/Hooks/useStories";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import { STATUS } from "../../../../Common/Vars/Constants";

const EstimatesView = () => {
  const { status, stories, selectedStory, handleSelectStory } = useStories();

  return (
    <FrameComponent
      paperSx={{
        flex: 1,
      }}
      sx={{ paddingY: 1, paddingX: 0 }}
      title={"Estimates"}
      icon={
        <IconButton>
          <AddCircleOutline color="secondary" fontSize="small" />
        </IconButton>
      }
    >
      {status === STATUS.LOADING ? (
        <LoaderComp />
      ) : (
        <>
          <Stack spacing={1} height={"22%"} overflow={"auto"} paddingX={1}>
            {stories.map((story) => (
              <StoryComp
                key={story?.id}
                title={story?.title}
                selected={selectedStory.id === story?.id}
                estimate={story?.estimate}
                onClick={() => handleSelectStory(story?.id)}
              />
            ))}
          </Stack>
          <Stack height={"76%"} spacing={1} px={1} mt={1}>
            <Divider />
            <RoundComp
              title="Last round:"
              time="04:39"
              frequent="8"
              high="34"
              low="5"
            />
            <Divider />
            <RoundComp title="Current round:" time="01:27" onClick={() => {}} />
            <Divider />
            <Stack justifyContent={"space-between"} flex={1}>
              <EstimateForm />
              <EstimatesFooter sessionId={"a23389cc"} />
            </Stack>
          </Stack>
        </>
      )}
    </FrameComponent>
  );
};

export default EstimatesView;
