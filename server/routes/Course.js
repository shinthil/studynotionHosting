// Import required modules
const express = require("express")
const router = express.Router()

// ================= COURSE CONTROLLERS =================
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")

// ================= SECTION CONTROLLERS =================
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// ================= SUBSECTION CONTROLLERS =================
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// ================= RATING CONTROLLERS =================
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

// ================= MIDDLEWARES =================
const { auth, isInstructor, isStudent } = require("../middlewares/auth")

// *********************************************************************
//                               COURSE ROUTES
// *********************************************************************

// Courses (Instructor only)
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.delete("/deleteCourse", deleteCourse)

// Sections
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)

// SubSections
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Fetch courses
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

// *********************************************************************
//                           RATING & REVIEWS
// *********************************************************************

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router
