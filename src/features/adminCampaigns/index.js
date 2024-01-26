import slice, { closeUpdateModal, openEditUpdateModal, openAddUpdateModal, openModal, closeModal } from './slice'
import {
  loadCampaignsList,
  loadCampaignDetails,
  loadCampaignDonations,
  saveCampaign,
  addCampaign,
  loadCampaignFormData,
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
  loadCampaignFormData,
  openModal,
  closeModal,
}
