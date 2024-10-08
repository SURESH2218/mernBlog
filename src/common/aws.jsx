import axios from "axios";

const uploadImage = async (img) => {
  let imgUrl = null;
  await axios
    .get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {
      await axios({
        method: "PUT",
        url: uploadURL,
        headers: { "Content-Type": img.type },
        data: img,
      }).then(() => {
        imgUrl = uploadURL.split("?")[0];
        // console.log(imgUrl);
      });
    });
  return imgUrl;
};

export default uploadImage;
