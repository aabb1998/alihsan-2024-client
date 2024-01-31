import {
  getComplaints,
  getContacts,
  getFundraisers,
  getSponsors,
  getTechnicalSupports,
  getVolunteer,
} from "../features/adminForms/adminFormSlice";
import {
  AirplayIcon,
  BriefCaseIcon,
  CompaignsIcon,
  CreditcardIcon,
  DollarsignIcon,
  FacebookIcon,
  FeatherIcon,
  FileIcon,
  FilmIcon,
  GridIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MappinIcon,
  NavigationmenuIcon,
  SettingsIcon,
  StatisticsIcon,
  TagIcon,
  TwitterIcon,
  UserIcon,
  UsersIcon,
  WhatsappIcon,
} from "../theme/svg-icons";

export const MyDonationTypes = {
  ACTIVE_RECURRING: "ACTIVE_RECURRING",
  INACTIVE_RECURRING: "INACTIVE_RECURRING",
  ONETIME: "ONETIME",
};

export const Transitions = {
  QUICK_DONATION_DURATION: 300,
};

export const itemPerPage = 10;
export const adminItemPerPage = 10;

export const MenuData = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    menu: "aboutus",
    subMenu: [
      {
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/1.png",
        title: "Who We Are",
        description:
          "Discover the story behind Alihsan Foundation. Learn about our mission, vision, values, and the team dedicated to making a difference in the lives of others.",
        to: "/about-us/who-we-are",
      },
      {
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/2.png",
        title: "Financial Reports",
        description:
          "Explore Alihsan Foundation's financial reports for a detailed account of our financial stewardship, demonstrating our commitment to responsible and ethical financial management.",
        to: "/financial-reports",
      },
      {
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/3.png",
        title: "Our Policies",
        description:
          "Learn about the policies governing Alihsan Foundation’s operations. Our commitment to transparency and accountability is reflected in our organisational policies.",
        to: "/about-us/our-policies",
      },
      {
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/4.png",
        title: "Media",
        description:
          "Stay informed about Alihsan Foundation's latest news, events, and stories. Our media section provides updates and insights into the impact of our work.",
        to: "/media",
      },
    ],
  },
  { label: "Impact Stories", to: "/impact-stories" },
  { label: "Our Projects", menu: "campaigns" },
  {
    label: "Get Involved",
    menu: "getinvolved",
    subMenu: [
      {
        title: "Fundraise With Us",
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/5.png",
        description: `Help raise funds for Alihsan Foundation’s initiatives. Whether it’s through events or personal challenges, your fundraising efforts support our vital community work.`,
        to: "/fundraise-with-us",
      },
      {
        title: "Become A Sponsor",
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/6.png",
        description:
          "Support Alihsan Foundation's mission by becoming a sponsor. Your sponsorship helps fund our programs, making a lasting impact in the communities we serve.",
        to: "/become-a-sponsor",
      },
      {
        title: "Volunteer With Us",
        image: "/images/banner/nav/get-involved-3.jpg",
        description:
          "Join the Alihsan Foundation family as a volunteer. Make a difference in the community by contributing your time, skills, and passion to our various programs and events.",
        to: "/volunteer-with-us",
      },
    ],
  },
  {
    label: "Contact",
    menu: "contact",
    subMenu: [
      {
        title: "Contact Us",
        image: "/images/banner/nav/contact-1.jpg",
        description:
          "Connect with Alihsan Foundation for inquiries, support, or feedback. Our dedicated team is here to assist you with any questions or information you may need.",
        to: "/contact-and-complaints/get-in-touch",
      },
      {
        title: "Technical Support",
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/7.png",
        description:
          "Experiencing technical issues on our website or with our services? Contact our Technical Support team for assistance in navigating and resolving any technical problems you encounter.",
        to: "/technical-support",
      },
      {
        title: "Complaints",
        image:
          "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/MegaMenuImages/8.png",
        description:
          "Alihsan Foundation values your feedback. If you have any complaints or concerns about our services or activities, please reach out for a prompt and fair resolution.",
        to: "/contact-and-complaints/complaints",
      },
    ],
  },
];

export const volunteerList = [
  {
    id: 1,
    name: "Wade Warren",
    image: "1.jpg",
  },
  {
    id: 2,
    name: "Devon Lane",
    image: "2.jpg",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    image: "3.jpg",
  },
  {
    id: 4,
    name: "Darlene Robertson",
    image: "4.jpg",
  },
  {
    id: 5,
    name: "Dianne Russell",
    image: "5.jpg",
  },
  {
    id: 6,
    name: "Theresa Webb",
    image: "6.jpg",
  },
  {
    id: 7,
    name: "Albert Flores",
    image: "7.jpg",
  },
  {
    id: 8,
    name: "Eleanor Pena",
    image: "8.jpg",
  },
  {
    id: 9,
    name: "Esther Howard",
    image: "9.jpg",
  },
  {
    id: 10,
    name: "Dianne Russell",
    image: "10.jpg",
  },
  {
    id: 11,
    name: "Cody Fisher",
    image: "11.jpg",
  },
  {
    id: 12,
    name: "Devon Lane",
    image: "12.jpg",
  },
];

