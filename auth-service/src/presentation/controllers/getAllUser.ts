import { ErrorResponse } from "@/_lib/http/common/error";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { getAllUser } from "@/infrastructure/database/mongo/repostories/getAllUser";
import { NextFunction, Request, Response } from "express";

export const getAllUserController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allData = await getAllUser();
      if (!allData) {
        return next(ErrorResponse.notFound('Users not found'));
      }
      res.status(200).json({ success: true, data: { allData }, message: "All user data retrieved successfully" });
    } catch (error) {
      next(error);
    }
  }
}