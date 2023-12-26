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
          <h1 className="text-2xl">Notas de cortes - ENEM 2023/1</h1>
          <p>
            O projeto foi desenvolvido para facilitar a visualização das notas
            de corte do Sistema de Seleção Unificada (SISU). A motivação surgiu
            da dificuldade em acessar as informações desejadas no arquivo{' '}
            <a
              className="text-blue-500 hover:text-blue-700 hover:underline"
              href="https://en.wikipedia.org/wiki/Microsoft_Excel#File_formats"
              target="_blank"
              rel="noreferrer"
            >
              XLSX
            </a>{' '}
            fornecido pelo SISU, que continha mais detalhes do que necessário.
          </p>
        </div>
        <div className="flex flex-col max-w-4xl py-4 gap-4 w-full gap-8">
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
