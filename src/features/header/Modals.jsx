import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuData } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getMenuProjects } from "../projects/projectSlice";

const ModalInner = ({ show, children }) => (
  <div
    className={`w-full md:px-8 px-0 mt-4 gap-7.5 p-10 border rounded-2xl absolute border-neutral-300 shadow-sm bg-neutral-100 z-30 transition hidden md:flex duration-800 transform ${
      show ? "translate-y-100 opacity-100" : "-translate-y-[850px] opacity-0"
    }`}
  >
    {children}
  </div>
);

export default function Modals({ modalOptions, setModalOptions }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector((state) => state.projects.categories);
  const {
    loading,
    projects,
    category: selectedCategory,
  } = useSelector((state) => state.projects.menu);
  useEffect(() => {
    if (categories[0]) loadProjects(categories[0].id);
  }, [categories]);
  const loadProjects = (catId) => dispatch(getMenuProjects(catId));
  const projectsList = [projects.slice(0, 3), projects.slice(3, 6)];
  return (
    <div className="container relative !p-0">
      {MenuData.map((menu) =>
        menu.to ? null : (
          <ModalInner
            show={
              modalOptions?.type === "megamenu" &&
              modalOptions?.menu === menu.menu
            }
            key={menu.menu}
          >
            {menu.menu === "campaigns" ? (
              <>
                <div className="w-3/12">
                  <div className="pb-4 mb-4 border-b border-b-neutral-300">
                    <h6 className="heading-6">Our Projects</h6>
                  </div>
                  <ul className="flex flex-col gap-3 text-sm font-bold text-neutral-600">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className={
                          "p-2 text-primary-300" +
                          (category.id === selectedCategory ? " underline" : "")
                        }
                      >
                        <Link to="/" onClick={() => loadProjects(category.id)}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-7.5 w-9/12">
                  {projectsList.map((row, index) => (
                    <div className="flex gap-7.5" key={index}>
                      {row.map((project) => (
                        <div className="w-4/12" key={project.id}>
                          <div className="mb-4 overflow-hidden rounded-lg">
                            <Link
                              to={"/project/" + project.slug}
                              onClick={() => setModalOptions(null)}
                            >
                              <img
                                src={project.coverImage}
                                className="object-cover transition duration-500 hover:scale-110"
                                alt={project.name}
                              />
                            </Link>
                          </div>
                          <Link
                            to={"/project/" + project.slug}
                            onClick={() => setModalOptions(null)}
                          >
                            <h6 className="heading-7 mb-1.5 line-clamp-1">
                              {project.name}
                            </h6>
                          </Link>
                          <p className="text-sm tracking-tight text-neutral-600 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              menu.subMenu.map((item, index) =>
                menu.menu === "aboutus" ? (
                  <div className="w-3/12" key={index}>
                    <Link to={item.to} onClick={() => setModalOptions(null)}>
                      <div className="mb-4 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          className="object-cover transition duration-500 hover:scale-110"
                          alt={item.title}
                        />
                      </div>
                      <h6 className="heading-7 mb-1.5">{item.title}</h6>
                      <p className="text-sm tracking-tight text-neutral-600 line-clamp-3">
                        {item.description}{" "}
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div className="w-4/12" key={index}>
                    <Link to={item.to} onClick={() => setModalOptions(null)}>
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          className="object-cover transition duration-500 hover:scale-110"
                          alt={item.title}
                        />
                      </div>
                      <h6 className="heading-7 mb-1.5">{item.title}</h6>
                      <p className="text-sm tracking-tight text-neutral-600 line-clamp-3">
                        {item.description}{" "}
                      </p>
                    </Link>{" "}
                  </div>
                )
              )
            )}
          </ModalInner>
        )
      )}
    </div>
  );
}
