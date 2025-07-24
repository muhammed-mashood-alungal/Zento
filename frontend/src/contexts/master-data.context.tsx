import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Branch } from "../types/branch.types";
import { branchServices } from "../services/branches.service";
import { SnackbarUtils } from "../utils/snackbar.util";

type masterContextType = {
  branches: Branch[];
  setBranches: Dispatch<SetStateAction<Branch[]>>;
};
const masterDataContext = createContext<masterContextType | undefined>(
  undefined
);

interface MasterDataProviderProps {
  children: ReactNode;
}

export const MasterDataContextProvider: React.FC<MasterDataProviderProps> = ({
  children,
}) => {
  const [branches, setBranches] = useState<Branch[]>([]);

  const fetchBranches = async () => {
    try {
      const branches = await branchServices.getAllBranches();
      console.log("BRANCHES FETHCED");
      console.log(branches);
      setBranches(branches);
    } catch (error) {
      SnackbarUtils.error("Something Went Wrong while fetching Branches");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <masterDataContext.Provider value={{ branches, setBranches }}>
      {children}
    </masterDataContext.Provider>
  );
};

export const useMasterData = ()  => {
  const context = useContext(masterDataContext);
  if (!context) {
    throw new Error("useMasterData must be used within Provider");
  }
  return context;
};
