// Action Types
export const Types = {
  SET_CLIENTS: "clients/SET_CLIENTS",
  ADD_CLIENT: "clients/ADD_CLIENT",
  REMOVE_CLIENT: "clients/REMOVE_CLIENT",
  UPDATE_CLIENT: "clients/UPDATE_CLIENT",
  SET_SEARCH_TERM: "clients/SET_SEARCH_TERM",
  SET_FILTERED_LIST: "clients/SET_FILTERED_LIST",
};

const initialState = {
  clientList: [],
  filteredList: [],
  searchTerm: "",
  loading: false,
  error: null,
};

// Reducer
export default function clients(state = initialState, action) {
  switch (action.type) {
    case Types.SET_CLIENTS:
      return {
        ...state,
        clientList: action.payload,
        filteredList: action.payload,
      };

    case Types.ADD_CLIENT:
      return {
        ...state,
        clientList: [...state.clientList, action.payload],
        filteredList: [...state.filteredList, action.payload],
      };

    case Types.REMOVE_CLIENT:
      return {
        ...state,
        clientList: state.clientList.filter(
          (client) => client.id !== action.payload
        ),
        filteredList: state.filteredList.filter(
          (client) => client.id !== action.payload
        ),
      };

    case Types.UPDATE_CLIENT:
      return {
        ...state,
        clientList: state.clientList.map((client) =>
          client.id === action.payload.id ? action.payload : client
        ),
        filteredList: state.filteredList.map((client) =>
          client.id === action.payload.id ? action.payload : client
        ),
      };

    case Types.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case Types.SET_FILTERED_LIST:
      return {
        ...state,
        filteredList: action.payload === "" ? [] : state.filteredList,
      };

    default:
      return state;
  }
}

// Action Creators
export const Creators = {
  setClients: (clients) => ({
    type: Types.SET_CLIENTS,
    payload: clients,
  }),

  addClient: (client) => ({
    type: Types.ADD_CLIENT,
    payload: client,
  }),

  removeClient: (clientId) => ({
    type: Types.REMOVE_CLIENT,
    payload: clientId,
  }),

  updateClient: (client) => ({
    type: Types.UPDATE_CLIENT,
    payload: client,
  }),

  setSearchTerm: (term) => ({
    type: Types.SET_SEARCH_TERM,
    payload: term,
  }),

  setFilteredList: (list) => ({
    type: Types.SET_FILTERED_LIST,
    payload: list,
  }),
};
