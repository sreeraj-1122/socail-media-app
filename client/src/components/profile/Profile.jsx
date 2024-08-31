import React from "react";
import person from "../../assets/images/person.jpg";
import { FaEdit } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram, FaGithub, FaFacebook } from "react-icons/fa6";

const Profile = () => {
  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg mb-4">
      <section className="flex items-center gap-3 mb-4">
        <div>
          <img src={person} alt="Profile" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-grow">
          <h1 className="text-lg font-semibold">Sreeraj</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 opacity-80">No profession</p>
        </div>
        <button aria-label="Edit Profile">
          <FaEdit className="text-gray-400 hover:text-blue-500" />
        </button>
      </section>

      <hr className="my-4" />

      <section className="mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MdOutlineEmail className="text-lg" />
          <p className="opacity-90">sreeraj2122@gmail.com</p>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm ">
          <FaLocationDot className="text-lg opacity-90" />
          <p className="opacity-90">Add location</p>
        </div>
      </section>

      <hr className="my-4" />

      <section className="mb-4">
        <h1 className="font-semibold">2 Friends</h1>
        <div className="mt-3 text-sm flex justify-between">
          <p className="text-gray-600 dark:text-gray-300 opacity-80 ">Who viewed your profile</p>
          <span className="opacity-90">0</span>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-300 opacity-80">Joined</p>
          <span className="opacity-90">a minute ago</span>
        </div>
      </section>

      <hr className="my-4" />

      <section>
        <h1 className="font-semibold mb-3">Social Profiles</h1>
        <div className="flex items-center gap-2 mb-3">
          <FaInstagram className="text-xl" />
          <span className="text-sm opacity-90 font-medium">Instagram</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <FaGithub className="text-xl" />
          <span className="text-sm opacity-90 font-medium">Github</span>
        </div>
        <div className="flex items-center gap-2">
          <FaFacebook className="text-xl" />
          <span className="text-sm opacity-90 font-medium">Facebook</span>
        </div>
      </section>
    </div>
  );
};

export default Profile;
