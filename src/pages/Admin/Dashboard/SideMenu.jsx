import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminNavigationItems } from "../../../utils/constants";

export const Sidemenus = () => {
  const location = useLocation();
  // const [submenuStates, setSubmenuStates] = useState(
  //   adminNavigationItems.map(() => false)
  // );
  const [submenuStates, setSubmenuStates] = useState(() => {
    // Initialize submenu states from sessionStorage or default to false
    const storedStates = sessionStorage.getItem("submenuStates");
    return storedStates
      ? JSON.parse(storedStates)
      : adminNavigationItems.map(() => false);
  });

  const handleSubmenuToggle = (index) => {
    const newSubmenuStates = [...submenuStates];
    newSubmenuStates[index] = !newSubmenuStates[index];
    setSubmenuStates(newSubmenuStates);
  };
  useEffect(() => {
    // Save submenu states to sessionStorage whenever it changes
    sessionStorage.setItem("submenuStates", JSON.stringify(submenuStates));
  }, [submenuStates]);
  return (
    <div className="flex h-[calc(100vh-4.5rem)]">
      <aside className="relative justify-start hidden overflow-y-auto h-full py-7.5 min-w-[16.875rem] px-5 duration-300 border-r sm:flex border-neutral-300 overflow-x-hidden">
        <ul className="flex flex-col gap-3 grow">
          {adminNavigationItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <span
                    className={`flex px-2 py-2 rounded-lg cursor-pointer whitespace-nowrap text-neutral-600 hover:text-primary-300 md:py-3 md:px-5 text-button-md gap-x-2 hover:bg-accent-300 ${
                      location.pathname === item.to ? "btn-primary" : ""
                    }`}
                    onClick={() => handleSubmenuToggle(index)}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                  {submenuStates[index] && (
                    <ul className="submenu">
                      {item.submenu.map((submenuItem, submenuIndex) => (
                        <li key={submenuIndex}>
                          <Link
                            to={submenuItem.to}
                            className={`flex px-2 !pl-8 sm:!pl-12 py-2 rounded-lg cursor-pointer text-neutral-600 hover:text-primary-300 md:py-3 md:px-5 text-button-md gap-x-2 hover:bg-accent-300 ${
                              submenuItem?.urls.some((item) =>
                                location.pathname?.includes(item)
                              )
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
                  className={`flex px-2 py-2 rounded-lg whitespace-nowrap cursor-pointer text-neutral-600 hover:text-primary-300 md:py-3 md:px-5 text-button-md gap-x-2 hover:bg-accent-300 ${
                    item?.urls?.some((url) => location.pathname?.includes(url))
                      ? "btn-primary"
                      : ""
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};
export default Sidemenus;
