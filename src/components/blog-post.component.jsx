import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
  //   console.log(blogData);
  let {
    publishedAt,
    tags,
    title,
    desc,
    banner,
    activity: { total_likes },
    blog_id: id,
  } = content;

  let { fullname, username, profile_img } = author;

  return (
    <Link
      to={`/blog/${id}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
    >
      <div className="w-full ">
        <div className="flex gap-2 items-center mb-7">
          <img src={profile_img} className="w-6 h-6 rounded-full" alt="" />
          <p className="line-clamp-1">
            {fullname}@{username}
          </p>
          <p className="min-w-fit">{getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden  line-clamp-2">
          {desc}
        </p>
        <div className="flex gap-4 mt-7">
          <span className="flex gap-3 overflow-x-scroll no-scrollbar max-w-[250px] sm:max-w-full">
            {tags.map((tag, index) => (
              <div key={index} className="m-1 btn-light py-1 px-4 ">
                {tag}
              </div>
            ))}
          </span>
          <span className="flex ml-3 items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart"></i>
            {total_likes}
          </span>
        </div>
      </div>

      <div className="h-28 aspect-square bg-grey">
        <img src={banner} className="rounded-md" alt="" />
      </div>
    </Link>
  );
};
export default BlogPostCard;
