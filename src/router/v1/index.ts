import { Request, Response, Router } from "express";
import { getDataMahasiswaController, getDataMahasiswaDetailController } from "../../controller";

export function v1Router(): Router {
    const route: Router = Router()

    route.get('/data-mahasiswa', getDataMahasiswaController)
    route.get('/data-mahasiswa-detail', getDataMahasiswaDetailController)

    return route
}