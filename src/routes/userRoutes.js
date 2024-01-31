import React from "react";
import { Route, Navigate } from "react-router-dom";
import { AllProjectsComponent } from "../pages/Projects";
import { AdminloginComponent } from "../pages/Admin/Authentication/Login";
import { AdminResetPasswordComponent } from "../pages/Admin/Authentication/ResetPassword";
import { LayoutComponent } from "../pages/Admin/Dashboard/Layout/Layout";
import { RecurringDonation } from "../pages/MyDonations/RecurringDonation";
import { OneTimeDonations } from "../pages/MyDonations/OneTimeDonation";
import { PaymentDetailsComponent } from "../pages/User/PaymentDetails";
import { PaymentDetailsListingComponent } from "../pages/User/PaymentDetails/listing/listing";

import { GetInTouchComponent } from "../pages/ContactAndComplaints/GetInTouch";
import { Profile } from "../pages/Authentication/Profile";

import { OurPoliciesComponent } from "../pages/AboutUs/OurPolicies";
import { WhoWeAreComponent } from "../pages/AboutUs/WhoWeAre";
import { TermsAndConditionsComponent } from "../pages/TermsAndConditions";
import { PrivacyPolicyComponent } from "../pages/PrivacyPolicy";
import { NewsDetailsComponent } from "../features/news/NewsDetails";
import { Users } from "../pages/Admin/Dashboard/Pages/Users";
import { QuickDonationProvider } from "../features/quickDonation";
import { MediaDetails } from "../pages/Media/MediaDetails";
import { VolunteerWithUs } from "../pages/Volunteer";
import { TechnicalSupport } from "../pages/TechnicalSupport";
import { ErrorPage } from "../pages/404";
import { Layout } from "../Layout";
import { HomepageSettings } from "../pages/Admin/Dashboard/Pages/HomepageSettings";
import { retrieveUserInfo } from "../utils/helper";

const Unauthorized = React.lazy(() => import("../pages/Unauthorized"));
const Checkout = React.lazy(() => import("../pages/Payment/Checkout"));
const AddUser = React.lazy(() =>
  import("../pages/Admin/Dashboard/Pages/Users/Common/Adduser")
);
const EditUser = React.lazy(() =>
  import("../pages/Admin/Dashboard/Pages/Users/Common/EditUser")
);
const AddTag = React.lazy(() =>
  import("../pages/Admin/Dashboard/Pages/Blog/Common/AddTag")
);
const ProjectDetails = React.lazy(() =>
  import("../pages/Projects/ProjectDetails")
);

const VerifyResetPassword = React.lazy(() =>
  import("../pages/Authentication/ResetPassword/verifyResetPassword")
);
const ResetNewPassword = React.lazy(() =>
  import("../pages/Authentication/ResetPassword/resetNewPassword")
);
const VerifyUser = React.lazy(() =>
  import("../pages/Authentication/VerifyUser")
);
const ResetPassword = React.lazy(() =>
  import("../pages/Authentication/ResetPassword")
);

const FinancialReports = React.lazy(() => import("../pages/FinancialReports"));
const Login = React.lazy(() => import("../pages/Authentication/Login"));
const Signup = React.lazy(() => import("../pages/Authentication/Signup"));
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

const isUserLoggedIn = () => {
  const { token, role } = retrieveUserInfo();
  return token && role === "ADMIN"; // Replace with your actual authentication check
};

export const userRoutes = [
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
        path: "/project/:slug",
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
        path: "impact-story/:slug",
        element: <ImpactStoryDetails />,
      },
      {
        path: "news",
        element: <NewsComponent />,
      },
      {
        path: "news/details/:slug",
        element: <NewsDetailsComponent />,
      },
      {
        path: "financial-reports",
        element: <FinancialReports />,
      },
      {
        path: "media",
        element: <Media />,
      },
      {
        path: "media/details/:slug",
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

  {
    path: "user/payment-details/listing",
    element: <PaymentDetailsListingComponent />,
  },

  // ADMIN PANEL
  {
    path: "admin/login",
    element: isUserLoggedIn() ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <AdminloginComponent />
    ),
  },
  {
    path: "admin/authentication/reset-password",
    element: <AdminResetPasswordComponent />,
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
];
