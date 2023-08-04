"use client";

import { PropsWithChildren, createContext, useState } from "react";
import React from "react";

export const UpdateContext = createContext({
  update: false,
  setUpdate: (update: boolean) => {},
});

const UpdateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [update, setUpdate] = useState(false);
  return (
    <UpdateContext.Provider value={{ update, setUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};

export default UpdateProvider;
