import { Router } from "express"
import multer from "multer"
import uploadConfig from '../../../../config/upload'
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImagesController"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const carsRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
let uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig)

carsRouter.post(
    "/", 
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
)

carsRouter.get("/available", listAvailableCarsController.handle)

carsRouter.post(
    "/:id/specifications", 
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
)

carsRouter.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin, 
    upload.array("images"),
    uploadCarImagesController.handle
)

export { carsRouter }

