import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/config";
import { GRNHeaderAttributes, GRNHeaderCreationAttributes } from "./grn-header.types";

export class GRNHeader
  extends Model<GRNHeaderAttributes, GRNHeaderCreationAttributes>
  implements GRNHeaderAttributes
{
    declare id: number;
    declare grn_number: string;
    declare grn_date: Date;
    declare invoice_number: string;
    declare vendor_id: number;
    declare branch_id: number;
    declare total_amount: number;
    declare mode: "submit" | "draft";
    declare created_at: Date;
    declare updated_at: Date;
}

GRNHeader.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grn_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    grn_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["submit", "draft"]],
      },
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
    modelName: "GRNHeader",
    tableName: "grn_headers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
