import * as XLSX from 'xlsx';
export default async function fetchData(sheetName) {
    try {
        const excelFileUrl = 'https://docs.google.com/spreadsheets/d/1wnaDlUugyJnVAydX3sGxq91d2OOOOAS9-I1r2yQTHp4/export?format=xlsx';
        const response = await fetch(excelFileUrl);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'buffer' });

        if (!workbook.SheetNames.includes(sheetName)) {
            throw new Error(`Sheet "${sheetName}" not found`);
        }

        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        return {
            status: 'success',
            data
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 'error',
            message: 'Falha ao carregar as vagas. Por favor, tente novamente mais tarde.'
        };
    }
};