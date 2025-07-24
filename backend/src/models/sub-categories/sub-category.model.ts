import { DataTypes, Model } from "sequelize";
import {
  SubCategoryAttributes,
  SubCategoryCreationAttributes,
} from "./sub-category.types";
import { sequelize } from "@/config";

export class SubCategory
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>
  implements SubCategoryAttributes
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare status: string;
  declare is_deleted : boolean ;
  declare category_id: number;
  declare created_at: Date;
  declare updated_at: Date;
}

SubCategory.init(
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
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted :{
      type: DataTypes.BOOLEAN,
      defaultValue : false
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
