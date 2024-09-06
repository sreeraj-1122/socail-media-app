import React, { useEffect, useState } from "react";
import person from "../../assets/images/person.jpg";
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram, FaGithub, FaFacebook } from "react-icons/fa6";
import { useStore } from "../../context/StoreContextProvider";
import Post from "./../post/Post";
import { baseUrl, profileUrl } from "./../../baseUrl/baseUrl";
import axios from "axios";
import useDateFormatter from "../../hooks/useDateFormatter.js";

const Profile = () => {
  const { isOpen, setIsOpen, profileId, setProfileId } = useStore();
  const [profile, setProfile] = useState(null);
  const { formatRelativeTime } = useDateFormatter(); // Use the custom hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          baseUrl + "/user/getuser",
          {},
          { withCredentials: true }
        );
        setProfile(response.data.data);
        setProfileId(response.data.data); // Update profileId in context
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isOpen]);

  const handleEditClick = () => {
    setIsOpen(true);
  };

  const profileImageUrl = profile?.profile
    ? `${profileUrl}/${profile.profile.replace(/\\/g, "/")}`
    : person;

  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg md:mb-4 mb-1">
      <section className="flex md:flex-row flex-col items-center gap-3 mb-4">
        <div>
          <img
            src={profileImageUrl}
            alt="Profile"
            className="md:w-14 md:h-14 w-36 rounded-full"
          />
        </div>
        <div className="md:flex-grow text-center md:text-left">
          <h1 className="md:text-lg font-semibold text-3xl">
            {profile?.name || "Sreeraj"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 opacity-80">
            {profile?.profession || "No profession"}
          </p>
        </div>
        <button
          aria-label="Edit Profile"
          onClick={handleEditClick}
        >
          <FaEdit className="text-gray-400 hover:text-blue-500 text-2xl md:text-xl" />
        </button>
      </section>

      <hr className="my-4" />

      <section className="mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MdOutlineEmail className="text-lg" />
          <p className="opacity-90">{profile?.email}</p>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <FaLocationDot className="text-lg opacity-90" />
          <p className="opacity-90">{profile?.location || "Add location"}</p>
        </div>
      </section>

      <hr className="my-4" />

      <section className="mb-4">
        <h1 className="font-semibold">{profile?.friendsCount || 0} Friends</h1>
        <div className="mt-3 text-sm flex justify-between">
          <p className="text-gray-600 dark:text-gray-300 opacity-80">
            Who viewed your profile
          </p>
          <span className="opacity-90">{profile?.viewCount || 0}</span>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-300 opacity-80">Joined</p>
          <span className="opacity-90">
            {formatRelativeTime(profile?.createdAt)}
          </span>
        </div>
      </section>

      <hr className="my-4" />

      <section>
        <h1 className="font-semibold mb-3">Social Profiles</h1>

        <div className="flex items-center gap-2 mb-3">
          <FaInstagram className="text-xl" />
          <a
            href={profile?.instagram || `https://www.instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-90 font-medium"
          >
            Instagram
          </a>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <FaGithub className="text-xl" />
          <a
            href={profile?.github || `https://github.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-90 font-medium"
          >
            Github
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaFacebook className="text-xl" />
          <a
            href={profile?.facebook || `https://www.facebook.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-90 font-medium"
          >
            Facebook
          </a>
        </div>
      </section>

      <hr className="my-4" />

      {/* Posts Section - Visible only on mobile devices */}
      <section className="block md:hidden">
        <h1 className="text-center font-medium text-2xl my-5">Your Posts</h1>
        <Post />
        <Post />
        <Post />
      </section>
    </div>
  );
};

export default Profile;
