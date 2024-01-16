import React from "react";
import { BrowserRouter as Router, createBrowserRouter } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import ResetPassword from "../pages/Authentication/ResetPassword";
import VerifyUser from "../pages/Authentication/VerifyUser";
import VerifyResetPassword from "../pages/Authentication/ResetPassword/verifyResetPassword";
import ResetNewPassword from "../pages/Authentication/ResetPassword/resetNewPassword";
import { AllProjectsComponent } from "../pages/Projects";
import { AllProjectsModalComponent } from "../pages/Projects/AllProjectsModal";
import { AdminloginComponent } from "../pages/Admin/Authentication/Login";
import { AdminResetPasswordComponent } from "../pages/Admin/Authentication/ResetPassword";
import { EidGiftsProjectDetails } from "../pages/Projects/ProjectDetail/RamadanCampaigns/EidGifts";
import { FoodPacksProjectDetails } from "../pages/Projects/ProjectDetail/RamadanCampaigns/FoodPacks";
import { HotMealsProjectDetails } from "../pages/Projects/ProjectDetail/RamadanCampaigns/HotMeals";
import { LayoutComponent } from "../pages/Admin/Dashboard/Layout/Layout";
import { MyDonationsComponent } from "../pages/User/MyDonations";
import { RecurringDonation } from "../pages/MyDonations/RecurringDonation";
import { NoProjectsComponent } from "../pages/Projects/NoResult";
import { OneTimeDonations } from "../pages/MyDonations/OneTimeDonation";
import { PaymentDetailsComponent } from "../pages/User/PaymentDetails";
import { PaymentDetailsListingComponent } from "../pages/User/PaymentDetails/listing/listing";
import ProjectDetails from "../pages/Projects/ProjectDetails";
import { ProjectDetailUpdatesComponent } from "../pages/Projects/ProjectDetail/updates";
import { SadaqahJaariahProjectDetails } from "../pages/Projects/ProjectDetail/SadaqahJaariah";
import { ZakatAlMaalProjectDetails } from "../pages/Projects/ProjectDetail/RamadanCampaigns/ZakatAlMaal";
import { ZakatAlFitrProjectDetails } from "../pages/Projects/ProjectDetail/RamadanCampaigns/ZakatAlFitr";
import { NoCampaignComponent } from "../pages/Admin/Dashboard/Pages/Campaign/NoCampaign";
import { AddCampaignComponent } from "../pages/Admin/Dashboard/Pages/Campaign/AddCampaign";
import { ListCampaignComponent } from "../pages/Admin/Dashboard/Pages/Campaign/ListCampaign";
import { EditCampaignComponent } from "../pages/Admin/Dashboard/Pages/Campaign/EditCampaign";

import { GetInTouchComponent } from "../pages/ContactAndComplaints/GetInTouch";
import { Profile } from "../pages/Authentication/Profile";

import Checkout from "../pages/Payment/Checkout";
import { OurPoliciesComponent } from "../pages/AboutUs/OurPolicies";
import { WhoWeAreComponent } from "../pages/AboutUs/WhoWeAre";
import { TermsAndConditionsComponent } from "../pages/TermsAndConditions";
import { PrivacyPolicyComponent } from "../pages/PrivacyPolicy";

import { AddDonationModalComponent } from "../pages/Admin/Dashboard/Pages/Campaign/Common/AddDonationModal";
import { AdminsContentComponent } from "../pages/Admin/Dashboard/Pages/Admins";
import { FinancialReports } from "../pages/FinancialReports";
import { NewsDetailsComponent } from "../features/news/NewsDetails";
import { Donations } from "../pages/Admin/Dashboard/Pages/Donations";
import { Subscriptions } from "../pages/Admin/Dashboard/Pages/Subscriptions";
import { Users } from "../pages/Admin/Dashboard/Pages/Users";
import { UserInfoTable } from "../pages/Admin/Dashboard/Pages/Users/Common/UserInfoTable";
import AddUser from "../pages/Admin/Dashboard/Pages/Users/Common/Adduser";
import EditUser from "../pages/Admin/Dashboard/Pages/Users/Common/EditUser";
import AddTag from "../pages/Admin/Dashboard/Pages/Blog/Common/AddTag";
import { HomePageCMS } from "../pages/Admin/Dashboard/Pages/HomepageCMS";
import FeatureCampaign from "../pages/Admin/Dashboard/Pages/HomepageCMS/Common/FeatureCampaigns";

import { QuickDonationProvider } from "../features/quickDonation";
import { MediaDetails } from "../pages/Media/MediaDetails";
import { VolunteerWithUs } from "../pages/Volunteer";
import { TechnicalSupport } from "../pages/TechnicalSupport";
import { AdminProfile } from "../pages/Admin/Dashboard/Pages/Profile";
import { ErrorPage } from "../pages/404";
import { Layout } from "../Layout";
import { HomepageSettings } from "../pages/Admin/Dashboard/Pages/HomepageSettings";
import AdminRouter from "./admin";
import { Unauthorized } from "../pages/Unauthorized";

