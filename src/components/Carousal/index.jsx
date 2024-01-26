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
