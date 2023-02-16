import React, { useEffect, useState } from 'react';

import CardCourse from '@/components/CardCourse';
import dataJson from '@/data/data.json';
import { Course } from '@/types';

const Home = () => {
  const [courses, setCourses] = useState<string[]>([]);
  const [couresData, setCouresData] = useState<Course[]>(dataJson);
  const [shifts, setShifts] = useState<string[]>([]);
  const [universities, setUniversities] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    const dataCourses: string[] = [];
    const dataUniversity: string[] = [];

    dataJson.forEach((item) => {
      let [courseName] = item.course.split(' - ');
      const couseNameString: string = courseName.trim();
      !dataCourses.includes(couseNameString) &&
        dataCourses.push(couseNameString);
      !dataUniversity.includes(item.institution) &&
        dataUniversity.push(item.institution);
    });
    setCourses(dataCourses);
    setShifts(['Integral', 'Matutino', 'Noturno', 'Vespertino']);
    setDegrees(['Licenciatura', 'Bacharelado']);
    setUniversities(dataUniversity);
  }, []);

  useEffect(() => {
    Filter();
  }, [filters]);

  const Filter = () => {
    let data = [...couresData];
    if (filters[0] != '') {
      data = data.filter((item) => {
        let [courseName] = item.course.split(' - ');
        const couseNameString: string = courseName.trim();
        return couseNameString === filters[0];
      });
    }
    if (filters[1] != '') {
      data = data.filter((item) => item.shift === filters[1]);
    }
    if (filters[2] != '') {
      data = data.filter((item) => item.institution === filters[2]);
    }
    if (filters[3] != '') {
      data = data.filter((item) => {
        let [, degreeType] = item.course.split(' - ');
        const degreeTypeString: string = degreeType.trim();
        return degreeTypeString === filters[3];
      });
    }
    setCouresData(data);
  };

  const updateFilters = (index: number, filter: string) => {
    if (
      !courses.includes(filter) &&
      !shifts.includes(filter) &&
      !universities.includes(filter) &&
      !degrees.includes(filter) &&
      filter !== ''
    ) {
      return;
    }
    setCouresData(dataJson);
    const newFilters = [...filters];
    newFilters[index] = filter;
    setFilters(newFilters);
  };

  return (
    <div className="h-screen flex items-center flex-col px-6 py-4">
      <div className="flex flex-col max-w-4xl py-4 gap-4">
        <h1 className="text-2xl font-mono">Notas de cortes - ENEM 2022</h1>
        <p>
          Olá! Esse projeto foi criado com intuito de facilitar a visualização
          das notas de corte do SISU, já que eu tinha curiosidade em saber as
          notas de corte do ano anterior e o SISU só disponibiliza um arquivo{' '}
          <a
            className="text-blue-500 hover:text-blue-700 hover:underline"
            href="https://en.wikipedia.org/wiki/Microsoft_Excel#File_formats"
            target="_blank"
            rel="noreferrer"
          >
            XLSX
          </a>{' '}
          com muita informação desnecessária. Então, decidi criar este projeto
          para facilitar a vida de quem também tem essa curiosidade.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row max-w-4xl w-full gap-x-2 mb-4">
        <div className="py-2 w-full">
          <input
            type="text"
            list="coursesData"
            placeholder="Todos os cursos"
            className="border-[1px] border-gray-50 rounded-md w-full p-2"
            onChange={(e) => updateFilters(0, e.target.value)}
          />
          <datalist id="coursesData">
            {courses.map((item: string) => {
              return <option key={item}>{item}</option>;
            })}
          </datalist>
        </div>
        <div className="py-2 w-full">
          <input
            type="text"
            list="shiftData"
            placeholder="Todos os turnos"
            className="border-[1px] border-gray-50 rounded-md w-full p-2"
            onChange={(e) => updateFilters(1, e.target.value)}
          />
          <datalist id="shiftData">
            <option>Integral</option>
            <option>Matutino</option>
            <option>Noturno</option>
            <option>Vespertino</option>
          </datalist>
        </div>
        <div className="py-2 w-full">
          <input
            type="text"
            list="universityData"
            placeholder="Todas as Universidades"
            className="border-[1px] border-gray-50 rounded-md w-full p-2"
            onChange={(e) => updateFilters(2, e.target.value)}
          />
          <datalist id="universityData">
            {universities.map((item: string, key: number) => {
              return <option key={key}>{item}</option>;
            })}
          </datalist>
        </div>
        <div className="py-2 w-full">
          <input
            type="text"
            list="degreeData"
            placeholder="Tipos de Graduação"
            className="border-[1px] border-gray-50 rounded-md w-full p-2"
            onChange={(e) => updateFilters(3, e.target.value)}
          />
          <datalist id="degreeData">
            <option>Bacharelado</option>
            <option>Licenciatura</option>
          </datalist>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {couresData.map((item: Course, key: number) => (
          <CardCourse key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
