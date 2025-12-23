import React from 'react'
import { slide as Menu } from "react-burger-menu";
import { FaHome , FaUser, FaBookmark, FaTruck} from 'react-icons/fa';
const Sidebar = () => {
  return (
    <Menu>
    <a id="home" className="menu-item" href="/"><FaHome />Dashboard</a>
    <a id="about" className="menu-item" href="/about"><FaUser />Your Profile</a>
    <a id="contact" className="menu-item" href="/contact"><FaBookmark />Orders</a>
    <a id="settings" className="menu-item" href="/settings"><FaTruck />Your Cart</a>
</Menu>
  )
}

export default Sidebar



