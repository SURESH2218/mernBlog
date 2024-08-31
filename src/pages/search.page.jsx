import { useParams } from "react-router-dom";
import InpageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import Loader from "../components/loader.component";
import axios from "axios";
import filterPaginationData from "../common/filter-pagination-data";

const SearchPage = () => {
  let { query } = useParams();
  const [blogs, setBlogs] = useState(null);
  const searchBlogs = async ({ page = 1, create_new_arr = false }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/latest-blogs`,
        { page }
      );

      let formateData = await filterPaginationData({
        state: blogs,
        data: data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: {query},
        create_new_array: create_new_arr,
      });
      setBlogs(formateData);
    } catch (error) {
      console.error("Error fetching latest blogs:", error);
    }
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
            {/* <LoadMoreDataBtn
              state={blogs}
              fetchDataFun={
                pageState == "home" ? fetchLatestBlogs : fetchBlogsbyCategory
              }
            /> */}
          </>
        </InpageNavigation>
      </div>
    </section>
  );
};

export default SearchPage;
