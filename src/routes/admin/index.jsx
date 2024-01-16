import React from "react";
import Authentication from "../../components/Authentication";
import { Routes, Route } from "react-router-dom";
import AdminsDashboard from "../../pages/Admin/Dashboard";
import Loader from "../../components/Loader";
import { Navigate } from "react-router-dom";
import ImpactStories from "../../pages/Admin/ImpactStories";
import { UpdateStory } from "../../pages/Admin/ImpactStories/UpdateStories";
import { Blogs } from "../../pages/Admin/Blog";
import { UpdateBlog } from "../../pages/Admin/Blog/UpdateBlog";
import Forms from "../../pages/Admin/Forms";
import { Details } from "../../pages/Admin/Forms/Details";
import Media from "../../pages/Admin/Media";
import { VideoDetails } from "../../pages/Admin/Media/VideoDetails";
import { PostDetails } from "../../pages/Admin/Media/PostDetails";
import NewsletterSubscribers from "../../pages/Admin/NewsletterSubscribers";
import { FinancialReports } from "../../pages/Admin/FinancialReports";
import { UpdateFinancials } from "../../pages/Admin/FinancialReports/UpdateFinancials";
import { UpdateConstitution } from "../../pages/Admin/FinancialReports/UpdateConstitution";
import { OurWorks } from "../../pages/Admin/OurWorks";
import { UpdateOurWork } from "../../pages/Admin/OurWorks/UpdateOurWork";
import AdminCampaigns, {
  AdminCampaignDetails,
  AddAdminCampaign,
} from "../../pages/Admin/Campaigns";
import { View } from "../../pages/Admin/Media/View";

const AdminRouter = () => (
  <Routes>
    <Route
      path="dashboard"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <AdminsDashboard />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="impact-stories"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <ImpactStories />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="impact-story/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateStory />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="impact-story"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateStory />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="blog"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Blogs />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="edit-blog/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateBlog />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="add-blog"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateBlog />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="fundraisers"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Forms />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="fundraisers/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Details />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="sponsors"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Forms />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="sponsors/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Details />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="volunteers"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Forms />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="volunteers/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Details />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="contacts"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Forms />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="contacts/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Details />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="technical-support"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Forms />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="technical-support/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Details />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="complaints"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Forms />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="complaints/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Details />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="videos"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Media />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="posts"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <Media />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="videos-details"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <VideoDetails />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="videos-details/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <VideoDetails />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="posts-details"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <PostDetails />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="posts-details/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <PostDetails />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="video/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <View />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="post/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <View />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="newsletter-subscribers"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <NewsletterSubscribers />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="financial-reports"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <FinancialReports />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="constitution"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <FinancialReports />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="financial-report/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateFinancials />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="financial-report"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateFinancials />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="constitution/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateConstitution />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="constitution"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateConstitution />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="our-works"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <OurWorks />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="our-work"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateOurWork />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="our-work/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <UpdateOurWork />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="campaigns"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <AdminCampaigns />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="campaign/:id"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <AdminCampaignDetails />
          </React.Suspense>
        </Authentication>
      }
    />
    <Route
      path="campaigns/add"
      element={
        <Authentication allowedUserTypes={["ADMIN"]}>
          <React.Suspense fallback={<Loader />}>
            <AddAdminCampaign />
          </React.Suspense>
        </Authentication>
      }
    />
  </Routes>
);
export default AdminRouter;
