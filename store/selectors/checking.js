export const getCheckingData = state => state.checking.data || {error: 'checking is null'}
export const getCheckingDateFilterCurrentSelectValue = state => state.checking.dateFilterCurrentSelectValue