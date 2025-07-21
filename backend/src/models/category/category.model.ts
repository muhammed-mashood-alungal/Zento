import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config";
import {
  CategoryAttributes,
  CategoryCreationAttributes,
} from "./category.types";

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare status: string;
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
