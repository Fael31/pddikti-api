import * as cheerio from 'cheerio';
import { FetchHtmlFailedError } from '../error/FetchHtmlFailedError';

export function getDetailStudent(data: any) {
    const $ = cheerio.load(data)

    const biodataElement = $('table.table.table-bordered > tbody > tr.info > td > b:contains("Biodata Mahasiswa")')
    const studentBiodata = biodataElement.closest('table')

    let studentData: any = {}
    studentData.name = studentBiodata.find('tr:eq(1) td:eq(2)').text().trim()
    studentData.sex = studentBiodata.find('tr:eq(2) td:eq(2)').text().trim()
    studentData.univ = studentBiodata.find('tr:eq(3) td:eq(2)').text().trim()
    studentData.major = studentBiodata.find('tr:eq(4) td:eq(2)').text().trim()
    studentData.education = studentBiodata.find('tr:eq(5) td:eq(2)').text().trim()
    studentData.nim = studentBiodata.find('tr:eq(6) td:eq(2)').text().trim()
    studentData.firstSemester = studentBiodata.find('tr:eq(7) td:eq(2)').text().trim()
    studentData.firstStatus = studentBiodata.find('tr:eq(8) td:eq(2)').text().trim()
    studentData.nowStatus = studentBiodata.find('tr:eq(9) td:eq(2)').text().trim()

    if(!studentData.name) {
        throw new FetchHtmlFailedError()
    }

    let history: any = []
    let semesterMap = new Map()
    const historyStatus = $('#home > h3:contains("Riwayat Status Kuliah")').parent().find('div > table#t01 > tbody')
    historyStatus.children().each((i, element) => {
        let semester = $(element).find('td:eq(1)').text().trim()
        let status = $(element).find('td:eq(2)').text().trim()
        let sks = $(element).find('td:eq(3)').text().trim()
        history.push({
            semester: semester,
            status: status,
            sks: sks,
            courses: []
        })
        semesterMap.set(semester, i);
    })
    
    const courses = $('div#menu1 > h3:contains("Riwayat Studi")').parent().find('div > table#t01 > tbody')
    courses.children().each((i, element) => {
        let semester = $(element).find('td:eq(1)').text().trim()
        let code = $(element).find('td:eq(2)').text().trim()
        let name = $(element).find('td:eq(3)').text().trim()
        let sks = $(element).find('td:eq(4)').text().trim()
        const idx = semesterMap.get(semester);
        history[idx].courses.push({
            code: code,
            name: name,
            sks: sks
        })
    })

    studentData.history = history

    return studentData
}