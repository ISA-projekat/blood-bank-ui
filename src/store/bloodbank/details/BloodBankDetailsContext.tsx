import React, { useContext, useEffect, useReducer } from "react";
import { actions } from "../BloodBankActions";
import * as bloodBankService from "../../../services/BloodBankService";
import { BloodBank, IBloodBankDetailsContext } from "./Types";
import reducer from "./BloodBankDetailsReducer";

const initialState = {
  bloodBank: null,
};

type Props = {
  id: number;
  children: any;
};

export const BloodBankDetailsContext =
  React.createContext<IBloodBankDetailsContext>(initialState);

const BloodBankDetailsContextProvider = ({ id, children }: Props) => {
  const [bloodBankState, dispatch] = useReducer(reducer, initialState);

  const findBloodBank = async () =>
    bloodBankService
      .getBloodBank(id)
      .then((resp) =>
        dispatch({ type: actions.SET_BLOOD_BANK, payload: resp.data })
      );

  const updateBloodBank = async (bloodBank: BloodBank) =>
    bloodBankService.updateBloodBank(bloodBank);

  useEffect(() => {
    findBloodBank?.();
  }, [id]);

  return (
    <BloodBankDetailsContext.Provider
      value={{
        ...bloodBankState,
        updateBloodBank,
      }}
    >
      {children}
    </BloodBankDetailsContext.Provider>
  );
};

export default BloodBankDetailsContextProvider;

export const useBookDetailsContext = () => useContext(BloodBankDetailsContext);