export const sponsorList = [
  {
    id: 1,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/1.svg",
  },
  {
    id: 2,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/10.svg",
  },
  {
    id: 3,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/11.svg",
  },
  {
    id: 4,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/12.svg",
  },
  {
    id: 5,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/13.svg",
  },
  {
    id: 1,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/2.svg",
  },
  {
    id: 2,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/3.svg",
  },
  {
    id: 3,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/4.svg",
  },
  {
    id: 4,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/5.svg",
  },
  {
    id: 5,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/6.svg",
  },
  {
    id: 1,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/7.svg",
  },
  {
    id: 2,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/8.svg",
  },
  {
    id: 3,
    logo: "https://alihsan.s3.ap-southeast-2.amazonaws.com/images/Sponsors/9.svg",
  },
];

export const technicalRequirements = [
  { label: "Select Requirement", value: "" },
  { label: "Requirement 1", value: "requirement1" },
  { label: "Requirement 2", value: "requirement2" },
  { label: "Requirement 3", value: "requirement3" },
];

export const financialYearList = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010" },
  { value: "2009", label: "2009" },
  { value: "2008", label: "2008" },
  { value: "2007", label: "2007" },
  { value: "2006", label: "2006" },
  { value: "2005", label: "2005" },
  { value: "2004", label: "2004" },
  { value: "2003", label: "2003" },
  { value: "2002", label: "2002" },
  { value: "2001", label: "2001" },
  { value: "2000", label: "2000" },
];

export const aboutAs = [
  {
    text: "Who We Are?",
    to: "/about-us/who-we-are",
  },
  {
    text: "Our Vision & Mission",
    to: "",
  },
  {
    text: "Objectives & Strategies",
    to: "",
  },
  {
    text: "Case Studies",
    to: "",
  },
  {
    text: "News",
    to: "/news",
  },
  {
    text: "Videos",
    to: "/media",
  },
];

export const policies = [
  {
    text: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    text: "Terms & Conditions",
    to: "/terms-and-conditions",
  },
  {
    text: "Child Protection Policies",
    to: "",
  },
  {
    text: "Data Deletion Policy",
    to: "",
  },
  {
    text: "Safeguarding Policy",
    to: "",
  },
];

export const followUs = [
  {
    url: "https://www.facebook.com/alihsanfoundation",
    label: "Navigate to facebook",
    icon: <FacebookIcon />,
  },
  {
    url: "https://twitter.com/Alihsan_AU",
    label: "Navigate to twitter",
    icon: (
      <div className="w-4 h-4 flex items-center justify-center text-white bg-[#C0BEB9] rounded">
        <TwitterIcon iconSize={10} />
      </div>
    ),
  },
  {
    url: "https://www.linkedin.com/company/alihsanfoundation/about/",
    label: "Navigate to linkedin",
    icon: <LinkedinIcon />,
  },
  {
    url: "https://www.instagram.com/alihsan_foundation/",
    label: "Navigate to instagram",
    icon: <InstagramIcon />,
  },
  {
    url: "/",
    label: "Navigate to whatsapp",
    icon: <WhatsappIcon />,
  },
];

export const privacy = [
  { text: "Privacy Policy", to: "/privacy-policy" },
  { text: "Terms and Conditions", to: "/terms-and-conditions" },
];

export const brand = [
  { src: "/images/assets/tax-deductible.png", label: "Tax deductible" },
  { src: "/images/assets/registered-charity.png", label: "Registered charity" },
];

