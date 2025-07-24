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
import { manufacturerServices } from "../services/manufacturer.service";
import type { Manufacturer } from "../types/manufacturer.types";

type masterContextType = {
  branches: Branch[];
  setBranches: Dispatch<SetStateAction<Branch[]>>;
  manufacturers: Manufacturer[];
  setManufacturers: Dispatch<SetStateAction<Manufacturer[]>>;
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
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const fetchBranches = async () => {
    try {
      const branches = await branchServices.getAllBranches();
      setBranches(branches);
    } catch (error) {
      SnackbarUtils.error("Something Went Wrong while fetching Branches");
    }
  };
  const fetchManufacturers = async () => {
    try {
      const manufacturers = await manufacturerServices.getAllManufacturers();
      setManufacturers(manufacturers);
    } catch (error) {
      SnackbarUtils.error("Something Went Wrong while fetching Branches");
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchManufacturers();
  }, []);

  return (
    <masterDataContext.Provider
      value={{ branches, setBranches, manufacturers, setManufacturers }}
    >
      {children}
    </masterDataContext.Provider>
  );
};

export const useMasterData = () => {
  const context = useContext(masterDataContext);
  if (!context) {
    throw new Error("useMasterData must be used within Provider");
  }
  return context;
};
