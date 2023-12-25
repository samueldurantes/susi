const fs = require('fs');
const path = require('path');
const json = require('../src/data/data.json');

const coursesByInstitution = (data) => {
  const result = {};

  data.forEach((entry) => {
    const { institution, course } = entry;

    if (!result[institution]) {
      result[institution] = [course];
    } else {
      if (!result[institution].includes(course)) {
        result[institution].push(course);
      }
    }
  });

  return result;
};

const institutionByCourses = (data) => {
  const result = {};

  data.forEach((item) => {
    const { course, institution } = item;

    if (!result[course]) {
      result[course] = [institution];
    } else if (!result[course].includes(institution)) {
      result[course].push(institution);
    }
  });

  return result;
};

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'data', `universitiesMapByCourses.json`),
  JSON.stringify(institutionByCourses(json), null, 2)
);

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'data', `coursesMapByUniversities.json`),
  JSON.stringify(coursesByInstitution(json), null, 2)
);