export const adminNavigationItems = [
  {
    icon: <GridIcon />,
    label: "Dashboard",
    to: "/admin/dashboard",
    urls: ["/admin/dashboard"],
  },
  {
    icon: <CompaignsIcon />,
    label: "Campaign Categories",
    to: "/admin/campaign-categories",
    urls: ["/admin/campaign-categories"],
  },
  {
    icon: <CompaignsIcon />,
    label: "Campaigns",
    to: "/admin/campaigns",
    urls: ["/admin/campaigns", "/admin/campaign/"],
  },
  // { icon: <StatisticsIcon />, label: "Statistics", to: "/", urls: [] },
  {
    icon: <UsersIcon />,
    label: "Admins",
    to: "/admin/admins",
    urls: ["/admin/admins"],
  },
  {
    icon: <DollarsignIcon />,
    label: "Donations",
    to: "/admin/donations",
    urls: ["/admin/donations", "/admin/donation/"],
  },
  {
    icon: <CreditcardIcon />,
    label: "Subscriptions",
    to: "/admin/subscriptions",
    urls: ["/admin/subscriptions", "/admin/subscription/"],
  },
  {
    icon: <NavigationmenuIcon />,
    label: "Forms",
    to: "/",
    submenu: [
      { label: "Contact Us", to: "/admin/contacts", urls: ["/admin/contacts"] },
      {
        label: "Complaints",
        to: "/admin/complaints",
        urls: ["/admin/complaints", "/admin/impact-story"],
      },
      {
        label: "Technical Support",
        to: "/admin/technical-support",
        urls: ["admin/technical-support"],
      },
      {
        label: "Fundraise With Us",
        to: "/admin/fundraisers",
        urls: ["/admin/fundraisers"],
      },
      {
        label: "Become A Sponsor",
        to: "/admin/sponsors",
        urls: ["/admin/sponsors"],
      },
      {
        label: "Volunteer With Us",
        to: "/admin/volunteers",
        urls: ["/admin/volunteers"],
      },
    ],
  },
  {
    icon: <UserIcon />,
    label: "Customers",
    to: "/admin/customers",
    urls: ["/admin/customers"],
  },
  {
    icon: <AirplayIcon />,
    label: "Blogs",
    to: "/admin/blog",
    urls: ["/admin/blog", "/admin/edit-blog/", "/admin/add-blog"],
  },
  {
    icon: <HomeIcon />,
    label: "Homepage CMS",
    to: "/admin/homepage-cms",
    urls: ["/admin/homepage-cms"],
  },

  {
    icon: <FeatherIcon />,
    label: "Impact Stories",
    to: "/admin/impact-stories",
    urls: ["/admin/impact-stories", "/admin/impact-story"],
  },

  {
    icon: <MailIcon />,
    label: "Newsletter Subscribers",
    to: "/admin/newsletter-subscribers",
    urls: ["/admin/newsletter-subscribers"],
  },

  {
    icon: <FilmIcon />,
    label: "Media",
    to: "/",
    submenu: [
      {
        label: "On Ground Videos ",
        to: "/admin/videos",
        urls: ["/admin/videos", "/admin/videos-details", "/admin/video"],
      },
      {
        label: "Post Campaign Updates",
        to: "/admin/posts",
        urls: ["/admin/posts", "admin/posts-details", "/admin/post"],
      },
    ],
  },
  {
    icon: <FileIcon />,
    label: "Financial Reports",
    to: "/",
    submenu: [
      {
        label: "Financial Report",
        to: "/admin/financial-reports",
        urls: ["/admin/financial-reports"],
      },
      {
        label: "Constitution",
        to: "/admin/constitution",
        urls: ["/admin/constitution"],
      },
    ],
  },
  {
    icon: <BriefCaseIcon />,
    label: "Our Work, Their Voice",
    to: "/admin/our-works",
    urls: ["/admin/our-works", "/admin/our-work"],
  },
  {
    icon: <TagIcon />,
    label: "Tags",
    to: "/admin/tags",
    urls: ["/admin/tags"],
  },
  {
    icon: <MappinIcon />,
    label: "Map Countries",
    to: "/admin/countries",
    urls: ["/admin/countries"],
  },
  {
    icon: <SettingsIcon />,
    label: "Settings",
    to: "/admin/settings",
    urls: ["/admin/settings"],
  },
];

