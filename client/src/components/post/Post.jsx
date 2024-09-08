import React, { useState } from "react";
import person from "../../assets/images/person.jpg";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";
import useDateFormatter from "../../hooks/useDateFormatter";
import { profileUrl } from "../../baseUrl/baseUrl";
import { useStore } from "../../context/StoreContextProvider";

const Post = ({
  posts,
  handleAddComment,
  comments,
  newComment,
  setNewComment,
  id,
  setId,
  activePostId,
  setActivePostId,
}) => {
  const { formatRelativeTime } = useDateFormatter();
  const { profileId } = useStore();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div
            className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg mb-3"
            key={post._id}
          >
            {/* Post Header */}
            <div className="flex items-center gap-2 mb-2 ">
              {post.userId && post.userId.profile ? (
                <img
                  src={`${profileUrl}/${post.userId.profile}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setId(post.userId?._id)}
                />
              ) : (
                <img
                  src={person} // Fallback image if userId or profile is null
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setId(post.userId?._id)}
                />
              )}
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h1
                    className="text-[14px] font-[500] opacity-95 cursor-pointer"
                    onClick={() => setId(post.userId?._id)}
                  >
                    {post.userId ? post.userId.name : "Unknown User"}
                  </h1>
                  <h2 className="text-[12px] font-[400] opacity-75">
                    {formatRelativeTime(post.createdAt)}
                  </h2>
                </div>
                <p className="text-[12px] text-gray-600 dark:text-gray-300 opacity-9 ">
                  {(post.userId && post.userId.location) || "Unknown location"}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-3 mt-3">
              <p className="opacity-85">{post.description}</p>
              {post.filePath && (
                <img
                  src={`${profileUrl}/${post.filePath}`}
                  alt="Post Content"
                  className="rounded-lg object-contain"
                />
              )}
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
                  onClick={() =>
                    setActivePostId(activePostId === post._id ? null : post._id)
                  }
                />
                <p>10</p>
              </div>
              <div className="mr-2">
                <HiOutlineBookmark className="text-lg font-semibold cursor-pointer" />
              </div>
            </div>

            {activePostId === post._id && (
              <>
                {/* Comments Section */}
                <div className="mt-4">
                  {/* Existing Comments */}
                  <div className="mb-4">
                    {comments?.map((comment, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 mb-2 w-full justify-between"
                      >
                        <img
                          src={person}
                          alt="Commenter Profile"
                          className="w-8 h-8 rounded-full cursor-pointer"
                        />
                        <div className="p-2 rounded-lg flex-grow">
                          <h1 className="text-sm font-semibold">{comment?.from}</h1>
                          <p className="text-sm">{comment?.comment}</p>
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
                      className="flex-grow border-b p-2 dark:bg-[#2c2c2c] dark:text-white outline-none"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) =>
                        setNewComment( e.target.value)
                      }
                    />
                    <IoSendSharp
                      className="text-lg mr-3 cursor-pointer"
                      onClick={() => handleAddComment(post._id,profileId.name)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
};

export default Post;
