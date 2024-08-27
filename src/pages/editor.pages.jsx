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
  let { userAuth } = useContext(UserContext);
  //   console.log(userAuth);

  //   console.log(userAuth?.data?.user?.google_auth);

  return (
    <Editorcontext.Provider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      {userAuth?.accessToken === null ? (
        <Navigate to="/signin" />
      ) : editorState == "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </Editorcontext.Provider>
  );
};
export default Editor;
