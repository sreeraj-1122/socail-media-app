import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import connect from "../../assets/images/connect.jpg";
import axios from "axios";
import { baseUrl } from "./../../baseUrl/baseUrl";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner component
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContextProvider";

// Function to dynamically create validation schema based on the login state
const getValidationSchema = (login) => {
  return Yup.object({
    name:
      login === "Sign up"
        ? Yup.string().required("Full name is required")
        : Yup.string(),
    username:
      login === "Sign up"
        ? Yup.string()
            .required("Username is required")
            .min(5, "Username must be at least 5 characters")
        : Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
};

const Auth = () => {
  const [login, setLogin] = useState("Login");
  const { setIsAuthenticated } = useStore();
  const navigate=useNavigate()
  const handleSubmit = async (values, { resetForm }) => {
    try {
      let path;
      if (login === "Login") {
        path = `${baseUrl}/user/login`;
      } else {
        path = `${baseUrl}/user/register`;
      }
      const response = await axios.post(path, values);
      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setIsAuthenticated(true);
        toast.success(response.data.message);
        navigate('/');
        resetForm(); // Reset form after successful submission
      } else {  
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Network error or server is down");
      }
    }
  };

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  return (
    <div className="w-full h-screen flex flex-col sm:flex-row  bg-white">
      {/* Section for branding or additional information */}
      <section className="flex-1 grid place-content-center p-8">
        <h1 className="text-6xl font-bold text-blue-600 mb-4 sm:ms-14">
          Insta<span className="text-orange-600">Stream</span>
        </h1>
        <p className="text-xl text-gray-600 font-semibold sm:ms-14">
          Connect with friends and the world around you on Instastream
        </p>
        <img src={connect} alt="" className="w-[90%] h-auto m-auto" />
      </section>

      {/* Section for the authentication form */}
      <section className="flex-1 grid place-content-center p-3">
        <div className="bg-white p-7 rounded shadow-2xl w-[22rem] sm:w-[27rem]">
          <h1 className="text-center text-5xl font-medium font-[Italianno] sm:mb-1 my-3">
            {login}
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(login)} // Use dynamic schema based on mode
            onSubmit={handleSubmit}
            enableReinitialize={true} // Ensure Formik reinitializes when mode changes
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                {login === "Sign up" && (
                  <>
                    <div className="mb-4 ">
                      <label htmlFor="username" className=" text-gray-700 font-medium">
                        Username
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className="w-full p-2 border border-gray-400 rounded"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 mt-1 text-sm font-medium"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className=" text-gray-700 font-medium">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="w-full p-2 border border-gray-400 rounded"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 mt-1 text-sm font-medium"
                      />
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label htmlFor="email" className=" text-gray-700 font-medium">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1 text-sm font-medium"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className=" text-gray-700 font-medium">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-1 text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white p-2 h-12 rounded hover:bg-blue-700 relative"
                >
                  {isSubmitting ? (
                    <div className="flex justify-center items-center gap-4">
                      <span className="ml-2">Submitting...</span>
                      <ClipLoader color="#ffffff" size={20} /> {/* Spinner */}
                    </div>
                  ) : (
                    login
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className="w-full h-[1px] bg-gray-400 my-4"></div>
          {login === "Login" ? (
            <p className="text-center font-medium">
              Don't have an account?{" "}
              <span
                className="font-medium text-green-800 cursor-pointer hover:text-green-900"
                onClick={() => setLogin("Sign up")}
              >
                Create new account
              </span>
            </p>
          ) : (
            <p className="text-center font-medium">
              Already have an account?{" "}
              <span
                className="font-medium text-blue-800 cursor-pointer hover:text-green-900"
                onClick={() => setLogin("Login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Auth;
