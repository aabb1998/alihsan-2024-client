import React, { useEffect } from "react";
import { QuickDonationProvider } from "../features/quickDonation";
import HomeComponent from "../pages/Home";
import EmergencyRedirect from "../components/EmergencyRedirect";

const AllProjectsComponent = React.lazy(() => import("../pages/Projects"));
const AdminloginComponent = React.lazy(() =>
  import("../pages/Admin/Authentication/Login")
);
const AdminResetPasswordComponent = React.lazy(() =>
  import("../pages/Admin/Authentication/ResetPassword")
);
const RecurringDonation = React.lazy(() =>
  import("../pages/MyDonations/RecurringDonation")
);
const OneTimeDonations = React.lazy(() =>
  import("../pages/MyDonations/OneTimeDonation")
);
const PaymentDetailsComponent = React.lazy(() =>
  import("../pages/User/PaymentDetails")
);
const PaymentDetailsListingComponent = React.lazy(() =>
  import("../pages/User/PaymentDetails/listing/listing")
);
const Profile = React.lazy(() => import("../pages/Authentication/Profile"));
const OurPoliciesComponent = React.lazy(() =>
  import("../pages/AboutUs/OurPolicies")
);
const WhoWeAreComponent = React.lazy(() => import("../pages/AboutUs/WhoWeAre"));
const TermsAndConditionsComponent = React.lazy(() =>
  import("../pages/TermsAndConditions")
);
const PrivacyPolicyComponent = React.lazy(() =>
  import("../pages/PrivacyPolicy")
);
const NewsDetailsComponent = React.lazy(() =>
  import("../features/news/NewsDetails")
);
const MediaDetails = React.lazy(() => import("../pages/Media/MediaDetails"));
const VolunteerWithUs = React.lazy(() => import("../pages/Volunteer"));
const TechnicalSupport = React.lazy(() => import("../pages/TechnicalSupport"));
const ErrorPage = React.lazy(() => import("../pages/404"));

const Layout = React.lazy(() => import("../Layout"));
const NonAuthentication = React.lazy(() =>
  import("../components/NonAuthentication")
);
const Authentication = React.lazy(() => import("../components/Authentication"));

const ProjectDetails = React.lazy(() =>
  import("../pages/Projects/ProjectDetails")
);
const NotFound = React.lazy(() => import("../pages/NotFound"));
const ComplaintHandlingComponent = React.lazy(() =>
  import("../pages/PrivacyPolicy/ComplaintHandling")
);
const WhistleblowerComponent = React.lazy(() =>
  import("../pages/PrivacyPolicy/WhistleblowerPolicy")
);

const GetInTouchComponent = React.lazy(() =>
  import("../pages/ContactAndComplaints/GetInTouch")
);
const Unauthorized = React.lazy(() => import("../pages/Unauthorized"));
const Checkout = React.lazy(() => import("../pages/Payment/Checkout"));

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
const ImpactStoryDetails = React.lazy(() =>
  import("../pages/ImpactStories/ImpactStoryDetails")
);

const Loader = () => (
  <div className="flex items-center justify-center h-screen mx-8 text-center">
    {/* <GlobalLoader /> */}
  </div>
);

export const userRoutes = [
  {
    path: "/login",
    element: (
      <NonAuthentication isAdmin={false}>
        <Login />
      </NonAuthentication>
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
          // <React.Suspense fallback={<Loader />}>
          <HomeComponent />
          // </React.Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Authentication allowedUserTypes={["USER"]}>
            <Profile />
          </Authentication>
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
        path: "volunteer",
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
      {
        path: "privacy-policy/complaint-handling",
        element: <ComplaintHandlingComponent />,
      },
      {
        path: "privacy-policy/whistleblower-policy",
        element: <WhistleblowerComponent />,
      },

      {
        path: "emergency",
        element: <EmergencyRedirect />,
      },
      {
        path: "winter-appeal",
        element: <EmergencyRedirect />,
      },
    ],
  },

  {
    path: "user/payment-details/listing",
    element: <PaymentDetailsListingComponent />,
  },
  {
    path: "admin/login",
    element: (
      <NonAuthentication isAdmin>
        <AdminloginComponent />
      </NonAuthentication>
    ),
  },
  {
    path: "admin/authentication/reset-password",
    element: (
      <NonAuthentication isAdmin>
        <AdminResetPasswordComponent />
      </NonAuthentication>
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
      <NonAuthentication isAdmin={false}>
        <Signup />
      </NonAuthentication>
    ),
  },
  {
    path: "/verifyuser/:token",
    element: (
      <NonAuthentication isAdmin={false}>
        <VerifyUser />
      </NonAuthentication>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <NonAuthentication isAdmin={false}>
        <ResetPassword />
      </NonAuthentication>
    ),
  },
  {
    path: "/verify-reset-password/:token",
    element: (
      <NonAuthentication isAdmin={false}>
        <VerifyResetPassword />
      </NonAuthentication>
    ),
  },
  {
    path: "/reset-new-password/:token",
    element: (
      <NonAuthentication isAdmin={false}>
        <ResetNewPassword />
      </NonAuthentication>
    ),
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
];
