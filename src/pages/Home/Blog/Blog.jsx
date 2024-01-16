import React, { useState } from 'react';
import propTypes from "prop-types";
import { ArrowRightIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '../../../theme/svg-icons';

export const Blog = (props) => {
    const { blogs } = props;

    return (
        <section className="py-10 bg-primary-100 md:bg-accent-100 sm:py-15" aria-label="Updates">
            <h3 className="!text-[2rem] text-center heading-3 mb-15">News</h3>
            <div className="container">
                <div className="relative flex items-center justify-between">
                    <button type="button" className="absolute top-0 left-0 z-10 flex items-center justify-center h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                        <div className="!p-3 btn btn-primary mb-32">
                            <span className="sr-only">Next</span>
                            <ChevronLeftIcon />
                        </div>
                    </button>

                    <div className="px-6">
                        <div id="default-carousel" className="relative w-full" data-carousel="slide">
                            <div className="relative grid grid-cols-4 gap-5 rounded-lg">


                                {blogs.length > 0 && (
                                    blogs.map((blog) => (
                                        <div className="col-span-4 duration-700 ease-in-out md:col-span-1 sm:col-span-2" key={blog.id} data-carousel-item>
                                            <div className="relative w-full overflow-hidden transition-all ease-in rounded-xl bg-neutral-100 shadow-card">
                                                <div className="absolute left-2.5 top-2.5 z-10  font-Tajawal text-sm font-bold leading-[0.813rem]">
                                                    <ul className="flex flex-wrap gap-2">
                                                        {blog.Tags.length > 0 && (
                                                            blog.Tags.slice(0, 2).map((tag) => (
                                                                <li className={"p-2 pb-1 rounded bg-[" + tag.color + "]"} key={tag.id}>{tag.text}</li>
                                                            ))
                                                        )}
                                                        {/* <li className="p-2 pb-1 text-white bg-red-300 rounded">Emergency</li> */}
                                                        {(blog.Tags.length - 2) > 0 && (
                                                            <li className="p-2 pb-1 text-white rounded bg-primary-600">+{(blog.Tags.length - 2)}</li>
                                                        )}
                                                    </ul>
                                                </div>
                                              <div className="h-[12.5rem] overflow-hidden">
                                                <img src={blog.coverImage} className="object-cover w-full h-full rounded-t-lag" alt={blog.title} />
                                              </div>
                                                <div className="px-5 pt-4.5 pb-5">
                                                    <div className="flex items-center gap-2 mb-3 text-neutral-600">
                                                        <CalendarIcon iconSize={16} /> <span className="text-sm font-medium">{blog.publishedAt}</span>
                                                    </div>
                                                    <h4 className="mb-4 text-heading-7 text-neutral-800 sm:text-heading-6 line-clamp-1">{blog.title}</h4>
                                                    <p className="mb-5 text-sm line-clamp-3 text-neutral-600">{blog.content}</p>
                                                    <a href="#" className="font-bold text-button-lg text-primary-300">Read More</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>
                    </div>

                    <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
                        <div className="btn btn-primary !p-3 mb-32">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon />
                        </div>
                    </button>

                </div>
            </div>
            <button className="mx-auto mt-5 sm:mt-10 btn btn-secondary-text">See All <ArrowRightIcon /> </button>
        </section>
    );
};

Blog.propTypes = {
    blogs: propTypes.object
}

Blog.defaultProps = {
    blogs: {}
}

