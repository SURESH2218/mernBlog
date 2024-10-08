import { Link } from "react-router-dom";
import pageNotFoundImage from "../imgs/404.png";
import fullLogo from "../imgs/full-logo.png";

const NotFound = () => {
  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
      <img
        src={pageNotFoundImage}
        className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
        alt=""
      />
      <h1 className="text-4xl font-gelasio leading-7">Page not found</h1>
      <p>
        The page you are looking for does not exists. Head back to the{" "}
        <Link to="/" className="text-black underline font-bold capitalize">
          home page
        </Link>
      </p>

      <div className="mt-auto">
        <img
          src={fullLogo}
          alt=""
          className="h-8 object-contain block mx-auto select-none"
        />
        <p className="mt-5 text-dark-grey">
          Read millions of stories around the world
        </p>
      </div>
    </section>
  );
};

export default NotFound;
