/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundRoute = async(req:Request, res:Response, next:NextFunction) =>{
    return res.status(500).json({
        success: false,
        message: "APIs not found",
        error: ' '
    })
}
export default notFoundRoute;