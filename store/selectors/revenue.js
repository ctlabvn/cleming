export const getSelectedRevenueItem = state => state.revenue.selectedItem || {error: 'revenue item is null'}

export const getListRevenueProcessing = state => state.revenue.listProcessing || {error: 'revenue list processing is null'}

export const getListRevenueDone = state => state.revenue.listDone || {error: 'revenue list done is null'}

export const getListRevenue = state => state.revenue.list || {error: 'revenue list is null'}

export const getRevenueData = state => state.revenue.revenueData || {error: 'revenue is null'}

export const getDetail = state => state.revenue.detail || {error: 'revenue detail is null'}