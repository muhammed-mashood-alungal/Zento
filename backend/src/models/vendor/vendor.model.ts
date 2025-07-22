import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/config";
import { VendorAttributes, VendorCreationAttributes } from "./vendor.types";

export class Vendor
  extends Model<VendorAttributes, VendorCreationAttributes>
  implements VendorAttributes
{
  declare id: number;
  declare contact_person: string;
  declare phone: string;
  declare email: string;
  declare gst_number: string;
  declare manufacturer_name: string;
  declare status: string;
  declare created_at: Date;
  declare updated_at: Date;
}

Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contact_person: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    gst_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufacturer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["active", "inactive"]],
      },
      defaultValue: "active",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "SubCategory",
    tableName: "sub_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
