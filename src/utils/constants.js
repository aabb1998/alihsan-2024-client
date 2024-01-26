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
        image: "/images/banner/nav/about-1.jpg",
        title: "Who We Are",
        description:
          "Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.”",
        to: "/about-us/who-we-are",
      },
      {
        image: "/images/banner/nav/about-2.jpg",
        title: "Financial Reports",
        description:
          "Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.”",
        to: "/financial-reports",
      },
      {
        image: "/images/banner/nav/about-1.jpg",
        title: "Our Policies",
        description:
          "Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.”",
        to: "/about-us/our-policies",
      },
      {
        image: " /images/banner/nav/about-2.jpg",
        title: "Media",
        description:
          "Al-Ihsan Foundation International Limited (formed in 2014) is a non-profit public relief organisation dedicated to assisting all people and families in need. The Arabic word Al-Ihsan means “perfection” or “excellence.”",
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
        image: "/images/banner/nav/get-involved-1.jpg",
        description: `Al-Ihsan Foundation International Limited (formed in 2014) is a
          non-profit public relief organisation dedicated to assisting all
          people and families in need. The Arabic word Al-Ihsan means
          “perfection” or “excellence.”`,
        to: "/fundraise-with-us",
      },
      {
        title: "Become A Sponsor",
        image: "/images/banner/nav/get-involved-2.jpg",
        description: `Al-Ihsan Foundation International Limited (formed in 2014) is a
          non-profit public relief organisation dedicated to assisting all
          people and families in need. The Arabic word Al-Ihsan means
          “perfection” or “excellence.”`,
        to: "/become-a-sponsor",
      },
      {
        title: "Volunteer With Us",
        image: "/images/banner/nav/get-involved-3.jpg",
        description: `Al-Ihsan Foundation International Limited (formed in 2014) is a
          non-profit public relief organisation dedicated to assisting all
          people and families in need. The Arabic word Al-Ihsan means
          “perfection” or “excellence.”`,
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
        description: `Al-Ihsan Foundation International Limited (formed in 2014) is a
non-profit public relief organisation dedicated to assisting all
people and families in need. The Arabic word Al-Ihsan means
“perfection” or “excellence.”`,
        to: "/contact-and-complaints/get-in-touch",
      },
      {
        title: "Technical Support",
        image: "/images/banner/nav/contact-2.jpg",
        description: `Al-Ihsan Foundation International Limited (formed in 2014) is a
non-profit public relief organisation dedicated to assisting all
people and families in need. The Arabic word Al-Ihsan means
“perfection” or “excellence.”`,
        to: "/technical-support",
      },
      {
        title: "Complaints",
        image: "/images/banner/nav/contact-3.jpg",
        description: `Al-Ihsan Foundation International Limited (formed in 2014) is a
non-profit public relief organisation dedicated to assisting all
people and families in need. The Arabic word Al-Ihsan means
“perfection” or “excellence.”`,
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
  { id: 1, logo: "1.svg" },
  { id: 2, logo: "2.svg" },
  { id: 3, logo: "3.svg" },
  { id: 4, logo: "4.svg" },
  { id: 5, logo: "5.svg" },
  { id: 1, logo: "1.svg" },
  { id: 2, logo: "2.svg" },
  { id: 3, logo: "3.svg" },
  { id: 4, logo: "4.svg" },
  { id: 5, logo: "5.svg" },
  { id: 1, logo: "1.svg" },
  { id: 2, logo: "2.svg" },
  { id: 3, logo: "3.svg" },
  { id: 4, logo: "4.svg" },
  { id: 5, logo: "5.svg" },
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
    icon: <TwitterIcon />,
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
  { icon: <UsersIcon />, label: "Admins", to: "/admin/admins", urls: ['/admin/admins'] },
  {
    icon: <DollarsignIcon />,
    label: "Donations",
    to: "/admin/donations",
    urls: ["/admin/donations","/admin/donation/"],
  },
  {
    icon: <CreditcardIcon />,
    label: "Subscriptions",
    to: "/admin/subscriptions",
    urls: ["/admin/subscriptions","/admin/subscription/"],
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
  { icon: <UserIcon />, label: "Customers", to: "/admin/customers", urls: ["/admin/customers"] },
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
