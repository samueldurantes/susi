import { useEffect, useState } from 'react';

import { useFiltersFromLocation } from '@/hooks/useFiltersFromLocation';
import universitiesData from '@/data/universities.json';
import coursesData from '@/data/courses.json';
import coursesMapByUniversities from '@/data/coursesMapByUniversities.json';
import universitiesMapByCourses from '@/data/universitiesMapByCourses.json';

type SelectFieldProps = {
  defaultValue: string | null;
  values: string[];
  onChange?: any;
  disabled?: boolean;
};

const DEFAULT_VALUE = 'Selecione uma opção';

const SelectField = ({
  defaultValue,
  values,
  onChange,
  disabled = false,
}: SelectFieldProps) => {
  return (
    <>
      <select
        disabled={disabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={defaultValue ? defaultValue : DEFAULT_VALUE}
      >
        <option value="Selecione uma opção">Selecione uma opção</option>
        {values.map((value, key) => (
          <option value={value} key={value + key}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

const Filters = () => {
  const { filters, setFiltersToLocation } = useFiltersFromLocation();

  const [university, setUniversity] = useState<string | null>(null);
  const [course, setCourse] = useState<string | null>(null);

  const [universitiesAvailable, setUniversitiesAvailable] = useState<string[]>(
    []
  );
  const [coursesAvailable, setCoursesAvailable] = useState<string[]>([]);

  const formatValue = (value?: string | null) => {
    if (!value) {
      return undefined;
    }

    if (value === DEFAULT_VALUE) {
      return undefined;
    }

    return value;
  };

  useEffect(() => {
    if (university === DEFAULT_VALUE) {
      return;
    }

    if (course === DEFAULT_VALUE) {
      return;
    }

    if (!!filters || Object.keys(filters).length > 0) {
      if (typeof filters.university === 'string' && !university) {
        setUniversity(filters.university);
      }

      if (typeof filters.course === 'string' && !course) {
        setCourse(filters.course);
      }
    }
  }, [filters, course, university]);

  useEffect(() => {
    const universityFormated = formatValue(university);
    const courseFormated = formatValue(course);

    if (!universityFormated && !courseFormated) {
      setCoursesAvailable(coursesData.sort());
      setUniversitiesAvailable(universitiesData.sort());

      return;
    }

    if (universityFormated) {
      // @ts-ignore
      setCoursesAvailable(coursesMapByUniversities[university]);

      return;
    }

    if (courseFormated) {
      // @ts-ignore
      setUniversitiesAvailable(universitiesMapByCourses[course]);

      return;
    }

    setUniversitiesAvailable([]);
    setCoursesAvailable([]);
  }, [filters, university, course]);

  const handleApplyFilters = () => {
    const filters = {
      university: formatValue(university),
      course: formatValue(course),
    };

    setFiltersToLocation(filters);
  };

  return (
    <div className="flex items-center flex-col gap-2 sm:flex-row">
      <SelectField
        defaultValue={university ? university : null}
        values={universitiesAvailable}
        onChange={(event: any) => {
          if (event.target.selectedOptions[0].label === DEFAULT_VALUE) {
            setUniversity(DEFAULT_VALUE);

            return;
          }

          setUniversity(event.target.selectedOptions[0].label);
        }}
      />
      <SelectField
        defaultValue={course ? course : null}
        values={coursesAvailable}
        onChange={(event: any) => {
          if (event.target.selectedOptions[0].label === DEFAULT_VALUE) {
            setCourse(DEFAULT_VALUE);

            return;
          }

          setCourse(event.target.selectedOptions[0].label);
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={() => handleApplyFilters()}
      >
        Aplicar
      </button>
    </div>
  );
};

export default Filters;
