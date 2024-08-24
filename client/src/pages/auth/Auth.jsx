import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import connect from "../../assets/images/connect.jpg";

// Function to dynamically create validation schema based on the login state
const getValidationSchema = (login) => {
  return Yup.object({
    name: login === "Sign up" 
      ? Yup.string().required("Full name is required") 
      : Yup.string(),
    username: login === "Sign up"
      ? Yup.string().required("Username is required").min(5, "Username must be at least 5 characters")
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

  const handleSubmit = (values) => {
    console.log("Form data:", values);
  };

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  return (
    <div className="w-full h-screen flex bg-white">
      {/* Section for branding or additional information */}
      <section className="flex-1 grid place-content-center p-8">
        <h1 className="text-6xl font-bold text-blue-600 mb-4 ms-14">
          InstaStream
        </h1>
        <p className="text-xl text-gray-600 font-semibold ms-14">
          Connect with friends and the world around you on Instastream
        </p>
        <img src={connect} alt="" className="w-[90%] h-auto m-auto" />
      </section>

      {/* Section for the authentication form */}
      <section className="flex-1 grid place-content-center p-8">
        <div className="bg-white p-8 rounded shadow-2xl w-[27rem]">
          <h1 className="text-center text-5xl font-medium font-[Italianno] mb-1">
            {login}
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(login)} // Use dynamic schema based on mode
            onSubmit={handleSubmit}
            enableReinitialize={true} // Ensure Formik reinitializes when mode changes
          >
            {({ isSubmitting }) => (
              <Form>
                {login === "Sign up" && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-gray-700 font-medium"
                      >
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
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium"
                      >
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
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
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
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium"
                  >
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
                  className="w-full bg-blue-600 text-white p-2 h-12 rounded hover:bg-blue-700"
                >
                  {login}
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
