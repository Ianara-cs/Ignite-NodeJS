import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

    hendle(request: Request, response: Response) {
        const {name, description} = request.body

        this.createSpecificationUseCase.execute({description, name})

        return response.status(201).send()
    }
}

export { CreateSpecificationController };

