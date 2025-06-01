import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { MdLogout } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import MiniCart from "../MiniCart/MiniCart";


import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allMenu, setAllMenu] = useState([]);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [dropShow, setDropShow] = useState(false);
  const { user } = useUser();
  const { setUser } = useUser();
  const dropRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const [showMiniCart, setShowMiniCart] = useState(false);
  const isMobile = window.innerWidth <= 430;


  useEffect(() => {
    fetch("http://localhost:8000/api/store/categories/")
      .then((res) => res.json())
      .then((data) => {
        setAllMenu(data);
      });
  }, []);

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8000/api/store/products/?search=${query}`
      );
      const data = await res.json();
      setSearchResults(data.results);
      setShowDropdown(true);
    } catch (err) {
      console.error("خطا در سرچ:", err);
    }
  };
  useEffect(() => {
  }, [searchResults]);

  // استفاده از debounce برای کنترل درخواست‌ها
  const debouncedSearch = useCallback(debounce(fetchSearchResults, 400), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handlerLogOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        // هدایت کاربر به صفحه لاگین یا صفحه اصلی
        setUser(null);
        navigate("/login");
      } else {
        console.error("خطا در لاگ‌اوت");
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDropShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const miniCartTimeout = useRef(null);

  const handleMiniCartEnter = () => {
    clearTimeout(miniCartTimeout.current);
    setShowMiniCart(true);
  };

  const handleMiniCartLeave = () => {
    miniCartTimeout.current = setTimeout(() => {
      setShowMiniCart(false);
    }, 300); // ۳۰۰ میلی‌ثانیه تأخیر
  };

  useEffect(() => {
    return () => {
      clearTimeout(miniCartTimeout.current);
    };
  }, []);

  const { data: cartData, isLoading } = useCart();

  const cartCount = cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  

  return (
    <>
      <div className="all">
        <IoMdMenu className="icon-menu" onClick={toggleMenu} />
        <div className="logo">Logo</div>
        <div className={`menus ${!isOpenMenu ? "open" : ""}`}>
          {!isOpenMenu ? (
            <IoMdClose className="close-icon" onClick={toggleMenu} />
          ) : (
            ""
          )}
          <ul className={`menu ${!isOpenMenu ? "open-menu" : ""}`}>
            <li className="menu-items ">
              <Link to="/" className="item-links">
                صفحه اصلی
              </Link>
            </li>
            <li className="menu-items category-menu">
              <Link to="/category" className="item-links ">
                دسته بندی ها
              </Link>
              <ul className="sub-menu">
                {allMenu.map((item) => (
                  <li className="sub-menu-item" key={item.id}>
                    <Link to={`/category/${item.id}`} className="item-links-1">
                      {item.name}
                      {!isMobile && item.children.length > 0 && <FaArrowLeft />}
                    </Link>

                    {Array.isArray(item.children) &&
                      item.children.length > 0 && (
                        <ul className="sub-menu-item-2">
                          {item.children.map((child) => (
                            <li className="sub-menu-item-2-item" key={child.id}>
                              <Link
                                to={`/category/${child.id}`}
                                className="item-links-2"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </li>
            <li className="menu-items">
              <Link to="/contact" className="item-links">
                ارتباط با ما
              </Link>
            </li>
          </ul>
        </div>
        <div className="input-search" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="جست‌وجو..."
            className="search"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          />
          <IoMdSearch className="icon-search" />

          {showDropdown && searchResults.length > 0 && (
            <ul className="live-search-results">
              {searchResults.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    setShowDropdown(false);
                    setSearchQuery(""); // یا بذار بمونه
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="left-navbar">
          <div className="container-basket-icon">
            <SlBasket
              className="icon-basket"
              onMouseEnter={!isMobile ? handleMiniCartEnter : undefined}
              onMouseLeave={!isMobile ? handleMiniCartLeave : undefined}
              onClick={
                isMobile ? () => setShowMiniCart((prev) => !prev) : undefined
              }
              style={{ position: "relative" }} // مهم برای نمایش MiniCart کنار آیکون
            />
            {cartData?.items?.length > 0 && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
            {showMiniCart && (
              <div
                className="mini-cart-dropdown"
                onMouseEnter={!isMobile ? handleMiniCartEnter : undefined}
                onMouseLeave={!isMobile ? handleMiniCartLeave : undefined}
              >
                <MiniCart cartItems={cartData?.items || []} />
              </div>
            )}
            <button
              className="login"
              onClick={() => setDropShow((prev) => !prev)}
            >
              {user ? (
                <>
                  <Link to="#" className="login-link">
                    {user.username}
                  </Link>
                </>
              ) : (
                <Link to="/verify-user" className="login-link">
                  ورود / ثبت نام
                </Link>
              )}
            </button>
          </div>
          {user && dropShow ? (
            <div className="notification-user" ref={dropRef}>
              <Link to="/user-panel/dashboard" className="enter-panel">
                ورود به پنل
              </Link>
              <div className="form-logout">
                <Link to="/" className="logout-panel" onClick={handlerLogOut}>
                  خروج از حساب
                </Link>
                <MdLogout className="icon-logout" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
