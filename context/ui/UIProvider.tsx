import { useReducer } from "react";
import { UiContext, UIReducer } from "./";

export interface UIState {
  isMenuOpen: boolean;
  search: string;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
  search: "",
};

export const UIProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const toggleMenu = () => {
    dispatch({
      type: "[UI] - toggleMenu",
    });
  };
  const setSearch = (value: string) => {
    dispatch({
      type: "[UI] - setSearch",
      payload: value,
    });
  };
  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleMenu,
        setSearch,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
