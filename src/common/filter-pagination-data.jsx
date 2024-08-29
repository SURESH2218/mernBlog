import axios from "axios";

const filterPaginationData = async ({
  create_new_array = false,
  state,
  page,
  countRoute,
  data_to_send = {},
  data,
}) => {
  let obj = null;

  if (state != null && !create_new_array) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    try {
      const {
        data: { totalDocs },
      } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}${countRoute}`,
        data_to_send
      );
      obj = { results: data, page: 1, totalDocs };
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  return obj;
};

export default filterPaginationData;
