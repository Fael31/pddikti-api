import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import { getHtmlData } from "../utils/getHtmlData";
import { getStudentUrlPage } from "../service/getDataMahasiswaService";
import { getDetailStudent } from "../service/getDataMahasiswaDetailService";


dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://pddikti.kemdikbud.go.id'

export async function getDataMahasiswaController(req: Request, res: Response, next: NextFunction) {
    try {
        const payload = {
            name: req.query.name! as string,
            nim: req.query.nim! as string,
            univ: req.query.univ as string,
            major: req.query.major as string
        }
        const { name, nim } = payload
        const url = `${BASE_URL}/search/${name.replace(" ", "%20")}%20${nim}` 
        const data = await getHtmlData(url)
        const student = getStudentUrlPage(data, payload)

        res.send(student).status(200);
    } catch(err) {
        next(err)
    }
}

export async function getDataMahasiswaDetailController(req: Request, res: Response, next: NextFunction) {
    try {
        const payload = {
            name: req.query.name! as string,
            nim: req.query.nim! as string,
            univ: req.query.univ as string,
            major: req.query.major as string
        }
        const { name, nim } = payload
        const url = `${BASE_URL}/search/${name.replace(" ", "%20")}%20${nim}` 
        const data = await getHtmlData(url)
        const student = getStudentUrlPage(data, payload)

        const detailUrl = student.link
        const getDetailData = await getHtmlData(detailUrl)
        const detailStudent = await getDetailStudent(getDetailData)

        res.send(detailStudent).status(200);
    } catch(err) {
        next(err)
    }
}