export const adminFormLists = {
  "/admin/fundraisers": [
    { label: "Name", key: "name" },
    { label: "Amount", key: "amount" },
    { label: "Phone Number", key: "phone" },
    { label: "Status", key: "status" },
  ],
  "/admin/sponsors": [
    { label: "First Name", key: "firstName", isSortable: true },
    { label: "Last Name", key: "lastName", isSortable: true },
    { label: "Company Name", key: "companyName", isSortable: true },
    { label: "Phone Number", key: "phone", isSortable: true },
    { label: "Status", key: "status" },
  ],
  "/admin/volunteers": [
    { label: "First Name", key: "firstName", isSortable: true },
    { label: "Last Name", key: "lastName", isSortable: true },
    { label: "Company Name", key: "companyName", isSortable: true },
    { label: "Phone Number", key: "phone", isSortable: true },
    { label: "Status", key: "status" },
  ],
  "/admin/contacts": [
    { label: "First Name", key: "firstName", isSortable: true },
    { label: "Last Name", key: "lastName", isSortable: true },
    { label: "Email", key: "email", isSortable: true },
    { label: "Phone Number", key: "phone", isSortable: true },
    { label: "Status", key: "status" },
  ],
  "/admin/technical-support": [
    { label: "Name", key: "name", isSortable: true },
    { label: "Email", key: "email", isSortable: true },
    { label: "Phone Number", key: "phone", isSortable: true },
    { label: "Mark as Solved", key: "status", isSortable: true },
  ],
  "/admin/complaints": [
    { label: "Ref Number", key: "referenceNumber" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
  ],
};

export const adminFormsTitle = {
  "/admin/fundraisers": "Fundraise With Us",
  "/admin/sponsors": "Become a Sponsor",
  "/admin/volunteers": "Volunteer With Us",
  "/admin/contacts": "Contact Us",
  "/admin/technical-support": "Technical Support",
  "/admin/complaints": "Complaints",
};

export const adminFormsDispatch = {
  "/admin/fundraisers": getFundraisers,
  "/admin/sponsors": getSponsors,
  "/admin/volunteers": getVolunteer,
  "/admin/contacts": getContacts,
  "/admin/technical-support": getTechnicalSupports,
  "/admin/complaints": getComplaints,
};

export const statusUpade = {
  "/admin/fundraisers": "/form/fund-raiser/",
  "/admin/sponsors": "/form/sponsor/",
  "/admin/volunteers": "/form/volunteer/",
  "/admin/contacts": "/form/contact-us/",
};

export const exportUrl = {
  "/admin/contacts": "/form/contact-us-export",
  "/admin/technical-support": "/form/technical-support-export",
  "/admin/fundraisers": "/form/fund-raiser-export",
  "/admin/sponsors": "/form/sponsor-export",
  "/admin/volunteers": "/form/volunteer-export",
  "/admin/complaints": "/complaints/export",
};

export const pathDispatchMap = {
  "/admin/contacts": "form/contact-us/",
  "/admin/technical-support": "form/technical-support/",
  "/admin/fundraisers": "form/fund-raiser/",
  "/admin/sponsors": "form/sponsor/",
  "/admin/volunteers": "form/volunteer/",
  "/admin/complaints": "complaints/",
};

export const formDetailsValues = {
  "/admin/fundraisers/": [
    { label: "Name", key: "name" },
    { label: "Amount", key: "amount" },
    { label: "Phone Number", key: "phone" },
    { label: "Campaign Start Date", key: "campaignStart" },
    { label: "Campaign End Date", key: "campaignEnd" },
    { label: "Project", key: "projectList" },
    { label: "Status", key: "status" },
    { label: "Is Deceased Person", key: "forDeceasedPerson", isBoolean: true },
  ],
  "/admin/sponsors/": [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Company Name", key: "companyName" },
    { label: "Phone Number", key: "phone" },
    { label: "Message", key: "message" },
    { label: "Status", key: "status" },
  ],
  "/admin/volunteers/": [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Company Name", key: "companyName" },
    { label: "Phone Number", key: "phone" },
    { label: "Message", key: "message" },
    { label: "Status", key: "status" },
  ],
  "/admin/contacts/": [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone" },
    { label: "Message", key: "message" },
    { label: "Created At", key: "created_at" },
  ],
  "/admin/technical-support/": [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone" },
    { label: "Status", key: "status" },
    { label: "Requirement", key: "requirement" },
    { label: "Description", key: "description" },
    {
      label: "Technical Support Images",
      key: "FormTechnicalSupportImages",
      isImage: true,
    },
    { label: "Solution", key: "adminReason" },
  ],
  "/admin/complaints/": [
    { label: "Reference Number", key: "referenceNumber" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Phone Number", key: "phone" },
    { label: "Category", key: "category" },
    { label: "Description", key: "description" },
    { label: "Created At", key: "CreatedAt" },
    { label: "Admin Reason", key: "adminReason" },
  ],
  "/admin/post/": [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Image", key: "url", image: true },
    { label: "Created Date", key: "createdDate" },
  ],
  "/admin/video/": [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Video", key: "url", video: true },
    { label: "Created Date", key: "createdDate" },
  ],
};

export const ProjectStatuses = [
  {
    label: "Active",
    value: "ACTIVE",
    bgColorClass: "bg-green-300",
    textColorClass: "text-primary-300",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
    bgColorClass: "bg-primary-100",
    textColorClass: "text-primary-300",
  },
  {
    label: "Draft",
    value: "DRAFT",
    bgColorClass: "bg-neutral-1000",
    textColorClass: "text-white",
  },
  {
    label: "Deleted",
    value: "DELETED",
    bgColorClass: "bg-red-400",
    textColorClass: "text-white",
  },
];

export const currencyConfig = {
  label: process.env.REACT_APP_CURRENCY_LABEL || "$",
};
