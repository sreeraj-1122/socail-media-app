import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Auth = () => {
  // Handle form submission
  const handleSubmit = (values) => {
    console.log("Form data:", values);
    // Handle form submission (e.g., send data to an API)
  };

  return (
    <div className="w-full h-screen flex">
      {/* Section for branding or additional information */}
      <section className="flex-1 grid place-content-center p-8">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">instaStream</h1>
        <p className="text-xl text-gray-600 font-semibold">
          Connect with friends and the world around you on Instastream
        </p>
       
      </section>

      {/* Section for the authentication form */}
      <section className=" flex-1 grid place-content-center p-8">
        <div className="bg-white p-8 rounded shadow-2xl  w-[27rem]">
          <h1 className="text-center text-5xl font-medium font-[Italianno] mb-1">
            Login
          </h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="Username"
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
                    htmlFor="text"
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
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <div className="w-full h-[1px] bg-gray-400 my-4"></div>
          <p className="text-center font-medium">
            Don't have an account?{" "}
            <span className="font-medium text-green-800 cursor-pointer hover:text-green-900">
              Create new account
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Auth;
