import React from "react";
import Loader from "../components/Loader";
import { UpdateBlog } from "../pages/Admin/Blog/UpdateBlog";
import { Details } from "../pages/Admin/Forms/Details";
import { PostDetails } from "../pages/Admin/Media/PostDetails";
import { FinancialReports } from "../pages/Admin/FinancialReports";
import { UpdateFinancials } from "../pages/Admin/FinancialReports/UpdateFinancials";
import { UpdateConstitution } from "../pages/Admin/FinancialReports/UpdateConstitution";
import { OurWorks } from "../pages/Admin/OurWorks";
import { UpdateOurWork } from "../pages/Admin/OurWorks/UpdateOurWork";
import AdminCampaigns, {
  AdminCampaignDetails,
  AddAdminCampaign,
} from "../pages/Admin/Campaigns";
import { View } from "../pages/Admin/Media/View";
import { LayoutComponent } from "../pages/Admin/Dashboard/Layout/Layout";
import DonationView from "../pages/Admin/Dashboard/DonationView";
import { NotFound } from "../pages/NotFound";

import Blogs from '../pages/Admin/Blog'
import HomePage from '../pages/Admin/HomePage'
import VideoDetails from '../pages/Admin/Media/VideoDetails'
import HomePageBanner from '../pages/Admin/HomePage/HomePageBanner'
import Tags from "../pages/Admin/Tags"

import Profile from "../pages/Admin/Profile";
import Countries from "../pages/Admin/Countries";
import Authentication from "../components/Authentication";
import Subscriptions from "../pages/Admin/Subscriptions";
import Donations from "../pages/Admin/Donations";
import ImpactStories from "../pages/Admin/ImpactStories";
import AdminsDashboard from "../pages/Admin/Dashboard";
import Media from "../pages/Admin/Media";
import NewsletterSubscribers from "../pages/Admin/NewsletterSubscribers";
import Forms from "../pages/Admin/Forms";
import Settings from "../pages/Admin/Settings";
import AdminUsers from "../pages/Admin/Users";
import AdminCustomers from "../pages/Admin/Customers/List";
import AdminCustomerDetails from "../pages/Admin/Customers/Details";
import AdminCampaignCategories from "../pages/Admin/CampaignCategories";
import UpdateStory from "../pages/Admin/ImpactStories/UpdateStories";


// const Blogs = React.lazy(() => import("../pages/Admin/Blog"));
// const HomePage = React.lazy(() => import("../pages/Admin/HomePage"));
// const VideoDetails = React.lazy(() =>
//   import("../pages/Admin/Media/VideoDetails")
// );

// const HomePageBanner = React.lazy(() => import("../pages/Admin/HomePage/HomePageBanner"));
// const Tags = React.lazy(() => import("../pages/Admin/Tags"));
// const Profile = React.lazy(() => import("../pages/Admin/Profile"));
// const Countries = React.lazy(() => import("../pages/Admin/Countries"));
// const Authentication = React.lazy(() => import("../components/Authentication"));
// const Subscriptions = React.lazy(() => import("../pages/Admin/Subscriptions"));
// const Donations = React.lazy(() => import("../pages/Admin/Donations"));
// const ImpactStories = React.lazy(() => import("../pages/Admin/ImpactStories"));
// const AdminsDashboard = React.lazy(() => import("../pages/Admin/Dashboard"));
// const Media = React.lazy(() => import("../pages/Admin/Media"));
// const NewsletterSubscribers = React.lazy(() =>
//   import("../pages/Admin/NewsletterSubscribers")
// );
// const Forms = React.lazy(() => import("../pages/Admin/Forms"));
// const Settings = React.lazy(() => import("../pages/Admin/Settings"));
// const AdminUsers = React.lazy(() => import("../pages/Admin/Users"));
// const AdminCustomers = React.lazy(() => import("../pages/Admin/Customers/List"));
// const AdminCustomerDetails = React.lazy(() => import("../pages/Admin/Customers/Details"));
// const AdminCampaignCategories = React.lazy(() => import("../pages/Admin/CampaignCategories"));
// const UpdateStory = React.lazy(() => import("../pages/Admin/ImpactStories/UpdateStories"));


