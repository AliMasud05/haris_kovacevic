import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";
import { Course, CourseStatus, CourseType, SkillLevel } from "@prisma/client";

const createCourse = async (payload: Course): Promise<Course> => {
  const result = await prisma.course.create({
    data: payload,
  });
  return result;
};

const getAllCourses = async (): Promise<Course[]> => {
  const result = await prisma.course.findMany({
    include: {
      modules: true,
      resources: true,
      enrollments: true,
      reviews: true,
    },
  });
  return result;
};

const getCourseById = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      modules: true,
      resources: true,
      enrollments: true,
      reviews: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  return result;
};

const updateCourse = async (
  id: string,
  payload: Partial<Course>
): Promise<Course> => {
  const result = await prisma.course.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCourse = async (id: string): Promise<Course> => {
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });

  return result;
};

const getCoursesByStatus = async (status: CourseStatus): Promise<Course[]> => {
  const result = await prisma.course.findMany({
    where: {
      status,
    },
    include: {
      modules: true,
      resources: true,
      enrollments: true,
      reviews: true,
    },
  });
  return result;
};

const getCoursesByType = async (type: CourseType): Promise<Course[]> => {
  const result = await prisma.course.findMany({
    where: {
      courseType: type,
    },
    include: {
      modules: true,
      resources: true,
      enrollments: true,
      reviews: true,
    },
  });
  return result;
};

const getCoursesByLevel = async (level: SkillLevel): Promise<Course[]> => {
  const result = await prisma.course.findMany({
    where: {
      level,
    },
    include: {
      modules: true,
      resources: true,
      enrollments: true,
      reviews: true,
    },
  });
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByStatus,
  getCoursesByType,
  getCoursesByLevel,
};