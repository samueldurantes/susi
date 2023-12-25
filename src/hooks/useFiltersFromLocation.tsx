import { useRouter } from 'next/router';
import queryString from 'query-string';

export const useFiltersFromLocation = () => {
  const router = useRouter();

  const getFiltersFromLocation = () => {
    const { query } = router;
    const { filters } = query;

    if (!filters) {
      return {};
    }

    // Parse the filters string from the URL using query-string
    try {
      // @ts-ignore
      const parsedFilters = queryString.parse(filters);
      return parsedFilters;
    } catch (error) {
      console.error('Error parsing filters from location:', error);
      return {};
    }
  };

  // @ts-ignore
  const setFiltersToLocation = (newFilters) => {
    const { pathname, query } = router;
    const currentFilters = getFiltersFromLocation();

    // Merge the current filters with the new filters
    const mergedFilters = {
      ...currentFilters,
      ...newFilters,
    };

    // Convert the filters to a query string
    const filtersQueryString = queryString.stringify(mergedFilters);

    // Push the updated filters to the URL
    router.push({
      pathname,
      query: {
        ...query,
        filters: filtersQueryString,
      },
    });
  };

  return {
    filters: getFiltersFromLocation(),
    setFiltersToLocation,
  };
};
