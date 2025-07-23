import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import {
  ManufacturerAttributes,
  ManufacturerCreationAttributes,
} from "./manufacturer.types";

export class Manufacturer
  extends Model<ManufacturerAttributes, ManufacturerCreationAttributes>
  implements ManufacturerAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare status: 'active' | 'inactive';
  declare created_at: Date;
  declare updated_at: Date;
}

Manufacturer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "Manufacturer",
    tableName: "manufacturers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
