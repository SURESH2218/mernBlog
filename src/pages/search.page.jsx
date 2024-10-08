import { useParams } from "react-router-dom";
import InpageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import Loader from "../components/loader.component";
import axios from "axios";
import filterPaginationData from "../common/filter-pagination-data";
import BlogPostCard from "../components/blog-post.component";
import UserCard from "../components/usercard.component";

const SearchPage = () => {
  let { query } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [users, setUsers] = useState(null);
  const searchBlogs = async ({ page = 1, create_new_arr = false }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/search-blogs`,
        { query, page }
      );

      let formateData = await filterPaginationData({
        state: blogs,
        data: data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { query },
        create_new_arr,
      });
      setBlogs(formateData);
      console.log(formateData);
    } catch (error) {
      console.error("Error fetching latest blogs:", error);
    }
  };

  const fetchUsers = async () => {
    let {
      data: { users },
    } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", {
      query,
    });
    setUsers(users);
  };

  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true });
    fetchUsers();
  }, [query]);

  const resetState = () => {
    setBlogs(null);
    setUsers(null);
  };

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users?.length ? (
          users?.map((user, index) => {
            return (
              <AnimationWrapper
                key={index}
                transition={{ duration: 1, delay: index * 0.08 }}
              >
                <UserCard user={user} />
              </AnimationWrapper>
            );
          })
        ) : (
          <NoDataMessage message="No user found" />
        )}
      </>
    );
  };

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InpageNavigation
          routes={[`Search Results from "${query}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
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
            <LoadMoreDataBtn state={blogs} fetchDataFun={searchBlogs} />
          </>
          <UserCardWrapper />
        </InpageNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <h1 className="font-medium text-xl mb-8">
          User related to search<i className="fi fi-rr-user ml-4 mt-1"></i>
        </h1>
        <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;
