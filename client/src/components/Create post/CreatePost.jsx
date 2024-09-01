import React, { useRef } from "react";
import person from "../../assets/images/person.jpg";
import { IoMdImages } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { BiSolidFileGif } from "react-icons/bi";

const CreatePost = () => {
  const fileInputRef = useRef(null);

  const handleSpanClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input's click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the uploaded file here
    console.log("File selected:", file);
  };

  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg mb-3 ">
      <form action="" className="">
        <div className="flex mb-5 gap-2 items-center">
          <img src={person} alt="Profile" className="w-10 h-10 rounded-full" />
          <input
            type="text"
            name="postContent"
            className="ps-4 py-3  border dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full dark:text-white dark:bg-[#212b36] rounded-full h-full"
            placeholder="What's on your mind...."
          />
        </div>
        <div className="flex justify-between w-full px-2 text-sm text-gray-600 dark:text-gray-300 opacity-80">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the actual file input
            onChange={handleFileChange}
          />
          <span
            onClick={handleSpanClick}
            className="cursor-pointer flex items-center gap-2 "
          >
            <IoMdImages /> Images
          </span>
          <span className="cursor-pointer flex items-center gap-2 ">
            <FaVideo /> Video
          </span>
          <span className="cursor-pointer flex items-center gap-2 ">
            <BiSolidFileGif /> Gif
          </span>
          <button
            type="submit"
            className="bg-blue-800 text-white px-3 py-1 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