const HomeComponent = React.lazy(() => import("../pages/Home"));
const ZakatCalculator = React.lazy(() => import("../features/zakat"));
const BecomeASponsor = React.lazy(() => import("../pages/BecomeASponsor"));
const Media = React.lazy(() => import("../pages/Media"));
const ImpactStoryComponent = React.lazy(() => import("../pages/ImpactStories"));
const ThankYouComponent = React.lazy(() =>
  import("../pages/DonationProcess/ThankYou")
);
const CheckoutComponent = React.lazy(() =>
  import("../pages/DonationProcess/Checkout")
);
const CheckoutPaymentComponent = React.lazy(() =>
  import("../pages/DonationProcess/PaymentDetails")
);
const NewsComponent = React.lazy(() => import("../pages/News"));
const FundraiseWithUs = React.lazy(() => import("../pages/FundraiseWithUs"));
const ComplaintsComponent = React.lazy(() =>
  import("../pages/ContactAndComplaints")
);
const Basket = React.lazy(() => import("../pages/Bucket/Bucket"));
const CommonAuthentication = React.lazy(() =>
  import("../pages/Authentication/Common")
);
const Authentication = React.lazy(() => import("../components/Authentication"));

const ImpactStoryDetails = React.lazy(() =>
  import("../pages/ImpactStories/ImpactStoryDetails")
);

