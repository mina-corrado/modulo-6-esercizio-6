import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import Login from "./views/login/Login";
import Registration from "./views/login/Registration"; 
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  const userIsLogged = token ? true : false;
  return (
    <Router>
      <NavBar userIsLogged={userIsLogged}/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
