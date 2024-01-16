import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon } from "../../theme/svg-icons";
import { NewsListItem } from "../../features/news/NewsListItem";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
};

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                infinite: true,
            },
        },
    ],
};

export const Carousal = ({ data }) => {

    const navigate = useNavigate();
    return (
        <section
            className="py-10 bg-primary-100 md:bg-accent-100 sm:py-15"
            aria-label="Updates"
        >
            <h3 className="!text-[2rem] text-center heading-3 mb-15">News</h3>

            <div className="container">
                <div className="relative grid grid-cols-1 gap-5 rounded-lg">
                    <Slider {...settings}>
                        {data.length > 0 &&
                            data.map((blog) => (
                                <NewsListItem key={blog.id} item={blog}  />
                                // <div
                                //     className="col-span-4 duration-700 ease-in-out md:col-span-1 sm:col-span-2"
                                //     key={blog.id}
                                //     data-carousel-item
                                // >
                                //     <div className="relative w-full overflow-hidden transition-all ease-in rounded-xl bg-neutral-100">
                                //         <div className="absolute left-2.5 top-2.5 z-10  font-Tajawal text-sm font-bold leading-[0.813rem]">
                                //             <ul className="flex flex-wrap gap-2 mb-2 text-sm font-bold leading-3">
                                //                 {blog.Tags.length > 0 &&
                                //                     blog.Tags.slice(0, 2).map((tag) => (
                                //                         <li
                                //                             className={
                                //                                 "p-2 pb-1 rounded bg-[" + tag.color + "]"
                                //                             }
                                //                             key={tag.id}
                                //                         >
                                //                             {tag.text}
                                //                         </li>
                                //                     ))}
                                //                 {/* <li className="p-2 pb-1 text-white bg-red-300 rounded">Emergency</li> */}
                                //                 {blog.Tags.length - 2 > 0 && (
                                //                     <li className="p-2 pb-1 text-white rounded bg-primary-600">
                                //                         +{blog.Tags.length - 2}
                                //                     </li>
                                //                 )}
                                //             </ul>
                                //         </div>
                                //         <div className="h-[12.5rem] overflow-hidden">
                                //             <img
                                //                 src={blog.coverImage}
                                //                 className="object-cover w-full h-full rounded-t-lag"
                                //                 alt={blog.title}
                                //             />
                                //         </div>
                                //         <div className="px-5 pt-4.5 pb-5">
                                //             <div className="flex items-center gap-2 mb-3 text-neutral-600">
                                //                 <CalendarIcon iconSize={16} />{" "}
                                //                 <span className="text-sm font-medium">
                                //                     {blog.publishedAt}
                                //                 </span>
                                //             </div>
                                //             <h4 className="mb-4 text-heading-7 text-neutral-800 sm:text-heading-6 line-clamp-1">
                                //                 {blog.title}
                                //             </h4>
                                //             <p className="mb-5 text-sm line-clamp-3 text-neutral-600">
                                //                 {blog.content}
                                //             </p>
                                //             <Link
                                //                 to="/news/details"
                                //                 className="font-bold text-button-lg text-primary-300"
                                //             >
                                //                 Read More
                                //             </Link>
                                //         </div>
                                //     </div>
                                // </div>
                            ))}
                    </Slider>
                </div>
            </div>
            <button
                onClick={() => navigate("/news")}
                className="mx-auto mt-5 sm:mt-10 btn btn-secondary-text"
            >
                See All <ArrowRightIcon />{" "}
            </button>
        </section>
    );
};

Carousal.propTypes = {
    data: propTypes.array,
};

Carousal.defaultProps = {
    data: []
};
