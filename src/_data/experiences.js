const fetch = require("node-fetch");

const getExperiences = async () => {
  const data = await fetch(
    `${process.env.CMS_URL}/api/experiences?populate=projects,tasks.items&sort=startDate:desc`,
  );
  const response = await data.json();

  const experiences = response.data.map((exp) => {
    return {
      id: exp.id,
      ...exp.attributes,
    };
  });

  return experiences;
};

module.exports = getExperiences;
