import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req:Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization 

    const usersTokensRepository = new UsersTokensRepository()
    
    if(!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const {sub: user_id} = verify(token, auth.secret_token) as IPayload

        req.user = {
            id: user_id
        }
        
        next()
    } catch (error) {
        throw new AppError("Invalid token!", 401)
    }

}