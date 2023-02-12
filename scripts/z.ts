import XLSX from 'xlsx';
import path from 'path';

const workbook = XLSX.readFile(
  path.resolve(__dirname, 'data', 'sisu2022.xlsx')
);

const sheet_name_list = workbook.SheetNames;

const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

console.log(xlData);
