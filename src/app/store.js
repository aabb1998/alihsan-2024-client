import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import profileReducer from "../features/authentication/authenticationSlice";
import projectsReducer from "../features/projects/projectSlice";
import projectDetailReducer from "../features/projectDetails/projectDetailSlice";
import basketItemReducer from "../features/basket/basketSlice";
import quickDonationReducer from "../features/quickDonation/quickDonationSlice";
import myDonationsReducer from "../features/myDonation/myDonationSlice";
import homeReducer from "../features/home/homeSlice";
import impactStoriesReducer from "../features/impactStories/impactStories";
import newsReducer from "../features/news/news";
import finantialReportsReducer from "../features/financialReports/financialReports";
import mediasReducer from "../features/media/mediaSlice";
import paymentDetailsReducer from "../features/paymentDetails/paymentDetailsSlice";
import ourWorksReducer from "../features/fundraise/Fundraise";
import zakatCalculatorReducer from "../features/zakat/slice";
// admin slice
import adminDashboardSlice from "../features/adminDashboard/adminDashboardSlice";
import adminStoriesSlice from "../features/adminStories/adminStoriesSlice";
import adminBlogSlice from "../features/adminBlog/adminBlogSlice";
import adminFormSlice from "../features/adminForms/adminFormSlice";
import adminMediaSlice from "../features/adminMedia/adminMediaSlice";
import adminNewsletterSubscribers from "../features/adminNewsletterSubscribers/adminNewsletterSubscribersSlice";
import adminFinancialReportSlice from "../features/adminFinacialReport/adminFinacialReportSlice";
import adminOurWorksSlice from "../features/adminOurWorks/adminOurWorksSlice";
import adminCampaignsReducer from "../features/adminCampaigns";
import adminDonationReducer from "../features/adminDonations/adminDonationSlice";
import adminTagsReducer from "../features/adminTag/adminTagSlice";
import adminHomeContentSlice from "../features/adminHomeContent/adminHomeContentSlice"
import adminCountrySlice from "../features/adminCountry/adminCountrySlice"
import adminSettingsReducer from "../features/adminSettings";
import adminUsersReducer from '../features/adminUsers';
import adminCustomersReducer from '../features/adminCustomers';
import adminCampaignCategoriesReducer from '../features/adminCampaignCategories';
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
    homeContent:adminHomeContentSlice,
    adminCountries:adminCountrySlice,
    adminSettings: adminSettingsReducer,
		adminUsers: adminUsersReducer,
		adminCustomers: adminCustomersReducer,
		adminCampaignCategories: adminCampaignCategoriesReducer,
  },
});
