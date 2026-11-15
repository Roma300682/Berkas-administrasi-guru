import React, { createContext, useContext } from 'react';

export interface DocActionContextValue {
  openDocEditor: (tab: string) => void;
  saveCustomDoc: (scopeKey: string, html: string) => void;
  resetCustomDoc: (scopeKey: string) => void;
}

const DocActionContext = createContext<DocActionContextValue>({
  openDocEditor: () => {},
  saveCustomDoc: () => {},
  resetCustomDoc: () => {},
});

export const DocActionProvider = DocActionContext.Provider;

export function useDocActions(): DocActionContextValue {
  return useContext(DocActionContext);
}
