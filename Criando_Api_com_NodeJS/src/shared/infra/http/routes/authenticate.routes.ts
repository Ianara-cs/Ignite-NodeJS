import { Router } from "express";
import { AuthenticateController } from "../../../../modules/accounts/useCases/authentication/AuthenticateController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export { authenticateRoutes };

