import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import FrameComponent from "../../Components/Frames/FrameComponent";
import { IconButton } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import useStories from "../../Common/Hooks/useStories";
import { STATUS } from "../../Common/Vars/Constants";
import LoaderComp from "../../Components/Extras/LoaderComp";

const StoryView = () => {
  const { status, selectedStory } = useStories();

  const cleanHTML = DOMPurify.sanitize(selectedStory?.content);
  const parsedContent = parse(cleanHTML);
  return (
    <FrameComponent
      paperSx={{
        flex: 3,
      }}
      title={selectedStory?.title}
      icon={
        <IconButton>
          <EditRounded color="secondary" fontSize="small" />
        </IconButton>
      }
    >
      {status === STATUS.LOADING ? <LoaderComp /> : parsedContent}
    </FrameComponent>
  );
};

export default StoryView;
