import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import profile_img from "../../assets/disney-avatar.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../../../redux/user/userSlice";
import axios from "axios";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [works, setWorks] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState(works);
  const { currentUser } = useSelector((state) => state.user);

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (lastScrollY < window.scrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchBar(false); // Close search bar when clicked outside
    }
  };

  useEffect(() => {
    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBar]);

  useEffect(() => {
    const getWorks = async () => {
      try {
        const res = await axios.get("/api/v1/post/getPosts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.data || [];
        setWorks(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getWorks();
  }, []);

  useEffect(() => {
    const searchedArray = works.filter((work) =>
      work.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEntries(searchedArray);
  }, [search, works]);

  const handleSignout = async () => {
    const res = await fetch("/api/v1/auth/signout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      dispatch(signoutSuccess());
      localStorage.removeItem("currentUserInLocalStorageForArtista");
      navigate("/");
    }
  };

  return (
    <div className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <div className="navbar-left">
        <Link to={"/home"}>
          <h3 className="login-logo">Artista</h3>
        </Link>
        {currentUser && (
          <>
            <ul className="off-on-lg">
              <Link to={"/home/add_creation"}>
                <li>Add Your Creation</li>
              </Link>
              <Link to={"/home"}>
                <li>Shop</li>
              </Link>
            </ul>
            <ul className="ms-0 ps-0">
              <div className="navbar-profile navbar-menu">
                <li className="three-dots">
                  <BsThreeDotsVertical />
                </li>
                <div className="dropdown-menu">
                  <Link to={"/home/add_creation"}>
                    <li>Add Your Creation</li>
                  </Link>
                  <Link to={"/home"}>
                    <li>Shop</li>
                  </Link>
                </div>
              </div>
            </ul>
          </>
        )}
      </div>
      <div className="navbar-right">
        {currentUser && (
          <>
            <div>
              {showSearchBar ? (
                <div className="search-bar-div" ref={searchRef}>
                  {" "}
                  {/* Attach ref to the search bar */}
                  <input
                    className="me-3"
                    type="search"
                    placeholder={`Search for artistic works...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="serach-result-dropdown shadow-lg mx-auto px-0">
                    <div className="conatiner-fluid pb-5">
                      <div className="row px-3">
                        {filteredEntries.map((work) => (
                          <div className="col-md-2 mb-2">
                            <Card work={work} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setShowSearchBar(true)} // Open search bar on click
                  className="search-bar-div fs-3 me-3"
                >
                  <CiSearch />
                </div>
              )}
            </div>
           

            <div className="navbar-profile">
              <img src={profile_img} alt="" className="profile shadow" />
              <div className="dropdown">
                <Link to={""}>
                  <p>Welcome {currentUser && currentUser.username}</p>
                </Link>
                <Link to={"/home"}>
                  <p>My Bag</p>
                </Link>
                {currentUser ?<p onClick={handleSignout} className="sign-out">
                  Sign Out
                </p> : "Sign In" }
                
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
