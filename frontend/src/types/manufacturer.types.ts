export interface Manufacturer {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
}

export interface ManufacturerFormData extends Omit<Manufacturer, "id"> {}
