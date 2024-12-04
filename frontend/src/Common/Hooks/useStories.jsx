import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStory,
  selectStory,
  updateStory,
} from "../../_redux/reducers/storySlice";
import { getTokenData } from "../Utils/tokenUtils";

const useStories = () => {
  const dispatch = useDispatch();
  const { status, stories, selectedStoryId } = useSelector(
    (state) => state.story
  );
  const [selectedStory, setSelectedStory] = useState(null);
  useEffect(() => {
    const story = stories.find((story) => story.id === selectedStoryId);
    setSelectedStory(story || stories[0]);
  }, [selectedStoryId, dispatch]);

  const handleAddStory = (title, content) => {
    const newStory = {
      sessionCode: getTokenData().sessionId,
      title,
      description: content,
    };
    dispatch(addStory(newStory));
  };

  const handleSelectStory = (storyId) => {
    dispatch(selectStory(storyId));
  };

  const handleUpdateStory = (updatedStory) => {
    dispatch(updateStory(updatedStory));
  };

  return {
    status,
    stories,
    selectedStory,
    handleSelectStory,
    handleUpdateStory,
    handleAddStory,
  };
};

export default useStories;
