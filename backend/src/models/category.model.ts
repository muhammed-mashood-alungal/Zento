import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";
import {
  CategoryAttributes,
  CategoryCreationAttributes,
} from "./category.types";

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  declare id: number;
  declare grn_number: string;
  declare grn_date: Date;
  declare invoice_number: string;
  declare vendor_id: number;
  declare branch_id: number;
  declare created_by: number;
  declare created_at: Date;
  declare updated_at: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grn_number: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    grn_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.BIGINT,
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
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
