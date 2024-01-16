import slice, { closeUpdateModal, openEditUpdateModal, openAddUpdateModal, openModal, closeModal } from './slice'
import {
  loadCampaignsList,
  loadCampaignDetails,
  loadCampaignDonations,
  saveCampaign,
  addCampaign,
  loadCategories,
  editCampaignUpdate,
  deleteCampaignUpdate,
  addCampaignUpdate,
} from './actions'

export default slice.reducer;
export {
  openEditUpdateModal,
  openAddUpdateModal,
  closeUpdateModal,
  loadCampaignsList,
  loadCampaignDetails,
  loadCampaignDonations,
  saveCampaign,
  addCampaign,
  editCampaignUpdate,
  addCampaignUpdate,
  deleteCampaignUpdate,
  loadCategories,
  openModal,
  closeModal,
}
