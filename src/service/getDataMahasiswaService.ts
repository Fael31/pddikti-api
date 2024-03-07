import dotenv from 'dotenv'
import * as cheerio from 'cheerio';
import { FetchHtmlFailedError } from '../error/FetchHtmlFailedError';
import { StudentNotFoundError } from '../error/StudentNotFoundError';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://pddikti.kemdikbud.go.id'

export function getStudentUrlPage(data: any, payload: any) {
    const $ = cheerio.load(data);
    const studentTable = $('table:contains("Nama Mahasiswa")')
    const item = studentTable.find(`tbody > tr > td > a.add-cart-parimary-btn > span > span:contains("${payload.name.toUpperCase()}"):first`);
    const link = BASE_URL + item.closest('a').attr('href')
    const element = item.closest('tr')
    const name = element.find('td:eq(0) > a > span > span').text().trim()
    const nim = element.find('td:eq(1) > span > span').text().trim()
    const univ = element.find('td:eq(2) > span > span').text().trim()
    const major = element.find('td:eq(3) > span > span').text().trim()
    const student = {
        name: name,
        nim: nim,
        univ: univ,
        major: major,
        link: link
    }
    if(!student.name) {
        throw new FetchHtmlFailedError()
    }
    if(student.name.toLocaleLowerCase() !== payload.name.toLocaleLowerCase() || student.nim !== payload.nim) {
        throw new StudentNotFoundError()
    }

    return student
}