import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import profileReducer from "./authentication/authenticationSlice";
import projectsReducer from "./projects/projectSlice";
import projectDetailReducer from "./projectDetails/projectDetailSlice";
import basketItemReducer from "./basket/basketSlice";
import quickDonationReducer from "./quickDonation/quickDonationSlice";
import myDonationsReducer from "./myDonation/myDonationSlice";
import homeReducer from "./home/homeSlice";
import impactStoriesReducer from "./impactStories/impactStories";
import newsReducer from "./news/news";
import finantialReportsReducer from "./financialReports/financialReports";
import mediasReducer from "./media/mediaSlice";
import paymentDetailsReducer from "./paymentDetails/paymentDetailsSlice";
import ourWorksReducer from "./fundraise/Fundraise";
import zakatCalculatorReducer from "./zakat/slice";
// admin slice
import adminDashboardSlice from "./adminDashboard/adminDashboardSlice";
import adminStoriesSlice from "./adminStories/adminStoriesSlice";
import adminBlogSlice from "./adminBlog/adminBlogSlice";
import adminFormSlice from "./adminForms/adminFormSlice";
import adminMediaSlice from "./adminMedia/adminMediaSlice";
import adminNewsletterSubscribers from "./adminNewsletterSubscribers/adminNewsletterSubscribersSlice";
import adminFinancialReportSlice from "./adminFinacialReport/adminFinacialReportSlice";
import adminOurWorksSlice from "./adminOurWorks/adminOurWorksSlice";
import adminCampaignsReducer from "./adminCampaigns";
import adminDonationReducer from "./adminDonations/adminDonationSlice";
import adminTagsReducer from "./adminTag/adminTagSlice";
import adminHomeContentSlice from "./adminHomeContent/adminHomeContentSlice";
import adminCountrySlice from "./adminCountry/adminCountrySlice";
import adminSettingsReducer from "./adminSettings";
import adminUsersReducer from "./adminUsers";
import adminCustomersReducer from "./adminCustomers";
import adminCampaignCategoriesReducer from "./adminCampaignCategories";
// adminDonationSlice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    projects: projectsReducer,
    project: projectDetailReducer,
    basketItem: basketItemReducer,
    quickDonations: quickDonationReducer,
    myDonations: myDonationsReducer,
    mapCountries: homeReducer,
    impactStories: impactStoriesReducer,
    news: newsReducer,
    finantialReports: finantialReportsReducer,
    medias: mediasReducer,
    paymentDetails: paymentDetailsReducer,
    zakatCalculator: zakatCalculatorReducer,
    ourWorks: ourWorksReducer,
    adminDashboard: adminDashboardSlice,
    adminStories: adminStoriesSlice,
    adminBlog: adminBlogSlice,
    adminForm: adminFormSlice,
    adminMedia: adminMediaSlice,
    adminNewsletterSubscribers: adminNewsletterSubscribers,
    adminFinancialReport: adminFinancialReportSlice,
    adminOurWorks: adminOurWorksSlice,
    adminCampaigns: adminCampaignsReducer,
    adminDonations: adminDonationReducer,
    adminTags: adminTagsReducer,
    settings: homeReducer,
    homeContent: adminHomeContentSlice,
    adminCountries: adminCountrySlice,
    adminSettings: adminSettingsReducer,
    adminUsers: adminUsersReducer,
    adminCustomers: adminCustomersReducer,
    adminCampaignCategories: adminCampaignCategoriesReducer,
  },
});
