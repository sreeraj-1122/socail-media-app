import React, { useRef, useState, useEffect } from "react";
import Profile from "../../components/profile/Profile";
import Friends from "../../components/friends/Friends";
import CreatePost from "../../components/Create post/CreatePost";
import Post from "../../components/post/Post";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";
import { toast } from "react-toastify";
import { useStore } from "../../context/StoreContextProvider";

const Home = () => {
  const fileInputRef = useRef(null);
  const { profileId } = useStore();
  const [activePostId, setActivePostId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    file: null,
  });
  const [posts, setPosts] = useState([]); // Array to store posts
  const [newComment, setNewComment] = useState('');
  const [fileType, setFileType] = useState("");
  const [comments, setComments] = useState([]);
  const [id, setId] = useState(null);

  const handleSpanClick = (type) => {
    setFileType(type);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("description", formData.description);
    if (formData.file) {
      data.append("filePath", formData.file);
    }

    try {
      const response = await axios.post(`${baseUrl}/post/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(response.data.message);
      setFormData({
        description: "",
        file: null,
      });
      fetchPosts(); // Refresh posts after submission
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    }
  };

  // Handle comment addition for a specific post
  const handleAddComment = async (postId, from) => {
    const comment = newComment?.trim();

    if (!comment) {
      console.error("Comment cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/post/comment/${postId}`,
        { comment, from },
        {
          headers: {
            "Content-Type": "application/json", // Updated content type
          },
          withCredentials: true,
        }
      );
      setNewComment("")
      fetchComments();
    } catch (error) {
      console.error("Error comment post:", error);
    }
  };

  // Fetch Comments from the server
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/post/comments/${activePostId}`,
        { withCredentials: true }
      );
      setComments(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching post data:", error.message || error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [activePostId]);
  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      let response;

      // Check if an id is provided for fetching specific user posts
      if (id) {
        response = await axios.post(
          `${baseUrl}/post/userpost`,
          { id },
          { withCredentials: true }
        );
      } else {
        // Fetch all posts if no specific id is provided
        response = await axios.get(`${baseUrl}/post/`, {
          withCredentials: true,
        });
      }

      // Check if the response contains an array of posts
      if (response?.data?.data && Array.isArray(response.data.data)) {
        setPosts(response.data.data); // Update posts state
      } else {
        console.error("Expected an array of posts, but got:", response.data);
      }
    } catch (error) {
      // Log any error that occurs during the API call
      console.error("Error fetching post data:", error.message || error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts
  }, [profileId, id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen lg:px-2 p-0">
      <aside className="rounded-lg hidden lg:block">
        <Profile id={id} setId={setId} />
        <Friends heading="Friends" />
      </aside>
      <main className="overflow-scroll custom-scrollbar rounded-lg shadow-custom-dark dark:bg-black">
        <CreatePost
          handleSpanClick={handleSpanClick}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          fileInputRef={fileInputRef}
          fileType={fileType}
          handleFileChange={handleFileChange}
        />
        {/* Pass the posts and the comments for each post */}
        <Post
          posts={posts}
          handleAddComment={handleAddComment}
          newComment={newComment}
          setNewComment={setNewComment}
          comments={comments}
          id={id}
          setId={setId}
          activePostId={activePostId}
          setActivePostId={setActivePostId}
        />
      </main>
      <aside className="hidden lg:block">
        <Friends heading="Friend Request" />
        <Friends heading="Friend Suggestion" />
      </aside>
    </div>
  );
};

export default Home;
