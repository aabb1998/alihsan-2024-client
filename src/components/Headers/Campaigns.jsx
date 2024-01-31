import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getMenuProjects,
} from "../../features/projects/projectSlice";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";

export const Campaigns = ({ handleClick }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.projects.categories);
  const { projects, category: selectedCategory } = useSelector(
    (state) => state.projects.menu
  );
  const [loading, setLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const projectsList = [projects.slice(0, 3), projects.slice(3, 6)];

  const loadProjects = async (catId) => {
    await dispatch(getMenuProjects(catId)); setLoading(true);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (categories[0]) loadProjects(categories[0].id);
  }, [categories]);

  return (
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
                "p-2 text-neutral-600 font-bold text-sm no-underline hover:text-primary-300" +
                (category.id === selectedCategory ? " text-primary-300 " : "")
              }
            >
              <Link to="/" onMouseOver={() => {
                setLoading(false)
                loadProjects(category.id)
              }}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Transition
        as={Fragment}
        appear={true}
        show={loading}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'
      >
        <div className="flex flex-col gap-7.5 w-9/12">

          {projectsList.map((row, index) => (

            <div className="flex gap-7.5" key={index} >
              {row.map((project) => (
                <div className="w-4/12" key={project.slug} onClick={handleClick}>
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Link to={"/project/" + project.slug} className="block max-w-[18.5rem] h-[8.5rem] overflow-hidden rounded-2xl">
                      <img
                        src={project.coverImage}
                        className="object-cover w-full h-full transition duration-500 hover:scale-110"
                        alt={project.name}
                      />
                    </Link>
                  </div>
                  <Link to={"/project/" + project.slug}>
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

        </div >
      </Transition>
    </>
  );
};
