import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import { createContext } from "react";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  desc: "",
  author: { personal_info: {} },
};

export const Editorcontext = createContext({});

const Editor = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  let { userAuth } = useContext(UserContext);
  //   console.log(userAuth);
  //   console.log(userAuth?.data?.user?.google_auth);

  return (
    <Editorcontext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {userAuth?.accessToken === null ? (
        <Navigate to="/signin" />
      ) : editorState == "editor" ? (
        <BlogEditor clasName="no-scrollbar" />
      ) : (
        <PublishForm clasName="no-scrollbar" />
      )}
    </Editorcontext.Provider>
  );
};
export default Editor;
