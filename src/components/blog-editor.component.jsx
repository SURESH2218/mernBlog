import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import uploadImage from "../common/aws";
import React, { useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Editorcontext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import { UserContext } from "../App";
import axios from "axios";

const BlogEditor = () => {
  let { userAuth } = useContext(UserContext);
  // console.log(userAuth);

  let accessToken = userAuth?.data?.accessToken;
  let {
    blog,
    blog: { title, banner, content, tags, author, desc },
    setBlog,
    textEditor,
    editorState,
    setEditorState,
    setTextEditor,
  } = useContext(Editorcontext);

  let navigate = useNavigate();

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: content,
        tools: tools,
        placeholder: "Write the Story...💭",
      })
    );
  }, []);

  const handleBannerUpload = async (e) => {
    let img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading("Uploading...");
      try {
        const url = await uploadImage(img);
        if (url) {
          toast.dismiss(loadingToast);
          toast.success("Uploaded 👍🚀");
          setBlog({ ...blog, banner: url });
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Failed to upload image.");
        console.error(error.message);
      }
    }
  };

  const handleTitleKeyDown = (e) => {
    // console.log(e);
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  const handleError = (e) => {
    let img = e.target;
    img.src = defaultBanner;
  };

  const handlePublish = async () => {
    if (!banner.length) {
      return toast.error("Upload a banner to publish it");
    }
    if (textEditor.isReady) {
      try {
        const data = await textEditor.save();
        if (data.blocks.length) {
          setBlog({ ...blog, content: data });
          setEditorState("publish");
        } else {
          toast.error("Write something in your blog to publish it");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveDraft = async (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      return toast.error("Write blog title before saving it as a draft");
    }

    let loadinToast = toast.loading("Saving Draft....");
    e.target.classList.add("disable");

    if (!textEditor.isReady) {
      toast.dismiss(loadinToast);
      e.target.classList.remove("disable");
      return toast.error("Text editor is not ready");
    }

    let content;
    try {
      content = await textEditor.save();
    } catch (error) {
      console.error("Error saving content from text editor:", error); // Log detailed error
      toast.dismiss(loadinToast);
      e.target.classList.remove("disable");
      return toast.error("Failed to save content");
    }

    let blogObj = {
      title,
      banner,
      desc,
      tags,
      content,
      draft: true,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/create-blog`,
        blogObj,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.dismiss(loadinToast);
      toast.success("Draft saved 👍");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error during blog draft save:", error); // Log full error
      e.target.classList.remove("disable");
      toast.dismiss(loadinToast);

      let errorMessage = "An error occurred";
      if (error.response) {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return toast.error(errorMessage);
    }
  };

  return (
    <React.Fragment>
      <div className="no-scrollbar overflow-auto h-screen">
        <nav className="navbar">
          <Link to="/" className="flex-none w-10">
            <img src={logo} alt="" />
          </Link>
          <p className="hidden sm:block text-black line-clamp-1 w-full">
            {title.length ? title : "New Blog"}
          </p>
          <div className="flex gap-4 ml-auto">
            <button className="btn-dark py-2" onClick={handlePublish}>
              Publish
            </button>
            <button className="btn-light py-2" onClick={handleSaveDraft}>
              Save Draft
            </button>
          </div>
        </nav>
        <Toaster />
        <AnimationWrapper>
          <section>
            <div className="mx-auto max-w-[900px] w-full">
              <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
                <label htmlFor="uploadBanner">
                  <img
                    src={banner}
                    onError={handleError}
                    className="object-cover"
                  />
                  <input
                    type="file"
                    id="uploadBanner"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleBannerUpload}
                  />
                </label>
              </div>

              <textarea
                defaultValue={title}
                placeholder="Blog Title"
                className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 placeholder:opacity-60 leading-tight scrollbar"
                onKeyDown={handleTitleKeyDown}
                onChange={handleTitleChange}
              ></textarea>

              <hr className="w-full opacity-20 my-5" />

              <div id="textEditor" className="font-gelasio"></div>
            </div>
          </section>
        </AnimationWrapper>
      </div>
    </React.Fragment>
  );
};

export default BlogEditor;