const Loader = () => (
  <div className="flex items-center justify-center h-screen mx-8 text-center">
    {/* <GlobalLoader /> */}
  </div>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <CommonAuthentication>
        <Login />
      </CommonAuthentication>
    ),
  },
  {
    element: (
      <QuickDonationProvider>
        <Layout />,
      </QuickDonationProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <React.Suspense fallback={<Loader />}>
            <HomeComponent />
          </React.Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <CommonAuthentication>
            <Profile />
          </CommonAuthentication>
        ),
      },
      {
        path: "/projects",
        element: <AllProjectsComponent />,
      },
      {
        path: "/project/:id",
        element: <ProjectDetails />,
      },
      {
        path: "zakat-calculator",
        element: <ZakatCalculator />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "/recurring-donations",
        element: (
          <Authentication allowedUserTypes={["USER"]}>
            <RecurringDonation />
          </Authentication>
        ),
      },
      {
        path: "/onetime-donations",
        element: (
          <Authentication allowedUserTypes={["USER"]}>
            <OneTimeDonations />
          </Authentication>
        ),
      },
      {
        path: "payment-details",
        element: (
          <Authentication allowedUserTypes={["USER"]}>
            <PaymentDetailsComponent />
          </Authentication>
        ),
      },
      {
        path: "checkout",
        element: <CheckoutComponent />,
      },
      {
        path: "confirm",
        element: <CheckoutPaymentComponent />,
      },
      {
        path: "impact-stories",
        element: <ImpactStoryComponent />,
      },
      {
        path: "impact-story/:id",
        element: <ImpactStoryDetails />,
      },
      {
        path: "news",
        element: <NewsComponent />,
      },
      {
        path: "news/details/:id",
        element: <NewsDetailsComponent />,
      },
      {
        path: "financial-reports",
        element: (
          <Authentication allowedUserTypes={["USER"]}>
            <FinancialReports />
          </Authentication>
        ),
      },
      {
        path: "media",
        element: <Media />,
      },
      {
        path: "media/details/:id",
        element: <MediaDetails />,
      },
      {
        path: "fundraise-with-us",
        element: <FundraiseWithUs />,
      },
      {
        path: "volunteer-with-us",
        element: <VolunteerWithUs />,
      },
      {
        path: "become-a-sponsor",
        element: <BecomeASponsor />,
      },
      {
        path: "payment/checkout",
        element: <Checkout />,
      },
      {
        path: "thank-you",
        element: <ThankYouComponent />,
      },
      {
        path: "contact-and-complaints/get-in-touch",
        element: <GetInTouchComponent />,
      },
      {
        path: "technical-support",
        element: <TechnicalSupport />,
      },
      {
        path: "contact-and-complaints/complaints",
        element: <ComplaintsComponent />,
      },
      {
        path: "about-us/who-we-are",
        element: <WhoWeAreComponent />,
      },

      {
        path: "about-us/our-policies",
        element: <OurPoliciesComponent />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditionsComponent />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyComponent />,
      },
    ],
  },

  ///UI routes

  {
    path: "/project-detail/updates",
    element: <ProjectDetailUpdatesComponent />,
  },
  {
    path: "/project-details/3",
    element: <SadaqahJaariahProjectDetails />,
  },

  {
    path: "/project-details/ramadan/1",
    element: <HotMealsProjectDetails />,
  },
  {
    path: "/project-details/ramadan/2",
    element: <FoodPacksProjectDetails />,
  },
  {
    path: "/project-details/ramadan/3",
    element: <EidGiftsProjectDetails />,
  },
  {
    path: "/project-details/ramadan/4",
    element: <ZakatAlFitrProjectDetails />,
  },
  {
    path: "/project-details/ramadan/5",
    element: <ZakatAlMaalProjectDetails />,
  },

  {
    path: "user/my-donations",
    element: <MyDonationsComponent />,
  },

  {
    path: "user/payment-details/listing",
    element: <PaymentDetailsListingComponent />,
  },

  // ADMIN PANEL
  {
    path: "admin/authentication/login",
    element: <AdminloginComponent />,
  },
  {
    path: "admin/authentication/reset-password",
    element: <AdminResetPasswordComponent />,
  },
  {
    path: "admin/*",
    element: (
      <LayoutComponent>
        <Authentication allowedUserTypes={["ADMIN"]}>
          <AdminRouter />
        </Authentication>
      </LayoutComponent>
    ),
  },
  {
    path: "admin/campaign/empty",
    element: (
      <LayoutComponent>
        <NoCampaignComponent />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/campaign/add",
    element: (
      <LayoutComponent>
        <AddCampaignComponent />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/campaign/list",
    element: (
      <LayoutComponent>
        <ListCampaignComponent />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/campaign/edit",
    element: (
      <LayoutComponent>
        <EditCampaignComponent />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/campaign/donations/add",
    element: (
      <LayoutComponent>
        <AddDonationModalComponent />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/admins",
    element: (
      <LayoutComponent>
        <AdminsContentComponent />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/donations",
    element: (
      <LayoutComponent>
        <Donations />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/subscriptions",
    element: (
      <LayoutComponent>
        <Subscriptions />
      </LayoutComponent>
    ),
  },

  {
    path: "admin/users",
    element: (
      <LayoutComponent>
        <Users />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/users/info",
    element: (
      <LayoutComponent>
        <UserInfoTable />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/users/add",
    element: (
      <LayoutComponent>
        <AddUser />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/users/edit",
    element: (
      <LayoutComponent>
        <EditUser />
      </LayoutComponent>
    ),
  },

  {
    path: "admin/blog/tags",
    element: (
      <LayoutComponent>
        <AddTag />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/homepage-CMS",
    element: (
      <LayoutComponent>
        <HomePageCMS />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/homepage-CMS/feature-campaigns",
    element: (
      <LayoutComponent>
        <FeatureCampaign />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/profile",
    element: (
      <LayoutComponent>
        <AdminProfile />
      </LayoutComponent>
    ),
  },
  {
    path: "admin/homepage-settings",
    element: (
      <LayoutComponent>
        <HomepageSettings />
      </LayoutComponent>
    ),
  },
  {
    path: "404",
    element: <ErrorPage />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/create-your-account",
    element: (
      <CommonAuthentication>
        <Signup />
      </CommonAuthentication>
    ),
  },
  {
    path: "/verifyuser/:token",
    element: (
      <CommonAuthentication>
        <VerifyUser />
      </CommonAuthentication>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <CommonAuthentication>
        <ResetPassword />
      </CommonAuthentication>
    ),
  },
  {
    path: "/verify-reset-password/:token",
    element: (
      <CommonAuthentication>
        <VerifyResetPassword />
      </CommonAuthentication>
    ),
  },
  {
    path: "/reset-new-password/:token",
    element: (
      <CommonAuthentication>
        <ResetNewPassword />
      </CommonAuthentication>
    ),
  },
  {
    path: "/all-projects",
    element: <AllProjectsComponent />,
  },
  {
    path: "/all-projects/modal",
    element: <AllProjectsModalComponent />, // Temporarily added for qa
  },
  {
    path: "/all-projects/no-result",
    element: <NoProjectsComponent />, // Temporarily added for qa
  },

  {
    path: "/project-detail/updates",
    element: <ProjectDetailUpdatesComponent />,
  },

  {
    path: "/project-details/3",
    element: <SadaqahJaariahProjectDetails />,
  },

  {
    path: "/project-details/ramadan/1",
    element: <HotMealsProjectDetails />,
  },
  {
    path: "/project-details/ramadan/2",
    element: <FoodPacksProjectDetails />,
  },
  {
    path: "/project-details/ramadan/3",
    element: <EidGiftsProjectDetails />,
  },
  {
    path: "/project-details/ramadan/4",
    element: <ZakatAlFitrProjectDetails />,
  },
  {
    path: "/project-details/ramadan/5",
    element: <ZakatAlMaalProjectDetails />,
  },

  {
    path: "user/my-donations",
    element: <MyDonationsComponent />,
  },

  {
    path: "user/payment-details",
    element: <PaymentDetailsComponent />,
  },
  {
    path: "user/payment-details",
    element: <AllProjectsComponent />,
  },
]);

export { router };
