const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

type Course = {
  NU_ANO: number;
  NU_EDICAO: number;
  CO_IES: number;
  NO_IES: string;
  SG_IES: string;
  DS_ORGANIZACAO_ACADEMICA: string;
  DS_CATEGORIA_ADM: string;
  NO_CAMPUS: string;
  NO_MUNICIPIO_CAMPUS: string;
  SG_UF_CAMPUS: string;
  DS_REGIAO_CAMPUS: string;
  CO_IES_CURSO: number;
  NO_CURSO: string;
  DS_GRAU: string;
  DS_TURNO: string;
  TP_MOD_CONCORRENCIA: string;
  DS_MOD_CONCORRENCIA: string;
  NU_PERCENTUAL_BONUS: number;
  QT_VAGAS_CONCORRENCIA: number;
  NU_NOTACORTE: number;
  QT_INSCRICAO: number;
};

const workbook = XLSX.readFile(
  path.resolve(__dirname, 'data', 'sisu2022.xlsx')
);

const sheet_name_list = workbook.SheetNames;

const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

const jsonData = xlData.map((course: Course) => {
  return {
    institution: course.NO_IES,
    campus: course.NO_CAMPUS,
    course: `${course.NO_CURSO} - ${course.DS_GRAU}`,
    cutoff_mark: course.NU_NOTACORTE,
    group: course.DS_MOD_CONCORRENCIA,
    shift: course.DS_TURNO,
  };
});

const data = JSON.stringify(jsonData, null, 2);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'data', 'data.json'),
  data
);
