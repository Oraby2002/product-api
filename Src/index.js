import express from "express";
import sequelize from "./DB/connection.js";
import productRoutes  from "./routes/product.js";
import variantRoutes  from "./routes/variant.js"; 
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use("/products", productRoutes);
 app.use("/variants", variantRoutes);

// Sync DB
sequelize
  .sync()
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("DB sync error:", err));

app.listen(4000, () => {
  console.log(`Server running on ${process.env.DB_HOST || 'localhost'}:4000`);
});