const createAdminRoute = (path, component) => ({
  path,
  element: (
    <LayoutComponent>
      <Authentication allowedUserTypes={["ADMIN", "SUPERADMIN"]}>
        <React.Suspense fallback={<Loader />}>{component}</React.Suspense>
      </Authentication>
    </LayoutComponent>
  ),
});

export const adminRoutes = [
  createAdminRoute("admin/dashboard", <AdminsDashboard />),
  createAdminRoute("admin/impact-stories", <ImpactStories />),
  createAdminRoute("admin/impact-story/:id", <UpdateStory />),
  createAdminRoute("admin/impact-story", <UpdateStory />),
  createAdminRoute("admin/blog", <Blogs />),
  createAdminRoute("admin/edit-blog/:id", <UpdateBlog />),
  createAdminRoute("admin/add-blog", <UpdateBlog />),
  createAdminRoute("admin/fundraisers", <Forms />),
  createAdminRoute("admin/fundraisers/:id", <Details />),
  createAdminRoute("admin/sponsors", <Forms />),
  createAdminRoute("admin/sponsors/:id", <Details />),
  createAdminRoute("admin/volunteers", <Forms />),
  createAdminRoute("admin/volunteers/:id", <Details />),
  createAdminRoute("admin/contacts", <Forms />),
  createAdminRoute("admin/contacts/:id", <Details />),
  createAdminRoute("admin/technical-support", <Forms />),
  createAdminRoute("admin/technical-support/:id", <Details />),
  createAdminRoute("admin/complaints", <Forms />),
  createAdminRoute("admin/complaints/:id", <Details />),
  createAdminRoute("admin/videos", <Media />),
  createAdminRoute("admin/posts", <Media />),
  createAdminRoute("admin/videos-details", <VideoDetails />),
  createAdminRoute("admin/videos-details/:id", <VideoDetails />),
  createAdminRoute("admin/posts-details", <PostDetails />),
  createAdminRoute("admin/posts-details/:id", <PostDetails />),
  createAdminRoute("admin/video/:id", <View />),
  createAdminRoute("admin/post/:id", <View />),
  createAdminRoute("admin/newsletter-subscribers", <NewsletterSubscribers />),
  createAdminRoute("admin/financial-reports", <FinancialReports />),
  createAdminRoute("admin/constitution", <FinancialReports />),
  createAdminRoute("admin/financial-report/:id", <UpdateFinancials />),
  createAdminRoute("admin/financial-report", <UpdateFinancials />),
  createAdminRoute("admin/constitution/:id", <UpdateConstitution />),
  createAdminRoute("admin/constitution", <UpdateConstitution />),
  createAdminRoute("admin/our-works", <OurWorks />),
  createAdminRoute("admin/our-work", <UpdateOurWork />),
  createAdminRoute("admin/our-work/:id", <UpdateOurWork />),
  createAdminRoute("admin/campaigns", <AdminCampaigns />),
  createAdminRoute("admin/campaign/:id", <AdminCampaignDetails />),
  createAdminRoute("admin/campaigns/add", <AddAdminCampaign />),
  createAdminRoute("admin/donations", <Donations />),
  createAdminRoute("admin/subscriptions", <Subscriptions />),
  createAdminRoute("admin/donation/:id", <DonationView />),
  createAdminRoute("admin/subscription/:id", <DonationView />),
  createAdminRoute("admin/tags", <Tags />),
  createAdminRoute("admin/homepage-cms", <HomePage />),
  createAdminRoute("admin/homepage-banner", <HomePageBanner />),
  createAdminRoute("admin/profile", <Profile />),
  createAdminRoute("admin/countries", <Countries />),
  createAdminRoute("admin/settings", <Settings />),
  createAdminRoute("admin/admins", <AdminUsers />),
  createAdminRoute("admin/customers", <AdminCustomers />),
  createAdminRoute("admin/customer/:id", <AdminCustomerDetails />),
	createAdminRoute("admin/campaign-categories", <AdminCampaignCategories />),
  { path: 'admin/*', element: <NotFound /> },

];
