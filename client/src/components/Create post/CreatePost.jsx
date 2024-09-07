import React, { useRef, useState } from "react";
import person from "../../assets/images/person.jpg";
import { IoMdImages } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { BiSolidFileGif } from "react-icons/bi";
import { useStore } from "../../context/StoreContextProvider";
import { profileUrl } from "../../baseUrl/baseUrl";

const CreatePost = ({
  handleSpanClick,
  handleSubmit,
  formData,
  setFormData,
  fileInputRef,
  fileType,
  handleFileChange,
}) => {

  const {  profileId } = useStore();
  const profileImageUrl = profileId?.profile
  ? `${profileUrl}/${profileId.profile.replace(/\\/g, "/")}`
  : person;
  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg mb-3">
      <form onSubmit={handleSubmit}>
        <div className="flex mb-5 gap-2 items-center">
          <img src={profileImageUrl}
           alt="Profile" className="w-10 h-10 rounded-full" />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="ps-4 py-3 border dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full dark:text-white dark:bg-[#212b36] rounded-full h-full"
            placeholder="What's on your mind...."
          />
        </div>
        <div className="flex justify-between w-full px-2 text-sm text-gray-600 dark:text-gray-300 opacity-80">
          <input
            type="file"
            name="filePath"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the actual file input
            accept={
              fileType === "image"
                ? "image/*"
                : fileType === "video"
                ? "video/*"
                : fileType === "gif"
                ? "image/gif"
                : "*/*" // Default to all file types
            }
            onChange={handleFileChange}
          />
          <span
            onClick={() => handleSpanClick("image")}
            className="cursor-pointer flex items-center gap-2"
          >
            <IoMdImages /> Images
          </span>
          <span
            onClick={() => handleSpanClick("video")}
            className="cursor-pointer flex items-center gap-2"
          >
            <FaVideo /> Video
          </span>
          <span
            onClick={() => handleSpanClick("gif")}
            className="cursor-pointer flex items-center gap-2"
          >
            <BiSolidFileGif /> Gif
          </span>
          <button
            type="submit"
            className="bg-blue-800 text-white px-3 py-1 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
