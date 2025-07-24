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
import { vendorServices } from "../services/vendor.service";
import type { Vendor } from "../types/vendor.types";
import type { Category } from "../types/category.types";
import type { SubCategory } from "../types/sub-category.types";
import { categoryServices } from "../services/category.service";
import { subCategoryServices } from "../services/sub-category.service";

type masterContextType = {
  branches: Branch[];
  setBranches: Dispatch<SetStateAction<Branch[]>>;
  manufacturers: Manufacturer[];
  setManufacturers: Dispatch<SetStateAction<Manufacturer[]>>;
  vendors: Vendor[];
  setVendors: Dispatch<SetStateAction<Vendor[]>>;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  subCategories: SubCategory[];
  setSubCategories: Dispatch<SetStateAction<SubCategory[]>>;
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
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

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
      SnackbarUtils.error("Something Went Wrong while fetching Maufacturers");
    }
  };
  const fetchVendors = async () => {
    try {
      const vendors = await vendorServices.fetchAllVendors();
      setVendors(vendors);
    } catch (error) {
      SnackbarUtils.error("Something Went Wrong while fetching Vedors");
    }
  };

  const fetchCategories = async () => {
    try {
      const contegories = await categoryServices.fetchAllCategories();
      let sub_arr: SubCategory[] = [];
      for (let category of contegories) {
        const sub = await subCategoryServices.getAllSubCategories(category.id);
        sub_arr = [...sub_arr, ...sub];
      }
      setCategories(contegories);
      setSubCategories(sub_arr);
    } catch (error) {
      SnackbarUtils.error("Something Went Wrong while fetching Branches");
    }
  };


  useEffect(() => {
    fetchBranches();
    fetchManufacturers();
    fetchVendors();
    fetchCategories();
  }, []);

  return (
    <masterDataContext.Provider
      value={{
        branches,
        setBranches,
        manufacturers,
        setManufacturers,
        vendors,
        setVendors,
        categories,
        setCategories,
        subCategories,
        setSubCategories
      }}
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
