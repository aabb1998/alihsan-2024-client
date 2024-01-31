import { createSlice } from "@reduxjs/toolkit";
import initialState from './initialState'

import {
  loadCampaignsList,
  loadCampaignDetails,
  loadCampaignDonations,
  saveCampaign,
  addCampaign,
  addCampaignUpdate,
  editCampaignUpdate,
	loadCampaignFormData,
} from './actions'


const slice = createSlice({
	name: "adminCampaigns",
	initialState,
  reducers: {
    openModal (state, action) {
      state.modal = {
        display: true,
        title: action.payload.title,
        text: action.payload.text,
        successText: action.payload.success[0],
        onSuccess: action.payload.success[1],
        cancelText: action.payload.cancel[0],
        onCancel: action.payload.cancel[1],
      }
    },
    closeModal (state, action) {
      state.modal = {
        display: false,
        title: '',
        text: '',
        cancelText: '',
        onCancel: null,
        successText: '',
        onSuccess: null,
      };
    },
    openEditUpdateModal (state, action) {
      state.update.id = action.payload.updateId;
      state.update.campaignId = action.payload.campaignId;
      state.update.details = action.payload.details;
      state.update.open = true;
    },
    openAddUpdateModal (state, action) {
      state.update.campaignId = action.payload.campaignId;
      state.update.open = true;
    },
    closeUpdateModal (state, action) {
      if(!state.update.saving) {
        state.update.id = null;
        state.update.campaignId = null;
        state.update.details = null;
        state.update.open = false;
      }
    }
  },
	extraReducers (builder) {
		builder.addCase(loadCampaignsList.pending, (state, action) => {
			state.list.loading = true;
			state.list.filters = action.meta.arg;
		}).addCase(loadCampaignsList.fulfilled, (state, action) => {
			state.list.loading = false;
			state.list.rows = action.payload.rows;
			state.list.count = action.payload.count;
			state.list.error = null;
		}).addCase(loadCampaignsList.rejected, (state, action) => {
			state.list.loading = false;
			state.list.error = action.error.response?.data?.message
				|| action.error.message
		})


    builder.addCase(loadCampaignDetails.pending, (state, action) => {
			state.details.loading = true;
      state.details.id = action.meta.arg;
		}).addCase(loadCampaignDetails.fulfilled, (state, action) => {
			state.details.loading = false;
			state.details.project = {
        ...action.payload.campaign,
        totals: {
          totalOrders: action.payload.totalOrders,
          totalDonors: action.payload.totalDonors,
          totalOrderAmount: action.payload.totalOrderAmount,
        },
        haveDonations: action.payload.haveDonations,
      }
      state.details.id = action.payload.campaign.id;
			state.details.error = null;
		}).addCase(loadCampaignDetails.rejected, (state, action) => {
			state.details.loading = false;
      state.details.error = action.error.code==='ERR_BAD_REQUEST' ? 'NotFound' : action.error.message;
    })


    builder.addCase(loadCampaignDonations.pending, (state, action) => {
			state.donations.loading = true;
			state.donations.filters = action.meta.arg.filters;
      state.donations.id = action.meta.arg.id;
		}).addCase(loadCampaignDonations.fulfilled, (state, action) => {
			state.donations.loading = false;
			state.donations.rows = action.payload.rows;
			state.donations.count = action.payload.count;
			state.donations.error = null;
      state.donations.id = action.payload.id;
		}).addCase(loadCampaignDonations.rejected, (state, action) => {
			state.donations.loading = false;
			state.donations.error = action.error.response?.data?.message
				|| action.error.message
    })


    builder.addCase(saveCampaign.pending, (state, action) => {
      state.details.saving = true;
      state.details.error = null;
    }).addCase(saveCampaign.fulfilled, (state, action) => {
      state.details.saving = false;
    }).addCase(saveCampaign.rejected, (state, action) => {
      state.details.saving = false;
      state.details.error = action.error.message;
    })


    builder.addCase(loadCampaignFormData.pending, (state, action) => {
      state.add.loading = true;
    }).addCase(loadCampaignFormData.fulfilled, (state, action) => {
      state.add.categories = action.payload;
      state.add.loading = false;
    }).addCase(loadCampaignFormData.rejected, (state, action) => {
      state.add.loading = false;
      state.add.categories = [];
      state.add.organisers = [];
    })


    builder.addCase(addCampaign.pending, (state, action) => {
      state.add.saving = true;
    }).addCase(addCampaign.fulfilled, (state, action) => {
      state.add.saving = false;
    }).addCase(addCampaign.rejected, (state, action) => {
      state.add.saving = false;
    })

    builder.addCase(addCampaignUpdate.pending, (state, action) => {
      state.update.saving = true;
    }).addCase(addCampaignUpdate.fulfilled, (state, action) => {
      state.update.open = false;
      state.update.saving = false;
      state.campaignId = null;
    }).addCase(addCampaignUpdate.rejected, (state, action) => {
      state.update.saving = false;
    })


    builder.addCase(editCampaignUpdate.pending, (state, action) => {
      state.update.saving = true;
    }).addCase(editCampaignUpdate.fulfilled, (state, action) => {
      state.update.saving = false;
      state.update.open = false;
      state.update.id = null;
      state.update.campaignId = null;
      state.update.details = null;
    }).addCase(editCampaignUpdate.rejected, (state, action) => {
      state.update.saving = false;
    })
	},
})

export default slice;
export const { openEditUpdateModal, openAddUpdateModal, closeUpdateModal, openModal, closeModal } = slice.actions;
