import CardCourse from '@/components/CardCourse';
import data from '@/data/data.json';
import { useEffect, useState } from 'react';

interface ICourseData {
  institution: string;
  campus: string;
  course: string;
  cutoff_mark: number;
  group: string;
  shift: string;
}

const Home = () => {
  const [courses, setCourses] = useState<string[]>([]);
  const [couresData, setCouresData] = useState<ICourseData[]>(data);
  useEffect(() => {
    const dataCourses: string[] = [];
    data.forEach((item) => {
      let [courseName] = item.course.split('-');
      courseName = courseName.substring(0, courseName.length - 1);
      !dataCourses.includes(courseName) && dataCourses.push(courseName);
    });
    setCourses(dataCourses);
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

  return (
    <div className="h-screen flex items-center flex-col px-6 py-2">
      <div className="flex flex-col max-w-4xl py-4 gap-4">
        <h1 className="text-2xl font-mono">Notas de cortes - ENEM 2022</h1>
        <p>
          Olá! Este projeto foi criado como um projeto pessoal, já que eu tinha
          curiosidade em saber as notas de corte do ano anterior e o SISU só
          disponibiliza um arquivo{' '}
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
      <div className="py-2 w-56 ">
        <input
          type="text"
          list="data"
          placeholder="Todos os cursos"
          className="border-2 border-gray-50 rounded-md p-1"
          onChange={(e) => handleSelectCourse(e)}
        />
        <datalist id="data">
          {courses.map((item: string) => {
            return <option key={item}>{item}</option>;
          })}
        </datalist>
      </div>
      <div className="flex flex-col gap-4">
        {couresData.map((item: ICourseData, key: number) => (
          <CardCourse key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
