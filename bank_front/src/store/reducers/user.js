import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: {
    createdAt: null,
    date_registration: null,
    email: null,
    id: null,
    last_failed_logged: null,
    last_present_logged: null,
    last_successful_logged: null,
    login: null,
    name: null,
    password: null,
    surname: null,
    updatedAt: null,
  },
  bill: {
    account_bill: null,
    available_funds: 0.0,
    createdAt: null,
    id: null,
    id_owner: null,
    updatedAt: null,
  },
  transactions:[],
  transactionsLoaded:false,
  error:null,
  loading: false,
};

const homePageStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const gettingUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    bill: action.bill,
    error: null,
    loading: false,
  };
};

const logoutUserInfo = (state,action)=>{
  return{
    ...state,
    user: {
      createdAt: null,
      date_registration: null,
      email: null,
      id: null,
      last_failed_logged: null,
      last_present_logged: null,
      last_successful_logged: null,
      login: null,
      name: null,
      password: null,
      surname: null,
      updatedAt: null,
    },
    bill: {
      account_bill: null,
      available_funds: 0.0,
      createdAt: null,
      id: null,
      id_owner: null,
      updatedAt: null,
    },
    error:null,
    loading: false,
  }
}



const gettingTransactionsStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const gettingTransactionsSuccess = (state,action)=>{
  return{
    ...state,
    transactions:action.transactions,
    loading:false,
    transactionsLoaded:true
  }
};

const gettinTransactionFailed = (state,action)=>{
  return{
    ...state,
    loading:false,
    transactionsLoaded:true,
    error:action.error
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_USERINFO_START:
      return homePageStart(state, action);
    case actionTypes.GETTING_USER_SUCCESS:
      return gettingUserSuccess(state,action);
    case actionTypes.LOGOUT_USER_INFO:
      return logoutUserInfo(state,action);
    case actionTypes.GETTING_TRANSACTIONS_START:
      return gettingTransactionsStart(state,action);
    case actionTypes.GETTING_TRANSACTIONS_SUCCESS:
      return gettingTransactionsSuccess(state,action);
    case actionTypes.GETTING_TRANSACTIONS_FAILED:
      return gettinTransactionFailed(state,action);
    default:
      return state;
  }
};

export default reducer;
