import express from "express";
import Equipment from "../models/EquipmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/equipment', async (req, res) => {
    try {
        const { equipment, subcategories } = req.body;

        // Validate that equipment and subcategories are provided
        if (!equipment || !subcategories) {
            return res.status(400).json({ message: "Equipment and subcategories are required" });
        }

        // Validate that all required fields within subcategories are present
        if (
            !subcategories.product.productName ||
            !subcategories.title ||
            !subcategories.description
        ) {
            return res.status(400).json({ message: "Subcategory details are incomplete"});
        }

        // Create a new equipment document
        const equipmentNew = new Equipment({
            equipment,
            subcategories
        });

        // Save to MongoDB
        await equipmentNew.save();

        res.status(201).json({
            message: "Equipment added successfully",
            data: equipmentNew
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving equipment" });
    }
});

export default router;