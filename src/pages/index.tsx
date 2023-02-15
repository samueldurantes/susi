import { useEffect, useRef, useState } from 'react';

import CardCourse from '@/components/CardCourse';
import dataJson from '@/data/data.json';

const Home = () => {
  const data: any[] = dataJson;

  const [courses, setCourses] = useState(() => data.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const loaderRef = useRef(null);

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
      <div className="flex flex-col gap-4">
        {courses.map((item, key) => (
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
