import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import filterPaginationData from "../common/filter-pagination-data";
import InpageNavigation from "../components/inpage-navigation.component";
import BlogPostCard from "../components/blog-post.component";
import LoadMoreDataBtn from "../components/load-more.component";
import MinimalBlogPost from "../components/manage-blogcard.component";
import NoDataMessage from "../components/nodata.component";
import NotFound from "./404.page";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_blogs: 0,
  },
  social_links: {},
  joinedAt: " ",
};

const ProfiPage = () => {
  let { id: profileId } = useParams();
  let [profile, setProfile] = useState(profileDataStructure);
  let [loading, setLoading] = useState(true);
  let [blogs, setBlogs] = useState(null);
  let [profileLoaded, setProfileLoaded] = useState("");

  let {
    personal_info: { fullname, username: profile_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  let { userAuth } = useContext(UserContext);
  //   console.log(userAuth);

  let username = userAuth?.data?.user?.personal_info?.username;

  //   console.log(userAuth?.data?.user?.personal_info?.username);

  const fetchUserProfile = async () => {
    try {
      let { data: user } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/get-profile",
        { username: profileId }
      );
      //   console.log(user);
      if (user != null) {
        setProfile(user);
      }
      setProfileLoaded(profileId);
      getBlogs({ user_id: user._id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getBlogs = async ({ page = 1, user_id }) => {
    user_id = user_id == undefined ? blogs?.user_id : user_id;
    try {
      let { data } = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",
        {
          author: user_id,
          page,
        }
      );
      let formateData = await filterPaginationData({
        state: blogs,
        data: data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { author: user_id },
      });
      formateData.user_id = user_id;
      setBlogs(formateData);
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  };

  useEffect(() => {
    if (profileId != profileLoaded) {
      setBlogs(null);
    }
    if (blogs == null) {
      resetStates();
      fetchUserProfile();
    }
  }, [profileId, blogs]);

  const resetStates = () => {
    setProfile(profileDataStructure);
    setLoading(true);
    setProfileLoaded("");
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : profile_username?.length ? (
        <section className="h-cover md:flex flex-row-reverse items-start gap-4 min-[1100px]:gap-12">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10">
            <img
              src={profile_img}
              className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
            />
            <h1 className="text-2xl font-medium">@{profile_username}</h1>
            <p className="text-xl capitalize h-6">{fullname}</p>
            <p>
              {total_posts.toLocaleString()} Blogs -{" "}
              {total_reads.toLocaleString()} Reads
            </p>

            <div className="flex gap-4 mt-2">
              {profileId === username ? (
                <Link
                  to="/settings/edit-profile"
                  className="btn-light rounded-md"
                >
                  Edit Profile
                </Link>
              ) : (
                ""
              )}
            </div>

            <AboutUser
              className="max-md:hidden"
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
            />
          </div>

          <div className="max-md:mt-12 w-full">
            <InpageNavigation
              routes={["Blogs Published", "About"]}
              defaultHidden={["About"]}
            >
              <>
                {blogs == null ? (
                  <Loader />
                ) : !blogs.results.length ? (
                  <NoDataMessage message={"No Blogs available"} />
                ) : (
                  blogs.results.map((blog, index) => {
                    return (
                      <AnimationWrapper
                        key={index}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <BlogPostCard
                          content={blog}
                          author={blog.author.personal_info}
                        />
                      </AnimationWrapper>
                    );
                  })
                )}
                <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs} />
              </>

              <AboutUser
                bio={bio}
                social_links={social_links}
                joinedAt={joinedAt}
              />
            </InpageNavigation>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </AnimationWrapper>
  );
};

export default ProfiPage;
