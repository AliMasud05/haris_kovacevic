import { z } from "zod";
import { CourseStatus, CourseType, SkillLevel } from "@prisma/client";

const createCourseValidationSchema = z.object({
  title: z.string().min(3).max(255),
  subtitle: z.string().min(3).max(255),
  price: z.number().min(0),
  courseType: z.nativeEnum(CourseType),
  level: z.nativeEnum(SkillLevel),
  duration: z.number().min(1),
  language: z.string().min(2).max(50),
  classes: z.string().min(1),
  description: z.string().min(10),
  demoVideo: z.string().url(),
  thumnail: z.string().url(),
  status: z.nativeEnum(CourseStatus).optional(),
});

const updateCourseValidationSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  subtitle: z.string().min(3).max(255).optional(),
  price: z.number().min(0).optional(),
  courseType: z.nativeEnum(CourseType).optional(),
  level: z.nativeEnum(SkillLevel).optional(),
  duration: z.number().min(1).optional(),
  language: z.string().min(2).max(50).optional(),
  classes: z.string().min(1).optional(),
  description: z.string().min(10).optional(),
  demoVideo: z.string().url().optional(),
  thumnail: z.string().url().optional(),
  status: z.nativeEnum(CourseStatus).optional(),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};