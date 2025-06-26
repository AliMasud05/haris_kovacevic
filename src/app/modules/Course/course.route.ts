import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseById);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  CourseController.updateCourse
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.ADMIN),
  CourseController.deleteCourse
);

router.get("/status/:status", CourseController.getCoursesByStatus);
router.get("/type/:type", CourseController.getCoursesByType);
router.get("/level/:level", CourseController.getCoursesByLevel);

export const CourseRoutes = router;