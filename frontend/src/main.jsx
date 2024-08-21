import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Pages
import Home from "./Pages/Home.jsx";
import Layout from "./Layout.jsx";
import EditPost from "./Pages/EditPost.jsx";
import Profile from "./Pages/Profile.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import MyBlogs from "./Pages/MyBlogs.jsx";
import PostDetails from "./Pages/PostDetails.jsx";
import Search from "./Pages/Search.jsx";
import UserContextProvider from "./Context/userContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about/:userId" element={<Profile />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="create-post" element={<CreatePost />} />
      <Route path="myblogs/:userID" element={<MyBlogs />} />
      <Route path="edit-post/:postId" element={<EditPost />} />
      <Route path="Post/post/:postId" element={<PostDetails />} />
      <Route path="search/:searchPrompt" element={<Search />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
