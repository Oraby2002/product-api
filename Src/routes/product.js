
import express from "express";
import Product from "../DB/model/product.ts";
import Variant from "../DB/model/variant.ts";

const router = express.Router();

// Create Product + Variants
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl, variants } =
      req.body;

    const product = await Product.create(
      {
        name,
        description,
        price,
        category,
        stock,
        imageUrl,
        variants, // Sequelize هيعمل insert في جدول variant
      },
      {
        include: [{ model: Variant, as: "variants" }],
      }
    );

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Get All Products (with variants)
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({ include: "variants" });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

//  Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: "variants",
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

//  Update Product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

//  Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const products = req.body; // array of products
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Request body must be an array of products' });
    }

    const newProducts = await Product.bulkCreate(products);
    res.status(201).json({
      message: `${newProducts.length} products inserted successfully`,
      data: newProducts,
    });
  } catch (error) {
    console.error('Bulk insert error:', error);
    res.status(500).json({ error: 'Failed to insert products' });
  }
});

export default router;
