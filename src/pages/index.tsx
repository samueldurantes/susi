import React, { useRef, useState } from 'react';

import CardCourse from '@/components/CardCourse';
import dataJson from '@/data/data.json';
import { Course } from '@/types';
import { ViewportList } from 'react-viewport-list';

type HomeProps = {
  data: {
    courses: string[];
    shifts: string[];
    degrees: string[];
    universities: string[];
    initialCoursesData: Course[];
  };
};

type Filter = {
  course: string;
  shift: string;
  institution: string;
  degreeType: string;
};
const INITIAL_FILTER_VALUE: Filter = {
  course: '',
  degreeType: '',
  institution: '',
  shift: '',
};

const Home = ({
  data: { courses, degrees, shifts, universities, initialCoursesData },
}: HomeProps) => {
  const [coursesData, setCoursesData] = useState<Course[]>(initialCoursesData);
  const [filter, setFilter] = useState<Filter>(INITIAL_FILTER_VALUE);
  const viewPortRef = useRef(null);

  const updateCourses = (filterKey: keyof Filter) => {
    if (filter[filterKey] === '') return;

    if (filterKey === 'course') {
      const filteredCourses = initialCoursesData.filter(({ course }) => {
        const [name] = course.split(' - ');
        return name.trim() === filter[filterKey];
      });
      return setCoursesData(filteredCourses);
    }

    if (['shift', 'institution'].includes(filterKey)) {
      const filteredCourses = initialCoursesData.filter((course) => {
        return course[filterKey as 'course' | 'shift' | 'institution'].includes(
          filter[filterKey]
        );
      });
      return setCoursesData(filteredCourses);
    }

    if (filterKey === 'degreeType') {
      const filteredCourses = initialCoursesData.filter(({ course }) => {
        const [, degreeType] = course.split(' - ');
        return degreeType.trim() === filter[filterKey];
      });
      return setCoursesData(filteredCourses);
    }
  };

  const handleChange =
    (key: keyof Filter) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, [key]: event.target.value }));
      updateCourses(key);
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
            onChange={handleChange('course')}
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
            onChange={handleChange('shift')}
          />
          <datalist id="shiftData">
            {shifts.map((item: string) => {
              return <option key={item}>{item}</option>;
            })}
          </datalist>
        </div>
        <div className="py-2 w-full">
          <input
            type="text"
            list="universityData"
            placeholder="Todas as Universidades"
            className="border-[1px] border-gray-50 rounded-md w-full p-2"
            onChange={handleChange('institution')}
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
            onChange={handleChange('degreeType')}
          />
          <datalist id="degreeData">
            {degrees.map((item: string, key: number) => {
              return <option key={key}>{item}</option>;
            })}
          </datalist>
        </div>
      </div>
      {coursesData.length === 0 ? (
        <p>Nenhum resultado encontrado...</p>
      ) : (
        <div ref={viewPortRef}>
          <ViewportList
            viewportRef={viewPortRef}
            items={coursesData}
            itemSize={100}
            initialPrerender={100}
            itemMargin={16}
          >
            {(course, index) => <CardCourse key={index} {...course} />}
          </ViewportList>
        </div>
      )}
    </div>
  );
};

export const getStaticProps = () => {
  const dataCourses: string[] = [];
  const dataUniversity: string[] = [];

  dataJson.forEach((item) => {
    let [courseName] = item.course.split(' - ');
    const couseNameString: string = courseName.trim();
    !dataCourses.includes(couseNameString) && dataCourses.push(couseNameString);
    !dataUniversity.includes(item.institution) &&
      dataUniversity.push(item.institution);
  });
  const data = {
    courses: dataCourses,
    shifts: ['Integral', 'Matutino', 'Noturno', 'Vespertino'],
    degrees: ['Licenciatura', 'Bacharelado'],
    universities: dataUniversity,
    initialCoursesData: dataJson,
  };

  return { props: { data } };
};

export default Home;
