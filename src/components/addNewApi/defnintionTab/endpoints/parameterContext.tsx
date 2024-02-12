/*import { createContext, useContext } from "react";

export const ParamatersContext = createContext<any>(undefined);

export function useParamatersContext() {
  const Paramaters = useContext(ParamatersContext);

  if (Paramaters === undefined) {
    throw new Error(
      "useParamatersContext must be used with a DashboardContext"
    );
  }

  return Paramaters;
}
*/
import React, { createContext, useContext, useState } from "react";

export const FormContext = createContext<undefined | any>(undefined);

export const useFormContext = () => {
  return useContext(FormContext);
};
