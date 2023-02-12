const XLSX  = require('xlsx');
const path  = require('path');
const fs = require('fs');

type Course = {
  NU_ANO: number,
  NU_EDICAO: number,
  CO_IES: number,
  NO_IES: string,
  SG_IES: string,
  DS_ORGANIZACAO_ACADEMICA: string,
  DS_CATEGORIA_ADM: string,
  NO_CAMPUS: string,
  NO_MUNICIPIO_CAMPUS: string,
  SG_UF_CAMPUS: string,
  DS_REGIAO_CAMPUS: string,
  CO_IES_CURSO: number,
  NO_CURSO: string,
  DS_GRAU: string,
  DS_TURNO: string,
  TP_MOD_CONCORRENCIA: string,
  DS_MOD_CONCORRENCIA: string,
  NU_PERCENTUAL_BONUS: number,
  QT_VAGAS_CONCORRENCIA: number,
  NU_NOTACORTE: number,
  QT_INSCRICAO: number
}

const workbook = XLSX.readFile(
  path.resolve(__dirname, 'data', 'sisu2022.xlsx')
);

const sheet_name_list = workbook.SheetNames;

const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

const jsonData = xlData.map((x: Course) => {
  return {  
    institution: x.NO_IES,
    campus: x.NO_CAMPUS,
    course: x.NO_CURSO,
    cutoff_mark: x.NU_NOTACORTE,
    group: x.DS_MOD_CONCORRENCIA
  }
});

const data = JSON.stringify(jsonData);
fs.writeFileSync('./scripts/data/data.json', data);
