import axiosInstance from '@/Utils/axios'
import { ReportsApiUrl } from '@/configs/apiUrlConstant'
import { createSlice, Dispatch } from '@reduxjs/toolkit'

// -------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  callReports: [],
  allCall: [],
  CallFilterData: [],
  callReportsData: [],
  total: 0,
  customerscallLogs: [],
  liveCalls: [],
  status: true
}

const slice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
      state.callReports = []
    },

    // GET FLAGS
    getCallsReportsSuccess(state, action) {
      state.isLoading = false
      state.callReports = action.payload.data || []
      state.total = action.payload.totalItems || 0
      state.allCall = action.payload.all_records || []
      state.CallFilterData = action.payload.FilterData || []
      state.error = null
    },
    getCallsReportsSatasticsSuccess(state, action) {
      state.isLoading = false
      state.callReportsData = action.payload.data || []
      state.error = null
    },
    getCustomersCallLogsSuccess(state, action) {
      state.isLoading = false
      state.customerscallLogs = action.payload.data || []
      state.error = null
    },
    getLiveCallsSuccess(state, action) {
      state.isLoading = false
      state.liveCalls = action.payload.data || []
      state.error = null
    }
  }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function getCallReports(params: any = {}) {
  if (![undefined, null, ''].includes(params?.page)) {
    params['page'] = params?.page + 1
  }

  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axiosInstance.post(ReportsApiUrl.call.callReports, params)
      dispatch(slice.actions.getCallsReportsSuccess(response.data))

      return response.data
    } catch (error) {
      dispatch(slice.actions.hasError(error))

      return error
    }
  }
}

export function getCallReportsSatastics(params: any = {}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axiosInstance.post('/ad-id/calls/call_reports', params)
      dispatch(slice.actions.getCallsReportsSatasticsSuccess(response.data))

      return response.data
    } catch (error) {
      dispatch(slice.actions.hasError(error))

      return error
    }
  }
}

export function getCustomersCallLogs(params: any = {}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axiosInstance.post('/ad-id/calls/customers_call_logs', params)
      dispatch(slice.actions.getCustomersCallLogsSuccess(response.data))

      return response.data
    } catch (error) {
      dispatch(slice.actions.hasError(error))

      return error
    }
  }
}

export function GetLiveCalls(params: any = {}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())

    try {
      const response = await axiosInstance.post('ad-id/calls/live_calls', params)
      dispatch(slice.actions.getLiveCallsSuccess(response.data))

      return response.data
    } catch (error) {
      return error
    }
  }
}

export function LiveCallHangup(uuid: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await axiosInstance.post('ad-id/calls/live_call_hangup', { uuid: uuid })

      return response.data
    } catch (error) {
      return error
    }
  }
}

export function ListenLiveCall(parems: any) {
  return async () => {
    try {
      const response = await axiosInstance.post('ad-id/calls/listen_live_call', parems)

      return response.data
    } catch (error) {
      return error
    }
  }
}
