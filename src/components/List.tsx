import { useRef, useMemo } from 'react';
import { ViewportList } from 'react-viewport-list';

import Card from './Card';

import { useFiltersFromLocation } from '@/hooks/useFiltersFromLocation';
import json from '@/data/data.json';

const List = () => {
  const viewPortRef = useRef(null);
  const { filters } = useFiltersFromLocation();

  const filteredData = useMemo(() => {
    if (Object.keys(filters).length === 0) {
      return [];
    }

    const { university, course } = filters;

    if (university && course) {
      return json.filter(
        (item) => item.institution === university && item.course === course
      );
    }

    if (university) {
      return json.filter((item) => item.institution === university);
    }

    if (course) {
      return json.filter((item) => item.course === course);
    }

    return [];
  }, [filters]);

  return filteredData.length === 0 ? (
    <p>Nenhum resultado encontrado...</p>
  ) : (
    <div
      ref={viewPortRef}
      className="flex flex-col gap-4 h-screen overflow-auto border box-border rounded max-w-4xl px-6"
    >
      <ViewportList
        viewportRef={viewPortRef}
        items={filteredData}
        itemSize={100}
        initialPrerender={100}
        itemMargin={16}
      >
        {(course, index) => <Card key={index} {...course} />}
      </ViewportList>
    </div>
  );
};

export default List;
