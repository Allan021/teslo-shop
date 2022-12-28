import { UIState } from "./";

type UIActionType =
  | { type: "[UI] - toggleMenu" }
  | { type: "[UI] - setSearch"; payload: string };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "[UI] - toggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case "[UI] - setSearch":
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
