import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export const loadCampaignsList = createAsyncThunk(
	"get/admin/campaigns",
	async(filters) => {
		const response = await api.get('/project/all-admin-projects', {
			params: filters
		});
		return response.data.payload.projects;
	}
)

export const loadCampaignDetails = createAsyncThunk(
	"get/admin/campaign",
	async(id) => {
		const response = await api.get('/project/details-admin/'+id);
		return response.data.payload;
	}
)

export const loadCampaignDonations = createAsyncThunk(
  "get/admin/campaign-donations",
  async({id, filters}) => {
    const params = {
      page: filters.page,
      sort: filters.sort,
      order: filters.order,
      search: filters.search,
      limit: process.env.REACT_APP_PAGINATION_PER_PAGE,
    }
    if(filters.period) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let crntWeekStart;
      switch(filters.period) {
        case 'today':
          params.startDate = today.toISOString();
          params.endDate = now.toISOString();
          break;
        case 'lastday':
          params.startDate = new Date(today.getTime()-24*60*60*1000).toISOString();
          params.endDate = today.toISOString();
          break;
        case 'thisweek':
          params.startDate = new Date(today.getTime()-today.getDay()*24*60*60*1000).toISOString();
          params.endDate = now.toISOString();
          break;
        case 'lastweek':
          let crntWeekStart = today.getTime()-today.getDay()*24*60*60*1000;
          params.endDate = new Date(crntWeekStart).toISOString()
          params.startDate = new Date(crntWeekStart-7*24*60*60*1000).toISOString();
          break;
      }
    }
    if(filters.amount) {
      switch(filters.amount) {
        case '0-50':
          params.startAmount = 0;
          params.endAmount = 50;
          break;
        case '50-100':
          params.startAmount = 50;
          params.endAmount = 100;
          break;
        case '100-200':
          params.startAmount = 100;
          params.endAmount = 200;
          break;
        case '200-':
          params.startAmount = 200;
          params.endAmount = '';
          break;
      }
    }
    const response = await api.get('/project/campaign-donations/'+id, {params})
    return response.data.payload.donations;
  }
)

export const saveCampaign = createAsyncThunk(
	"save/admin/campaign",
	async({id, body}, thunkApi) => {
    await api.patch(
      '/project/'+id, body, {
        headers: {'Content-Type': 'multipart/form-data'},
      },
    );
    thunkApi.dispatch(loadCampaignDetails(id));
	}
)

export const addCampaign = createAsyncThunk(
	"add/admin/campaign",
	async(body) => {
    await api.post('/project/', body, {headers: {'Content-Type': 'multipart/form-data'}});
	}
)

export const loadCategories = createAsyncThunk(
  'get/admin/campaign-categories',
  async() => {
    const response = await api.get('/project/category')
    return response.data.payload;
  }
)

export const addCampaignUpdate = createAsyncThunk(
  'add/campaign/update',
  async({campaignId, body}, thunkApi) => {
    await api.post(
      '/project/add-post/'+campaignId,
      body,
      {headers: { 'Content-Type': 'multipart/form-data' }},
    );
    await thunkApi.dispatch(loadCampaignDetails(campaignId))
  }
)

export const deleteCampaignUpdate = createAsyncThunk(
  'edit/campaign/delete',
  async(postId, thunkApi) => {
    await api.delete('/project/delete-post/'+postId);
    await thunkApi.dispatch(loadCampaignDetails(thunkApi.getState().adminCampaigns.details.id))
  }
)

export const editCampaignUpdate = createAsyncThunk(
  'edit/campaign/update',
  async({updateId, body}, thunkApi) => {
    await api.post(
      '/project/update-post/'+updateId,
      body,
      {headers: { 'Content-Type': 'multipart/form-data' }},
    );
    await thunkApi.dispatch(loadCampaignDetails(thunkApi.getState().adminCampaigns.details.id))
  }
)
