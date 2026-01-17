const express = require("express")
const router = express.Router()

const {
  showAllCategories,
  createCategory,
  getCatalogPageData,
} = require("../controllers/Category")

const { auth, isAdmin } = require("../middlewares/auth")

// Create category (Admin only)
router.post("/createCategory", auth, isAdmin, createCategory)

// Get all categories (Navbar)
router.get("/showAllCategories", showAllCategories)

// Catalog page data
router.post("/getCategoryPageData", getCatalogPageData)

module.exports = router
