import React from "react";
import "./Nav.css"
import { useAuth } from "./AuthContext";


function Nav() {

  const { logout } = useAuth();
  

  const handleLogout = () => {
        logout(); // Update authentication state
        
    };
    return (
        

<div> 
  <aside class="sidebar">
    <div class="sidebar-header">
      <img src="./shoplc+logo-removebg-preview.png" alt="logo" />
      {/* <h2>CodingLab</h2> */}
    </div>
    <ul class="sidebar-links">
      <h4>
        <span>Main Menu</span>
        <div class="menu-separator"></div>
      </h4>
      <li>
        <a href="affiliates">
          <span class="material-symbols-outlined"> groups </span>Affiliates</a>
      </li>
      <li>
        <a href="rabbitears"><span class="material-symbols-outlined"> dashboard </span>Rabbit Ears</a>
      </li>
      <li>
        <a href="https://www.channelmaster.com/pages/tv-antenna-map-austin-tx-78728#address=100%20Michael%20Angelo%20Way"><span class="material-symbols-outlined"> dashboard </span>Channel Master</a>
      </li>
      <h4>
        <span>General</span>
        <div class="menu-separator"></div>
      </h4>
      <li>
        <a href="docs"><span class="material-symbols-outlined"> folder </span>Documentation</a>
      </li>
      {/* <li>
        <a href="/affiliates"><span class="material-symbols-outlined"> groups </span>Affiliates</a>
      </li> */}
      <li>
        <a href="form"><span class="material-symbols-outlined"> move_up </span>Form</a>
      </li>
      <li>
        <a href="email-test"><span class="material-symbols-outlined"> flag </span>email</a>
      </li>
      {/* <li>
        <a href="signin"><span class="material-symbols-outlined">
            notifications_active </span>sign in</a>
      </li> */}
      <h4>
        <span>Account</span>
        <div class="menu-separator"></div>
      </h4>
      {/* <li>
        <a href="#"><span class="material-symbols-outlined"> account_circle </span>Profile</a>
      </li>
      <li>
        <a href="#"><span class="material-symbols-outlined"> settings </span>Settings</a>
      </li> */}
      <li>
        <a href="signin" onClick={handleLogout}><span class="material-symbols-outlined"> logout </span>Logout</a>
      </li>
    </ul>
    {/* <div class="user-account">
      <div class="user-profile">
        <img src="images/profile-img.jpg" alt="Profile Image" />
        <div class="user-detail">
          <h3>Eva Murphy</h3>
          <span>Web Developer</span>
        </div>
      </div>
    </div> */}
  </aside>
  </div>
        // <div className="nav-div">
        //     <nav className="nav">
        //         {/* <ul className="sidebar">
        //                 <li className="ShopLC"><a href="#">ShopLC</a></li>
        //                 <li className="blog"><a href="#">blog</a></li>
        //                 <li className="Products"><a href="#">Products</a></li>
        //                 <li className="About"><a href="#">About</a></li>
        //                 <li className="Forum"><a href="#">Forum</a></li>
        //                 <li className="Login"><a href="#">Login</a></li>
        //             </ul> */}
        //         <ul className="nav-items">
        //             <li className="ShopLC logo"><a href="index.html"><img src="./shoplc+logo-removebg-preview.png" alt="logo"/></a></li>
        //             <li className="blog li a"><a href="index.html">blog</a></li>
        //             <li className="Products li a"><a href="index.html">Products</a></li>
        //             <li className="About li a"><a href="index.html">About</a></li>
        //             <li className="Forum li a"><a href="index.html">Forum</a></li>
        //             <li className="Login li a"><a href="index.html">Login</a></li>
        //         </ul>
        //     </nav>
        // </div>
    );
};

export default Nav;