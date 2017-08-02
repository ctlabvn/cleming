export const getSelectedRevenueItem = state => state.revenue.selectedItem || {error: 'revenue item is null'}

export const getRevenueData = state => state.revenue.revenueData || {error: 'revenue is null'}

export const getDetail = state => state.revenue.detail || {error: 'revenue detail is null'}