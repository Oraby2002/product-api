import express from "express";
import Product from "../DB/model/product.ts";
import Variant from "../DB/model/variant.ts";

const router = express.Router();

//  Create Variant for a Product
router.post("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, value } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const variant = await Variant.create({ name, value, productId });
    res.status(201).json(variant);
  } catch (err) {
    res.status(500).json({ error: "Failed to create variant" });
  }
});

//  Get Variants of a Product
router.get("/:productId", async (req, res) => {
  try {
    const variants = await Variant.findAll({
      where: { productId: req.params.productId },
    });
    res.json(variants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch variants" });
  }
});

router.get("/by-product/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;

    
    const product = await Product.findOne({
      where: { name: productName },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const variants = await Variant.findAll({
      where: { productId: product.id },
    });

    res.json(variants);
  } catch (err) {
    console.error("Error fetching variants by product name:", err);
    res.status(500).json({ error: "Failed to fetch variants" });
  }
});


// Update Variant
router.put("/:id", async (req, res) => {
  try {
    const variant = await Variant.findByPk(req.params.id);
    if (!variant) return res.status(404).json({ error: "Variant not found" });

    await variant.update(req.body);
    res.json(variant);
  } catch (err) {
    res.status(500).json({ error: "Failed to update variant" });
  }
});

//  Delete Variant
router.delete("/:id", async (req, res) => {
  try {
    const variant = await Variant.findByPk(req.params.id);
    if (!variant) return res.status(404).json({ error: "Variant not found" });

    await variant.destroy();
    res.json({ message: "Variant deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete variant" });
  }
});

export default router;
