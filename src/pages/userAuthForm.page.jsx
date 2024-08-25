import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { useContext } from "react";
import { UserContext } from "../App";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const UserAuthForm = ({ type }) => {
  let { userAuth, setUserAuth } = useContext(UserContext);

  console.log(userAuth);

  const userAuthThroughServer = async (serverRoute, formData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}${serverRoute}`,
        formData
      );
      storeInSession("userDetails", JSON.stringify(data));
      setUserAuth(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    const form = new FormData(formElement);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { fullname, email, password } = formData;

    if (fullname && fullname.length < 6) {
      return toast.error("Full name must be at least 6 letters long");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be between 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  return userAuth?.data?.accessToken ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form
          id="formElement"
          className="w-[80%] max-w-[400px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome back" : "Join us Today"}
          </h1>
          {type === "sign-up" && (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Enter your full Name"
              icon="fi-rr-user"
            />
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Enter your email"
            icon="fi-rr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Enter your Password"
            icon="fi-rr-key"
          />
          <button className="btn-dark center mt-14" type="submit">
            {type.replace("-", " ")}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-30 text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>OR</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex items-center justify-center gap-4 center w-[90%]"
            type="button"
          >
            <img src={googleIcon} className="w-5 " alt="" />
            Continue with Google
          </button>
          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join Us
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
