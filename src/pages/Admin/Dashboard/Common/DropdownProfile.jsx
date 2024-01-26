import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "../../../../theme/svg-icons";
import { logout } from "../../../../features/authentication/authenticationSlice";
import { logOut } from "../../../Include/logoutApi";
import { SnackMessages } from "../../../../components/Toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function DropdownProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState(false);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    try {
      const response = await logOut();
      if (response.status === 200) {
        localStorage.removeItem("loggedIn");
        sessionStorage.removeItem("loggedIn");
        localStorage.removeItem("checkout");
        showSuccessMessage(response.data);
				setTimeout(() => {
					dispatch(logout());
        	navigate("/admin/login");
				}, 200)
      } else {
        showErrorMessage(response.error);
      }
    } catch (error) {
      showErrorMessage(error.message);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn")) || {};
    const { firstName, lastName } = isLoggedIn;
    const name = `${firstName || ""} ${lastName || ""}`.trim();
    setFullName(name);
  }, []);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full cursor-pointer gap-x-2"
      >
        <img
          src="/images/avatar/avatar.png"
          className="rounded"
          alt="Al-Ihsan Foundation"
        />
        <h6 className="hidden text-neutral-800 text-button-md md:flex">
          {fullName}
        </h6>
        <ChevronDownIcon />
      </div>

      {isOpen && (
        <ul className="absolute right-0 px-6 py-4 bg-white border rounded-lg w-36 border-neutral-300 top-9">
          <li className="py-2 text-neutral-800 text-button-md hover:text-primary-300">
            <Link to="/admin/profile" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          </li>
          <li className="py-2 text-neutral-800 text-button-md hover:text-primary-300  cursor-pointer">
            <span onClick={logoutUser} >
              Logout
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownProfile;
