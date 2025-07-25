import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config";
import {
  GRNLineItemAttributes,
  GRNLIneItemCreationAttributes,
} from "./grn-line-items.types";

export class GRNLineItems
  extends Model<GRNLineItemAttributes, GRNLIneItemCreationAttributes>
  implements GRNLineItemAttributes
{
  declare id: number;
  declare name: string;
  declare quantity: number;
  declare unit_price: number;
  declare tax_percentage: number;
  declare taxable_amount: number;
  declare total_amount: number;
  declare grn_header_id: number;
  declare sub_category_id: number;
  declare created_at: Date;
  declare updated_at: Date;
}

GRNLineItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tax_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    taxable_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grn_header_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_category_id: {
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
    modelName: "GRNLineItems",
    tableName: "grn_line_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
