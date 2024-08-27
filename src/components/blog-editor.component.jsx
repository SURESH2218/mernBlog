import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import uploadImage from "../common/aws";
import { useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Editorcontext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";

const BlogEditor = () => {
  let {
    blog,
    blog: { title, banner, content, tags, author, desc },
    setBlog,
  } = useContext(Editorcontext);

  useEffect(() => {
    let editor = new EditorJS({
      holder: "textEditor",
      data: "",
      tools:tools,
      placeholder: "Write the Story...💭",
    });
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

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="" />
        </Link>
        <p className="hidden sm:block text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
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
    </>
  );
};

export default BlogEditor;
