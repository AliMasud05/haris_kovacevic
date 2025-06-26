import express from "express";

import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CourseRoutes } from "../modules/Course/course.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/course",
    route:CourseRoutes,
    
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
