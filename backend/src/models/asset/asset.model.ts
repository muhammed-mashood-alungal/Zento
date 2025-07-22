import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config";
import { AssetAttributes, AssetCreationAttributes } from "./asset.types";

export class Asset
  extends Model<AssetAttributes, AssetCreationAttributes>
  implements AssetAttributes
{
  declare id: number;
  declare asset_tag: string;
  declare grn_line_item_id: number;
  declare sub_category_id: number;
  declare branch_id: number;
  declare serial_number: string;
  declare manufacturer_id: number;
  declare purchase_date: Date;
  declare warranty_expiry_date: Date;
  declare status: "Active" | "Under Maintenance" | "Retired";
  declare created_at: Date;
  declare updated_at: Date;
}

Asset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    asset_tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grn_line_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serial_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufacturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    warranty_expiry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Active", "Under Maintenance", "Retired"]],
      },
      defaultValue: "Active",
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
    modelName: "Asset",
    tableName: "assets",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
