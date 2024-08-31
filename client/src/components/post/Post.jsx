import React, { useState } from "react";
import person from "../../assets/images/person.jpg";
import nature from "../../assets/images/nature.jpg";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

const Post = () => {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center gap-2 mb-2 ">
        <img
          src={person}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        <div className="flex-grow ">
          <div className="flex justify-between">
            <h1 className="text-[14px] font-[500] opacity-95 cursor-pointer">
              Sreeraj
            </h1>
            <h2 className="text-[12px] font-[400] opacity-75">5 hours ago</h2>
          </div>
          <p className="text-[12px] text-gray-600 dark:text-gray-300 opacity-9 cursor-pointer">
            No profession
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-3 mt-3">
        <p className="opacity-85">
          Lorem ipsum sit amet consectetur adipisicing elit. Expedita,
          laboriosam! Officiis, reprehenderit. Quibusdam et totam aliquam, nihil
          unde reprehenderit autem iure cum optio sit quas perferendis harum
          pariatur fugiat rem. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ipsum hic deleniti vitae voluptas repudiandae
          assumenda dolorem est alias provident aliquam obcaecati cum optio
          explicabo eligendi similique perferendis, quidem dignissimos magni.
        </p>
        <img src={nature} alt="Nature" className="rounded-lg object-contain" />
      </div>

      {/* Post Actions */}
      <div className="flex items-center gap-5 mt-2">
        <div className="flex items-center gap-1">
          <GoHeart className="text-lg font-semibold cursor-pointer" />
          <p>10</p>
        </div>
        <div className="flex items-center gap-1 flex-grow">
          <FaRegComment
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setShow(!show)}
          />
          <p>10</p>
        </div>
        <div className="mr-2">
          <HiOutlineBookmark className="text-lg font-semibold cursor-pointer" />
        </div>
      </div>
      {show && (
        <>
          {/* Comments Section */}
          <div className="mt-4">
            {/* Existing Comments */}
            <div className="mb-4">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 mb-2 w-full justify-between"
                >
                  <img
                    src={person}
                    alt="Commenter Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <div className=" p-2 rounded-lg flex-grow">
                    <h1 className="text-sm font-semibold">Commenter</h1>
                    <p className="text-sm">{comment}</p>
                    <p className="text-xs mt-2 cursor-pointer">Reply</p>
                  </div>
                  <div className="mr-2">
                    <GoHeart className="text-smlg font-semibold cursor-pointer" />
                    <p className="text-sm">10</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Comment */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-grow border-b  p-2 dark:bg-[#2c2c2c] dark:text-white outline-none"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <IoSendSharp
                className="text-lg mr-3 cursor-pointer"
                onClick={handleAddComment}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
