import React, { useState } from "react";
import DropdownProfile from "./Common/DropdownProfile";
import { CloseIcon, MenuIcon } from "../../../theme/svg-icons";
import { Link } from "react-router-dom";
import { adminNavigationItems } from "../../../utils/constants";
import { useLocation } from "react-router-dom";

export const AdminHeaderComponent = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div>
      <header className="py-3 px-3 md:px-7.5 border-b bg-neutral-200 border-neutral-300 fixed w-screen">
        <div className="container-fluid flex items-center justify-between !p-0">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer sm:!hidden">
              <MenuIcon
                className={"btn btn-primary"}
                label={"click"}
                onClick={() => setMenu(!menu)}
              />
            </div>
            <Link to="/">
              <img
                src="/images/assets/logo.svg"
                className=""
                alt="Al-Ihsan Foundation"
              />
            </Link>
          </div>
          <DropdownProfile />
        </div>
      </header>
      {menu && <MobSidebarmenu setMenu={setMenu} />}
    </div>
  );
};

export const MobSidebarmenu = ({ setMenu }) => {
  const location = useLocation();
  const [submenuStates, setSubmenuStates] = useState(
    adminNavigationItems.map(() => false)
  );
  const handleSubmenuToggle = (index) => {
    const newSubmenuStates = [...submenuStates];
    newSubmenuStates[index] = !newSubmenuStates[index];
    setSubmenuStates(newSubmenuStates);
  };

  return (
    <>
      <aside className="relative z-10 sm:!hidden" aria-label="Sidebar">
        <div className="fixed inset-0 transition-opacity bg-opacity-30 bg-neutral-1000">
          <div className="fixed top-0 right-0 z-40 w-full h-screen transition-transform">
            <div className="fixed left-0 z-50 min-w-[18rem] flex flex-col justify-start h-full p-4 sm:p-5 bg-neutral-100">
              <div class="flex items-center justify-between mb-4">
                <Link to="/">
                  <img
                    src="/images/assets/logo.svg"
                    className="w-auto h-10"
                    alt="Alihsan Foundation"
                  />
                </Link>
                <div>
                  <CloseIcon onClick={() => setMenu(false)} />
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {adminNavigationItems.map((item, index) => (
                  <li key={index}>
                    {item.submenu ? (
                      <div>
                        <span
                          className={`flex px-2 py-2 rounded-lg cursor-pointer whitespace-nowrap text-neutral-600 hover:text-primary-300 md:py-3 md:px-5 text-button-md gap-x-2 hover:bg-accent-300 ${
                            location.pathname === item.to ? "btn-primary" : ""
                          }`}
                          onClick={() => {
                            handleSubmenuToggle(index);
                          }}
                        >
                          {item.icon}
                          {item.label}
                        </span>
                        {submenuStates[index] && (
                          <ul className="submenu">
                            {item.submenu.map((submenuItem, submenuIndex) => (
                              <li key={submenuIndex} className="my-1">
                                <Link
                                  to={submenuItem.to}
                                  onClick={() => setMenu(false)}
                                  className={`flex px-2 !pl-8 sm:!pl-12 py-2 rounded-lg cursor-pointer text-neutral-600 hover:text-primary-300 md:py-3 md:px-5 text-button-md gap-x-2 hover:bg-accent-300 ${
                                    location.pathname === submenuItem.to
                                      ? "btn-primary"
                                      : ""
                                  }`}
                                >
                                  {submenuItem.icon}
                                  {submenuItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setMenu(false)}
                        className={`flex px-2 py-2 rounded-lg whitespace-nowrap cursor-pointer text-neutral-600 hover:text-primary-300 md:py-3 md:px-5 text-button-md gap-x-2 hover:bg-accent-300 ${
                          location.pathname === item.to ? "btn-primary" : ""
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
