export interface BranchAttributes {
  id: number;
  name: string;
  location: string;
  pincode: string;
  code:string;
  is_open: boolean;
  is_deleted:boolean
  created_at: Date;
  updated_at: Date;
}

export interface BranchCreationAttributes
  extends Omit<BranchAttributes, "id" | "created_at" | "updated_at" | 'is_deleted'> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

