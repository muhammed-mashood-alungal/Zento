export interface ManufacturerAttributes {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

export interface ManufacturerCreationAttributes
  extends Omit<ManufacturerAttributes, "id" | "created_at" | "updated_at"> {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}
