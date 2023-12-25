import Head from 'next/head';

import Filters from '@/components/Filters';
import { config } from '@/config';
import List from '@/components/List';

const Home = () => {
  const head = {
    title: 'susi',
    description: 'Um simples visualizador de notas de cortes do SISU',
  };

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />

        <meta property="og:title" content={head.title} />
        <meta property="og:description" content={head.description} />

        <meta property="og:url" content={config.HOST} />
      </Head>

      <div className="h-screen flex items-center flex-col px-6 py-4">
        <div className="flex flex-col max-w-4xl py-4 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">Notas de cortes - ENEM</h1>
            <select name="year" id="year" className="text-2xl">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <p>
            Esse projeto foi criado com intuito de facilitar a visualização das
            notas de corte do SISU, já que eu tinha curiosidade em saber as
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
        <div className="flex flex-col max-w-4xl py-4 gap-4 w-full gap-10">
          <Filters />
          <div className="flex justify-center">
            <List />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
