import * as XLSX from 'xlsx';
export default async function fetchData(sheetNames) {
    try {
        const excelFileUrl = process.env.REACT_APP_EXCEL_FILE_URL;;
        const response = await fetch(excelFileUrl);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'buffer' });

        let jobOffers = [];
        let infos = [];
        let services = [];
        let contacts = [];
        sheetNames.forEach(sheetName => {
            if (!workbook.SheetNames.includes(sheetName)) {
                throw new Error(`Sheet "${sheetName}" not found`);
            }

            const worksheet = workbook.Sheets[sheetName];
            if (sheetName === 'Vagas') jobOffers = XLSX.utils.sheet_to_json(worksheet);
            if (sheetName === 'Sobre') infos = XLSX.utils.sheet_to_json(worksheet);
            if (sheetName === 'Serviços') services = XLSX.utils.sheet_to_json(worksheet);
            if (sheetName === 'Contatos') contacts = XLSX.utils.sheet_to_json(worksheet);
        });

        return {
            status: 'success',
            jobOffers,
            infos,
            services,
            contacts
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 'error',
            message: 'Falha ao carregar as vagas. Por favor, tente novamente mais tarde.'
        };
    }
};