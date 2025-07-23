import { DataTypes, Model } from "sequelize";
import { BranchAttributes, BranchCreationAttributes } from "./branch.types";
import { sequelize } from "@/config";

export class Branch
  extends Model<BranchAttributes, BranchCreationAttributes>
  implements BranchAttributes
{
  declare id: number;
  declare name: string;
  declare location: string;
  declare pincode: string;
  declare code : string;
  declare isOpen: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

Branch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code :{
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    modelName: "Branch",
    tableName: "branches",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
