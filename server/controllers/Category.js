const Category = require("../models/Category")
const Course = require("../models/Course")

// Utility function
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// ================= CREATE CATEGORY =================
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      })
    }

    const categoryDetails = await Category.create({
      name,
      description,
    })

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ================= SHOW ALL CATEGORIES =================
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({})

    const categoriesWithCourses = await Promise.all(
      categories.map(async (category) => {
        const courseCount = await Course.countDocuments({
          category: category._id,
          status: "Published",
        })

        return {
          _id: category._id,
          name: category.name,
          description: category.description,
          courseCount,
        }
      })
    )

    return res.status(200).json({
      success: true,
      data: categoriesWithCourses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// ================= CATEGORY PAGE DETAILS =================


exports.getCatalogPageData = async (req, res) => {
  try {
    const { categoryId } = req.body

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      })
    }

    // 1️⃣ Get selected category
    const selectedCategory = await Category.findById(categoryId)

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    // 2️⃣ Get courses of selected category (🔥 MAIN FIX)
    const selectedCategoryCourses = await Course.find({
      category: categoryId,
      status: "Published",
    }).populate("instructor")

    // attach courses manually (frontend expects this)
    selectedCategory._doc.courses = selectedCategoryCourses

    // 3️⃣ Get different category
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    })

    let differentCategory = null

    if (otherCategories.length > 0) {
      const randomCategory =
        otherCategories[Math.floor(Math.random() * otherCategories.length)]

      const differentCategoryCourses = await Course.find({
        category: randomCategory._id,
        status: "Published",
      })

      randomCategory._doc.courses = differentCategoryCourses
      differentCategory = randomCategory
    }

    // 4️⃣ Most selling courses
    const mostSellingCourses = await Course.find({
      status: "Published",
    })
      .sort({ studentsEnrolled: -1 })
      .limit(10)
      .populate("instructor")

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
