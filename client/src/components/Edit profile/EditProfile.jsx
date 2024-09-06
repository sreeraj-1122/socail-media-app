import React, { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContextProvider";
import { baseUrl } from "../../baseUrl/baseUrl";
import axios from 'axios'; // Import axios
import { toast } from "react-toastify";

const EditProfile = () => {
  const { isOpen, setIsOpen, profileId } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    location: "",
    profession: "",
    instagram: "",
    facebook: "",
    github: "",
    profile: null,
  });

  useEffect(() => {
    if (profileId) {
      setFormData({
        name: profileId.name || "",
        username: profileId.username || "",
        location: profileId.location || "",
        profession: profileId.profession || "",
        instagram: profileId.instagram || "",
        facebook: profileId.facebook || "",
        github: profileId.github || "",
        profile: null, // Initialize with existing profile image if available
      });
    }
  }, [profileId]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // File type validation for profile image
    if (formData.profile && !formData.profile.type.startsWith("image/")) {
      return toast.error("Please upload a valid image file.");
    }
  
    // Validate username length
    if (formData.username.length < 5) {
      return toast.error("Username must be at least 5 characters long.");
    }
  
    // URL validation
    const urlPattern = /^(https?:\/\/)?(www\.)?([\w\d-]+\.[a-z]{2,})([\/\w\d-]*)*\/?$/i;
    if (formData.instagram && !urlPattern.test(formData.instagram)) {
      return toast.error("Instagram link must be a valid URL.");
    }
    if (formData.facebook && !urlPattern.test(formData.facebook)) {
      return toast.error("Facebook link must be a valid URL.");
    }
    if (formData.github && !urlPattern.test(formData.github)) {
      return toast.error("GitHub link must be a valid URL.");
    }
  
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });
  
    try {
      const response = await axios.put(
        `${baseUrl}/user/updateuser`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  
    toggleModal(); // Close the modal after form submission
  };
  
  

  return (
    <>
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-2 w-full max-w-lg max-h-full overflow-auto">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:px-5 py-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit profile
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:px-5 pt-3" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Location"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      name="profession"
                      id="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Profession"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="instagram"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="www.instagram.com"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="facebook"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Facebook
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="www.facebook.com"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="github"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Github
                    </label>
                    <input
                      type="text"
                      name="github"
                      id="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="www.github.com"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="profile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
