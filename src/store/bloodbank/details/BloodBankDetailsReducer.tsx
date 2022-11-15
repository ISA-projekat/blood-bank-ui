import { actions } from "../BloodBankActions";
import { IBloodBankDetailsContext } from "./Types";

const reducer = (state: IBloodBankDetailsContext, action: any) => {
  switch (action.type) {
    case actions.SET_BLOOD_BANK:
      return {
        ...state,
        bloodBank: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
