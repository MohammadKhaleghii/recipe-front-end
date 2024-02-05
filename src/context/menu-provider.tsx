import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface MenuContextInterface {
  isMobileMenuOpen: boolean;
  isMobileFilterMenuOpen: boolean;
  setIsMobileFilterMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const MenuContext = createContext<MenuContextInterface>({
  isMobileMenuOpen: false,
  isMobileFilterMenuOpen: false,
  setIsMobileFilterMenuOpen: () => {},
  setIsMobileMenuOpen: () => {},
});

const MenuProvider = ({children}: {children: ReactNode}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] =
    useState<boolean>(false);

  return (
    <MenuContext.Provider
      value={{
        isMobileMenuOpen,
        isMobileFilterMenuOpen,
        setIsMobileMenuOpen,
        setIsMobileFilterMenuOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
export default MenuProvider;
