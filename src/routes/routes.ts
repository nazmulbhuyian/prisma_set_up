import express from "express";
import { BannerRoutes } from "../app/banner/banner.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/banner",
    route: BannerRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
