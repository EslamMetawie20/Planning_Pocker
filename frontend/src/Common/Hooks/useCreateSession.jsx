import { useCallback, useEffect, useState } from "react";
import GoogleAvatars from "../Vars/GoogleAvatars";
import { createSession } from "../../_redux/reducers/sessionSlice";
import { useDispatch } from "react-redux";

const useCreateSession = () => {
  const [openQuilEditor, setOpenQuilEditor] = useState(false);
  const [sessionEdited, setSessionEdited] = useState(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState({ name: false, position: false });

  const handleOpenQuilEditor = () => {
    setOpenQuilEditor(true);
  };

  const handleCloseQuilEditor = () => {
    setOpenQuilEditor(false);
  };

  const handleSwap = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === GoogleAvatars.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const [initialStory, setInitialStory] = useState({});
  const getQuillData = useCallback((title, content) => {
    setInitialStory({ title, content });
  }, []);

  useEffect(() => {
    if (initialStory?.content && initialStory.title) {
      setSessionEdited(true);
    } else {
      setSessionEdited(false);
    }
  }, [initialStory]);

  const dispatch = useDispatch();
  const handleCreateSession = () => {
    const newErrors = {
      name: name.trim() === "",
      position: position.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.position) {
      const request = {
        position,
        initialStory,
      };
      dispatch(createSession(request));
    }
  };

  return {
    handleCreateSession,
    handleSwap,
    handleCloseQuilEditor,
    handleOpenQuilEditor,
    currentAvatarIndex,
    setName,
    name,
    setPosition,
    position,
    sessionEdited,
    openQuilEditor,
    errors,
    getQuillData,
    initialStory,
  };
};

export default useCreateSession;
