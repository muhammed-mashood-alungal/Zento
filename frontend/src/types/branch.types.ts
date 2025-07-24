export interface Branch {
  id: number;
  name: string;
  location: string;
  pincode: string;
  code: string;
  isOpen: boolean;
}

export interface BranchFormData extends Omit<Branch, "id"> {}
