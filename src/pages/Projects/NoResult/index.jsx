import React, { useState } from 'react'
import Button from '../../../components/Button';
import { ChevronDownIcon, CloseIcon, FilterIcon, GlobeIcon, MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon } from '../../../theme/svg-icons'
import { Footer } from '../../Include/footer';
import { Pagination } from '../../Include/pagination';

export const NoProjectsComponent = () => {
    const [megamenu, setMegamenu] = useState('');
    return (

        <div>
            <aside id="default-sidebar" className="fixed hidden top-0 left-0 z-40 min-w-[16.875rem] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-5 py-7.5 overflow-y-auto bg-neutral-100">
                    <div className="flex items-center justify-between mb-4">
                        <a href="/">
                        <img src="/images/assets/logo.svg" className="w-auto h-6" alt="Al-Ihsan Foundation" />
                        </a>
                        <CloseIcon iconSize={24} />
                    </div>
                    <div className="hidden my-4 form-group">
                        <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
                            <SearchIcon />
                        </span>
                        <input className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9" placeholder="Search" type="text" name="search" />
                        </label>
                    </div>
                    <ul className="flex flex-col gap-7.5 font-medium">
                        <li className="p-1">
                            <a href="#" className="flex items-center font-bold group">
                            <span className="">Home</span>
                            </a>
                        </li>
                        <li className="p-1">
                            <a href="#" className="flex items-center justify-between font-bold group">
                            <span className="flex-1 whitespace-nowrap">About Us</span>
                            <span className="rotate-180">
                                <ChevronDownIcon />
                            </span>
                            </a>
                            <ul className="flex flex-col gap-3 mt-3">
                            <li className="p-2">
                                <a href="">Who We Are</a>
                            </li>
                            <li className="p-2">
                                <a href="">Financial Reports</a>
                            </li>
                            </ul>
                        </li>
                        <li className="p-1">
                            <a href="#" className="flex items-center justify-between font-bold group">
                            <span className="flex-1 whitespace-nowrap">Our Projects</span>
                            <ChevronDownIcon />
                            </a>
                        </li>
                        <li className="p-1">
                            <a href="#" className="flex items-center justify-between font-bold group">
                            <span className="flex-1 whitespace-nowrap">Get Involved</span>
                            <ChevronDownIcon />
                            </a>
                        </li>
                        <li className="p-1">
                            <a href="#" className="flex items-center font-bold group">
                            <span className="flex-1 whitespace-nowrap">Contact</span>
                            </a>
                        </li>
                    </ul>
                    <div className="flex items-center justify-between gap-1 my-7.5 text-neutral-800">
                        <div className="flex items-center gap-1">
                            <div className="px-1.5 py-0.5 bg-neutral-200 rounded-sm">
                            <GlobeIcon iconSize={20} />
                            </div>
                            Global
                        </div>
                        <ChevronDownIcon />
                    </div>
                    <Button variant="primaryFull" label="Donate now" />
                </div>
            </aside>
            {/* Header */}
            <header>
                <div className="border-b border-b-neutral-300">
                    <div className="container justify-between hidden !py-2 md:flex">
                        {/* Global */}
                        <div className="flex items-center gap-1 text-neutral-800">
                        <div className="px-1.5 py-0.5 bg-neutral-200 rounded-sm">
                            <GlobeIcon iconSize={20} />
                        </div>
                        Global
                        <ChevronDownIcon iconSize={16} />
                        </div>
                        <div className="flex gap-7.5">
                        <div className="form-group">
                            <label className="relative block w-113">
                            <span className="sr-only">Search</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
                                <SearchIcon />
                            </span>
                            <input className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9" placeholder="Search" type="text" name="search" />
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <UserIcon iconSize={20} />
                            <span className="text-sm text-neutral-800">Account</span>
                            <ChevronDownIcon iconSize={16} />
                        </div>
                        <div className="flex items-center gap-2">
                            <ShoppingCartIcon iconSize={20} />
                            <span className="text-sm text-neutral-800">Basket</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-200">
                    <div className="container flex items-center justify-between !py-6 md:!py-3">
                        <div className="flex items-center gap-4">
                        <div className="flex items-center md:hidden">
                            <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="">
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon iconSize={24} />
                            </button>
                        </div>
                        <div>
                            <a href="/">
                            <img src="/images/assets/logo.svg" className="w-auto h-6 md:h-11" alt="Al-Ihsan Foundation" />
                            </a>
                        </div>
                        </div>
                        <div className="flex items-center md:gap-3 lg:gap-10 ">
                        <nav className="hidden text-sm font-bold md:block">
                            <ul className="flex gap-5 lg:gap-10">
                            <li>
                                <a href="#" className="tracking-tighter">Home</a>
                            </li>
                            <li className="flex items-center gap-1 lg:gap-1.5 tracking-tighter">
                                <a href="#" onClick={(e) => { e.preventDefault(); setMegamenu('aboutus'); }} >About Us</a>
                                <ChevronDownIcon iconSize={16} />
                            </li>
                            <li>
                                <a href="#">Impact Stories</a>
                            </li>
                            <li className="flex items-center gap-1 lg:gap-1.5 tracking-tighter">
                                <a href="#" onClick={(e) => { e.preventDefault(); setMegamenu('campaigns'); }}>Our Projects</a>
                                <ChevronDownIcon iconSize={16} />
                            </li>
                            <li className="flex items-center gap-1 lg:gap-1.5 tracking-tighter">
                                <a href="#" onClick={(e) => { e.preventDefault(); setMegamenu('getinvolved'); }}>Get Involved</a>
                                <ChevronDownIcon iconSize={16} />
                            </li>
                            <li className="flex items-center gap-1 lg:gap-1.5 tracking-tighter">
                            <a href="#" onClick={(e) => { e.preventDefault(); setMegamenu('contact'); }}>Contact</a>
                                <ChevronDownIcon iconSize={16} />
                            </li>
                            </ul>
                        </nav>
                        <div>
                            <div className="flex justify-between gap-5 md:hidden">
                            <ShoppingCartIcon />
                            <UserIcon />
                            </div>
                            <div className="hidden md:block">
                            <Button label="Donate now" className={'text-sm'} />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Navbar */}
            {/* Get Involved */}
            <div className="container relative !p-0">
                <div className={`w-full md:px-8 px-0 mt-4 gap-7.5 p-10 border rounded-2xl absolute border-neutral-300 shadow-sm bg-neutral-100 z-10 transition-transform hidden md:flex duration-800 transform ${megamenu === 'campaigns' ? 'translate-y-100' : '-translate-y-[850px]'}`}>
                    <div className="w-3/12">
                        <div className="pb-4 mb-4 border-b border-b-neutral-300">
                        <h6 className="heading-6">Our Projects</h6>
                        </div>
                        <ul className="flex flex-col gap-3 text-sm font-bold text-neutral-600">
                        <li className="p-2 text-primary-300"><a href="#">Aqeeqah & General Sacrifice</a></li>
                        <li className="p-2"><a href="#">Health & Medical</a></li>
                        <li className="p-2"><a href="#">Local</a></li>
                        <li className="p-2"><a href="#">Water</a></li>
                        <li className="p-2"><a href="#">Zakat</a></li>
                        <li className="p-2"><a href="#">Education</a></li>
                        <li className="p-2"><a href="#">Poor & Needy</a></li>
                        <li className="p-2"><a href="#">Orphanage</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-7.5 w-9/12">
                    <div className="flex gap-7.5">
                        <div className="w-4/12">
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <a href="#"><img src="/images/banner/nav/project-1.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Project name 1" /></a>
                        </div>
                        <a href="#"><h6 className="heading-7 mb-1.5 line-clamp-1">Project name goes here</h6></a>
                        <p className="text-xs text-neutral-600 line-clamp-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                        <div className="w-4/12">
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <a href="#"><img src="/images/banner/nav/project-2.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Project name 2" /></a>
                        </div>
                        <a href="#"><h6 className="heading-7 mb-1.5 line-clamp-1">Project name goes here</h6></a>
                        <p className="text-xs text-neutral-600 line-clamp-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                        <div className="w-4/12">
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <a href="#"><img src="/images/banner/nav/project-3.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Project name 3" /></a>
                        </div>
                        <a href="#"><h6 className="heading-7 mb-1.5  line-clamp-1">Project name goes here</h6></a>
                        <p className="text-xs text-neutral-600 line-clamp-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                    </div>
                    <div className="flex gap-7.5">
                        <div className="w-4/12">
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <a href="#"><img src="/images/banner/nav/project-4.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Project name 4" /></a>
                        </div>
                        <a href="#"><h6 className="heading-7 mb-1.5 line-clamp-1">Project name goes here</h6></a>
                        <p className="text-xs text-neutral-600 line-clamp-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                        <div className="w-4/12">
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <a href="#"><img src="/images/banner/nav/project-5.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Project name 5" /></a>
                        </div>
                        <a href="#"><h6 className="heading-7 mb-1.5 line-clamp-1">Project name goes here</h6></a>
                        <p className="text-xs text-neutral-600 line-clamp-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        </div>
                        <div className="w-4/12">
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <a href="#"><img src="/images/banner/nav/project-6.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Project name 6" /></a>
                        </div>
                        <a href="#"><h6 className="heading-7 mb-1.5 line-clamp-1">Al-Ihsan Project name goes here</h6></a>
                        <p className="text-xs text-neutral-600 line-clamp-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className={`w-full mt-4 gap-7.5 p-10 border rounded-2xl absolute border-neutral-300 shadow-sm bg-neutral-100 z-20 transition-transform hidden md:flex duration-1000 transform ${megamenu === 'aboutus' ? 'translate-y-100' : '-translate-y-[650px]'}`}>
                    <div className="w-3/12">
                    <div className="mb-4 overflow-hidden rounded-md">
                        <img src="/images/banner/nav/about-1.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Who We are - Al-Ihsan Foundation" />
                    </div>
                    <h6 className="heading-7 mb-1.5">Who We are</h6>
                    <p className="text-sm tracking-tight text-neutral-600 line-clamp-4">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.”  </p>
                    </div>
                    <div className="w-3/12">
                    <div className="mb-4 overflow-hidden rounded-md">
                        <img src="/images/banner/nav/about-2.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Financial Reports - Al-Ihsan Foundation" />
                    </div>
                    <h6 className="heading-7 mb-1.5">Financial Reports</h6>
                    <p className="text-sm tracking-tight text-neutral-600 line-clamp-4">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </div>
                    <div className="w-3/12">
                    <div className="mb-4 overflow-hidden rounded-md">
                        <img src="/images/banner/nav/about-1.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Al-Ihsan Foundation Policies" />
                    </div>
                    <h6 className="heading-7 mb-1.5">Our Policies</h6>
                    <p className="text-sm text-neutral-600 line-clamp-4">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </div>
                    <div className="w-3/12">
                    <div className="mb-4 overflow-hidden rounded-md">
                        <img src="/images/banner/nav/about-2.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Media - Al-Ihsan Foundation" />
                    </div>
                    <h6 className="heading-7 mb-1.5">Media</h6>
                    <p className="text-sm text-neutral-600 line-clamp-4">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </div>
                </div>
                <div className={`w-full mt-4 gap-7.5 p-10 border rounded-2xl absolute border-neutral-300 shadow-sm bg-neutral-100 z-30 transition-transform hidden md:flex duration-1000 transform ${megamenu === 'getinvolved' ? 'translate-y-100' : '-translate-y-[550px]'}`}>
                    <div className="w-4/12">
                    <a href="#">
                        <div className="mb-4 overflow-hidden rounded-lg">
                        <img src="/images/banner/nav/get-involved-1.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Fundraise with Al-Ihsan Foundation" />
                        </div>
                        <h6 className="heading-7 mb-1.5">Fundraise with Us</h6>
                        <p className="text-xs text-neutral-600">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </a>
                    </div>
                    <div className="w-4/12">
                    <a href="#">
                        <div className="mb-4 overflow-hidden rounded-lg">
                        <img src="/images/banner/nav/get-involved-2.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Become a sponsor with Al-Ihsan Foundation" />
                        </div>
                        <h6 className="heading-7 mb-1.5">Become a Sponsor</h6>
                        <p className="text-xs text-neutral-600">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </a>
                    </div>
                    <div className="w-4/12">
                    <a href="#">
                        <div className="mb-4 overflow-hidden rounded-lg">
                        <img src="/images/banner/nav/get-involved-3.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Volunteer with Al-Ihsan Foundation" />
                        </div>
                        <h6 className="heading-7 mb-1.5">Volunteer With Us</h6>
                        <p className="text-xs text-neutral-600">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </a>
                    </div>
                </div>
                <div className={`w-full mt-4 gap-7.5 p-10 border rounded-2xl absolute border-neutral-300 shadow-sm bg-neutral-100 z-40 transition-transform hidden md:flex duration-1000 transform ${megamenu === 'contact' ? 'translate-y-100' : '-translate-y-[550px]'}`}>
                    <div className="w-4/12">
                    <a href="#">
                        <div className="mb-4 overflow-hidden rounded-lg">
                        <img src="/images/banner/nav/contact-1.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Contact Al-Ihsan Foundation" />
                        </div>
                        <h6 className="heading-7 mb-1.5">Contact Us</h6>
                        <p className="text-xs text-neutral-600">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </a>
                    </div>
                    <div className="w-4/12">
                    <a href="#">
                        <div className="mb-4 overflow-hidden rounded-lg">
                        <img src="/images/banner/nav/contact-2.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Technical support - Al-Ihsan Foundation" />
                        </div>
                        <h6 className="heading-7 mb-1.5">Technical Support</h6>
                        <p className="text-xs text-neutral-600">Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.” </p>
                    </a>
                    </div>
                    <div className="w-4/12">
                    <a href="#">
                        <div className="mb-4 overflow-hidden rounded-lg">
                        <img src="/images/banner/nav/contact-3.jpg" className="object-cover transition duration-500 hover:scale-110" alt="Complaints and concerns - Al-Ihsan Foundation" />
                        </div>
                        <h6 className="heading-7 mb-1.5">Complaints and Concerns</h6>
                        <p className="text-xs text-neutral-600">Al-Ihsan works in partnership with people who are disadvantaged and their communities to create a meaningful and lasting change around the world. Help become a Sponsor of Al-Ihsan Foundation and provide your business with an opportunity to have access to a unique mix.</p>
                    </a>
                    </div>
                </div>
            </div>
            {/* Updates */}
            <div className="py-7.5 md:py-15">
                <section className="pb-5 md:pb-7.5" aria-label="Updates">
                    <div className="container">
                        <div className="mb-5 md:mb-17">
                            <h1 className="text-center text-heading-5 sm:text-heading-3">All Projects</h1>
                        </div>
                        <div className="pb-5 md:pb-7.5">
                            <div className="pt-5 md:pt-7.5 flex items-center justify-between form-group whitespace-nowrap">
                                <div className="flex gap-1 cursor-pointer md:hidden text-neutral-800">
                                <FilterIcon />
                                Filter
                                </div>
                                <div className="hidden md:block">
                                    <div className="form-group">
                                        <label className="relative block !mb-0">
                                            <span className="sr-only">Search</span>
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                                                <SearchIcon />
                                            </span>
                                            <input className="block w-full !py-2.5 !pr-3 bg-white border rounded-md form-control !pl-11 md:w-[200px] lg:w-[300px]" placeholder="Search" type="text" name="search" />
                                        </label>
                                    </div>
                                </div>
                                <div className="hidden md:gap-3 lg:gap-4 md:flex md:shrink-0">
                                    <div className="flex items-center md:gap-3 lg:gap-4">
                                        <label htmlFor="SelectProject" className="text-sm font-bold !mb-0">Filter:</label>
                                        <select className="md:w-35 h-10 !py-0 text-sm !text-neutral-800 form-control !rounded-md" id="SelectProject">
                                            <option value="1">Option 03</option>
                                        </select>
                                    </div>
                                    <label htmlFor="Category" className="sr-only">Select category</label>
                                    <select className="md:w-35 h-10 !py-0 text-sm !text-neutral-800 form-control !rounded-md" id="Category">
                                        <option value="1">Category 03</option>
                                    </select>
                                    <label htmlFor="Location" className="sr-only">Select location</label>
                                    <select className="md:w-35 h-10 !py-0 text-sm !text-neutral-800 form-control !rounded-md" id="Location">
                                        <option value="1">Australia</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <label htmlFor="SortyBy" className="text-sm font-bold !mb-0 hide-xs">
                                        Sort By:
                                    </label>
                                    <select className="text-sm h-10 !py-0 w-[140px] !text-neutral-800 form-control !rounded-md !pr-8 truncate" id="SortBy">
                                        <option value="1">Newest</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 md:mt-6 md:gap-4 md:items-center md:flex-row">
                                <div className="text-button-md md:text-button-lg">Showing all 15 results for</div>
                                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                                    <button className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap">
                                        Option 03 <span className="cursor-pointer text-neutral-1100"><CloseIcon iconSize={16} /></span>
                                    </button>
                                    <button className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap">
                                        Category 03 <span className="cursor-pointer text-neutral-1100"><CloseIcon iconSize={16} /></span>
                                    </button>
                                    <button className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap">
                                        Australia <span className="cursor-pointer text-neutral-1100"><CloseIcon iconSize={16} /></span>
                                    </button>
                                    <button className="items-center hidden gap-1 p-2 text-sm rounded-md md:flex bg-neutral-200 hover:bg-neutral-300">
                                        Clear filter <span className="hidden cursor-pointer text-neutral-1100 md:block"><CloseIcon iconSize={16} /></span>
                                    </button>
                                    <button className="cursor-pointer text-primary-300 text-button-md md:hidden">Clear all</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-neutral-600">Try checking for spelling errors or try another search term.</div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
};


