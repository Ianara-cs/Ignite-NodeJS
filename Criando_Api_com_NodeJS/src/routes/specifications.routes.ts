import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router()

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.hendle(request, response)
})

export { specificationsRoutes };

