import { SETC_ID, SETL_ID, SETJ_ID, SETA_ID, FILE_CASE } from "./Action";

const initialState = {
  clientId: 22,
  lawyerId: false,
  judgeId: false,
  adminId: false,
  details: {
    client_id: 1,
    court_id: "",
    case_title: "",
    case_desc: "",
    case_type: "",
    def_client_name: "",
    def_client_email: "",
  },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETC_ID:
      return { ...state, clientId: action.id };
    case SETL_ID:
      return { ...state, lawyerId: action.id };
    case SETJ_ID:
      return { ...state, judgeId: action.id };
    case SETA_ID:
      return { ...state, adminId: action.id };
    case FILE_CASE:
      return {
        ...state,
        details: action.details,
      };
    default:
      return state;
  }
};

export default Reducer;
