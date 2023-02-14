import CardCourse from '@/components/CardCourse';
import data from '@/data/data.json';

const Home = () => {
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
      <div className="flex flex-col gap-4">
        {data.map((item, key) => (
          <CardCourse key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
