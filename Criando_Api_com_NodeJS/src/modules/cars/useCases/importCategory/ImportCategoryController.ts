import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


class ImportCategoryController {
    async hendle(request: Request, response: Response) {
        const {file} = request

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        await importCategoryUseCase.execute(file)

        return response.status(201).send()
    } 
}

export { ImportCategoryController };

