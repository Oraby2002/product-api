import { DataTypes, ExclusionConstraintError } from "sequelize";
import sequelize from "../connection.js";
import Product from "./product.ts";

const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "variants",
    timestamps: false,
  }
);

// العلاقة One-to-Many
Product.hasMany(Variant, { foreignKey: "productId", as: "variants" });
Variant.belongsTo(Product, { foreignKey: "productId", as: "product" });

export default Variant;
