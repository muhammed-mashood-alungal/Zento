export interface BranchAttributes {
  id: number;
  name: string;
  location: string;
  pincode: string;
  code:string;
  isOpen: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BranchCreationAttributes
  extends Omit<BranchAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

