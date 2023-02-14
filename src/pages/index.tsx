import Cards from '@/components/Card';
import data from '@/data/data.json';

const Home = () => {
  return (
    <div className="h-screen flex items-center flex-col py-2">
      <div className="flex flex-col gap-4">
        {data.map((item, key) => (
          <Cards key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
