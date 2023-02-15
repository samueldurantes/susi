import React, { useEffect, useRef, useState } from 'react';

import CardCourse from '@/components/CardCourse';
import data from '@/data/data.json';

type ICourseData = {
  institution: string;
  campus: string;
  course: string;
  cutoff_mark: number;
  group: string;
  shift: string;
};

const Home = () => {
  const [courses, setCourses] = useState(() => data.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const loaderRef = useRef(null);
  
    const [courses, setCourses] = useState<string[]>([]);
  const [couresData, setCouresData] = useState<ICourseData[]>(data);
  const [shifts, setShifts] = useState<string[]>([]);
  const [universities, setUniversities] = useState<string[]>([]);
  useEffect(() => {
    const dataCourses: string[] = [];
    const dataUniversity: string[] = [];
    data.forEach((item) => {
      let [courseName] = item.course.split('-');
      courseName = courseName.substring(0, courseName.length - 1);
      !dataCourses.includes(courseName) && dataCourses.push(courseName);
      !dataUniversity.includes(item.institution) &&
        dataUniversity.push(item.institution);
    });
    setCourses(dataCourses);
    setShifts(['Integral', 'Matutino', 'Noturno', 'Vespertino']);
    setUniversities(dataUniversity);
  }, []);

  const handleSelectCourse = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (courses.includes(event.target.value)) {
      const Data = [...data].filter((item) => {
        let [courseName] = item.course.split('-');
        courseName = courseName.substring(0, courseName.length - 1);
        return courseName === event.target.value;
      });
      setCouresData(Data);
    }
  };
  const handleSelectShift = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (shifts.includes(event.target.value)) {
      const Data = [...data].filter((item) => {
        return item.shift === event.target.value;
      });
      setCouresData(Data);
    }
  };

  const handleSelectUniversity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (universities.includes(event.target.value)) {
      const Data = [...data].filter((item) => {
        return item.institution === event.target.value;
      });
      setCouresData(Data);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setCurrentPage((old) => old + 1);
        setShowLoader(true);
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }, []);

  useEffect(() => {
    if (courses.length === data.length) {
      setShowLoader(false);
      return;
    }

    setTimeout(() => {
      setCourses((old) => data.slice(0, old.length + 5));
    }, 1500);
  }, [currentPage, courses, data]);

  return (
    <div className="h-screen flex items-center flex-col px-6 py-4">
      <div className="flex flex-col max-w-4xl py-4 gap-4">
        <h1 className="text-2xl font-mono">Notas de cortes - ENEM 2022</h1>
        <p>
          Olá! Esse projeto foi criado com intuito de facilitar a visualização
          das notas de corte do SISU, já que eu tinha curiosidade em saber as notas de
          corte do ano anterior e o SISU só disponibiliza um arquivo{' '}
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
      <div className="flex  gap-x-3">
        <div className="py-2">
          <input
            type="text"
            list="coursesData"
            placeholder="Todos os cursos"
            className="border-[1px] border-gray-50 rounded-md p-1"
            onChange={(e) => handleSelectCourse(e)}
          />
          <datalist id="coursesData">
            {courses.map((item: string) => {
              return <option key={item}>{item}</option>;
            })}
          </datalist>
        </div>
        <div className="py-2">
          <input
            type="text"
            list="shiftData"
            placeholder="Todos os turnos"
            className="border-[1px] border-gray-50 rounded-md p-1"
            onChange={(e) => handleSelectShift(e)}
          />
          <datalist id="shiftData">
            <option>Integral</option>
            <option>Matutino</option>
            <option>Noturno</option>
            <option>Vespertino</option>
          </datalist>
        </div>
        <div className="py-2">
          <input
            type="text"
            list="universityData"
            placeholder="Todas as Universidades"
            className="border-[1px] border-gray-50 rounded-md p-1"
            onChange={(e) => handleSelectUniversity(e)}
          />
          <datalist id="universityData">
            {universities.map((item: string, key: number) => {
              return <option key={key}>{item}</option>;
            })}
          </datalist>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {couresData.map((item: ICourseData, key: number) => (
          <CardCourse key={key} {...item} />
        ))}
      </div>
      {showLoader && (
        <div className="my-4" ref={loaderRef}>
          Carregando mais cursos...
        </div>
      )}
    </div>
  );
};

export default Home;
