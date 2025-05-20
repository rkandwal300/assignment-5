export const ACTIONS = {
  ADD_ROW: "add_row",
  SET_LIMIT: "set_limit",
  SET_TOTAL: "set_total",
  UPDATE_DATA: "update data",
  UPDATE_QUERY: "update_query",
  TOGGLE_LOADING: "toggle_loading",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ROW:
      return {
        ...state,
        data: [
          {
            id: String(state.total + 1),
            data: {
              currentPlatform: action.payload,
              recommendations: [],
            },
          },
          ...state.data,
        ],
        total: state.total + 1,
      };
    case ACTIONS.UPDATE_DATA:
      return {
        ...state,
        // data: [...state.data, ...action.payload],
        data: [...action.payload],
      };
    case ACTIONS.UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case ACTIONS.SET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case ACTIONS.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };
    default:
      return state;
  }
}
