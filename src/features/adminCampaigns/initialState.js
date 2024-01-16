const initialState = {
	list: {
		filters: {search: '', status: 'ACTIVE', page: 1},
		loading: false,
		error: null,
		rows: [],
		count: null
	},

	details: {
		project: null,
		id: null,
		loading: true,
    saving: false,
		error: null,
	},

  add: {
    loading: false,
    saving: false,
    categories: null,
  },

  donations: {
    campaignId: null,
    filters: {search: '', period: '', amount: '', page: 1, sort: '', order: ''},
		loading: false,
		error: null,
		rows: [],
		count: null
  },

  update: {
    open: false,
    id: null,
    campaignId: null,
    details: null,
    saving: false,
  },

  modal: {
    display: false,
    title: '',
    text: '',
    cancelText: '',
    onCancel: null,
    successText: '',
    onSuccess: null,
  },
}

export default initialState;
