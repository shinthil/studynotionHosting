import React, { useEffect, useState } from "react"
import Footer from "../components/common/Footer"
import { useParams } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import Course_Card from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()

  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [notFound, setNotFound] = useState(false)

  // 🔹 Utility: normalize category name → slug
  const slugify = (str) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")

  // 🔹 Fetch categories and match slug
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const allCategories = res?.data?.data || []

        const matchedCategory = allCategories.find(
          (ct) => slugify(ct.name) === catalogName
        )

        if (!matchedCategory) {
          setNotFound(true)
          return
        }

        setCategoryId(matchedCategory._id)
      } catch (error) {
        console.error("Failed to fetch categories", error)
        setNotFound(true)
      }
    }

    getCategories()
  }, [catalogName])

  // 🔹 Fetch catalog page data
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId)
        setCatalogPageData(res)
      } catch (error) {
        console.error("Failed to fetch catalog data", error)
      }
    }

    if (categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])

  // 🔹 Loading state
  if (loading || (!catalogPageData && !notFound)) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  // 🔹 Error state
  if (notFound || !catalogPageData?.success) {
    return <Error />
  }

  const { selectedCategory, differentCategory, mostSellingCourses } =
    catalogPageData.data

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="w-full bg-richblack-800">
        <div className="mx-auto flex max-w-maxContent flex-col gap-4 px-4 py-16">
          <p className="text-sm text-richblack-300">
            Home / Catalog /{" "}
            <span className="text-yellow-25">
              {selectedCategory.name}
            </span>
          </p>

          <h1 className="text-3xl font-semibold text-richblack-5 md:text-4xl">
            {selectedCategory.name}
          </h1>

          <p className="max-w-[870px] text-richblack-200">
            {selectedCategory.description}
          </p>
        </div>
      </section>

      {/* ================= SECTION 1 ================= */}
      <section className="mx-auto w-full max-w-maxContent px-4 py-12">
        <div className="section_heading">Courses to get you started</div>

        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <button
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </button>

          <button
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </button>
        </div>

        <CourseSlider Courses={selectedCategory.courses} />
      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="mx-auto w-full max-w-maxContent px-4 py-12">
        <div className="section_heading">
          Top courses in {differentCategory.name}
        </div>

        <div className="py-8">
          <CourseSlider Courses={differentCategory.courses} />
        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section className="mx-auto w-full max-w-maxContent px-4 py-12">
        <div className="section_heading">Frequently Bought</div>

        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mostSellingCourses?.slice(0, 4).map((course, index) => (
              <Course_Card
                key={index}
                course={course}
                Height="h-[400px]"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Catalog
