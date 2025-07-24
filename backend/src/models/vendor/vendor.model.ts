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
  declare is_deleted : boolean;
  declare manufacturer_id: number;
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
      unique : true,
      validate: {
        isEmail: true,
      },
    },
    is_deleted :{
       type : DataTypes.BOOLEAN,
       defaultValue : false
    },
    gst_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufacturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: "Vendor",
    tableName: "vendors",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
