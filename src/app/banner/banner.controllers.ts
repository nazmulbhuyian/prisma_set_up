import { NextFunction, Request, RequestHandler, Response } from "express";
import { IBannerInterface } from "./banner.interface";
import {
  findAllBannerServices,
  postBannerServices
} from "./banner.services";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";

// Add A Banner
export const postBanner: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IBannerInterface | any> => {
  try {
      const result: IBannerInterface | {} = await postBannerServices();
      if (result) {
        return sendResponse<IBannerInterface>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Banner Added Successfully !",
        });
      } else {
        throw new ApiError(400, "Banner Added Failed !");
      }
  } catch (error: any) {
    next(error);
  }
};

// Find All Banner
export const findAllBanner: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IBannerInterface | any> => {
  try {
    const result: IBannerInterface[] | any = await findAllBannerServices();
    return res.status(200).json(result);
  } catch (error: any) {
    next(error);
  }
};
