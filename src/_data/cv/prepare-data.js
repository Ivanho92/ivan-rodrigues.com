const fetch = require("node-fetch");
const moment = require("moment");
const chalk = require("chalk");
const { convert } = require("html-to-text");

const convertHTMLtoText = (data) =>
  convert(data, { wordwrap: false, preserveNewlines: true, ignoreHref: true });

const formatExperience = (exp) => {
  const periodStart = moment(exp.attributes.startDate).format("MMM YYYY");
  const periodEnd = exp.attributes.endDate
    ? moment(exp.attributes.endDate).format("MMM YYYY")
    : "Current";
  const period = periodStart + " - " + periodEnd;

  // console.log(exp);

  let tasks = false;

  if (exp.attributes.tasks) {
    tasks = {
      tasksTitle: exp.attributes.tasks?.tasksTitle,
      items: exp.attributes.tasks?.items.map((item) => item.item),
    };
  }

  return {
    title: exp.attributes.title,
    period,
    description: convertHTMLtoText(exp.attributes.description),
    tasks,
  };
};

const formatEducation = (educ) => {
  const periodStart = moment(educ.startDate).format("MMM YYYY");
  const periodEnd = educ.endDate
    ? moment(educ.endDate).format("MMM YYYY")
    : "Current";
  const period = periodStart + " - " + periodEnd;

  return {
    title: educ.title,
    school: educ.school,
    period,
    description: convertHTMLtoText(educ.description),
    degree: educ.degree,
  };
};

const loadExperiences = async () => {
  const data = await fetch(
    `${process.env.CMS_URL}/api/experiences?populate=projects,tasks.items&sort=startDate:desc`,
  );
  const response = await data.json();

  const transformedExperiences = {
    latestExperience: formatExperience(response.data[0]),
    otherExperiences: response.data.slice(1).map((exp) => formatExperience(exp)),
  };

  // console.log(chalk.yellow("experiences"));
  // console.log(transformedExperiences);

  return transformedExperiences;
};

const loadEducation = async () => {
  const data = await fetch(`${process.env.CMS_URL}/api/resume?populate=*`);
  const response = await data.json();

  const transformedEducation = {
    education: response.data.attributes.education.map((educ) =>
      formatEducation(educ),
    ),
  };

  // console.log(chalk.yellow("education"));
  // console.log(transformedEducation);

  return transformedEducation;
};

const loadSkills = async () => {
  const data = await fetch(`${process.env.CMS_URL}/api/skills?populate=*`);
  const response = await data.json();

  const frontEndSkills = [];
  const backEndSkills = [];
  const otherSkills = [];

  response.data.map((skillsCategory) => {
    skillsCategory.attributes.keywords.map((keyword) => {
      if (keyword.cvCategory === "frontend") {
        frontEndSkills.push(keyword.skill);
      }
      if (keyword.cvCategory === "backend") {
        backEndSkills.push(keyword.skill);
      }
      if (keyword.cvCategory === "others") {
        otherSkills.push(keyword.skill);
      }
    });
  });

  return {
    frontEndSkills: frontEndSkills.join(" • "),
    backEndSkills: backEndSkills.join(" • "),
    otherSkills: otherSkills.join(" • "),
  };
};

const loadLanguages = async () => {
  const data = await fetch(`${process.env.CMS_URL}/api/resume?populate=languages`);
  const response = await data.json();

  return response.data.attributes.languages.map((lang) => ({
    language: lang.language,
    level: lang.level,
  }));
};

const prepareData = async () => {
  const experiences = await loadExperiences();
  const education = await loadEducation();

  const { frontEndSkills, backEndSkills, otherSkills } = await loadSkills();

  const languages = await loadLanguages();

  const returnData = {
    firstName: "Ivan",
    lastName: "Rodrigues",
    position: "Web Developer",

    ...experiences,
    ...education,

    frontEndSkills,
    backEndSkills,
    otherSkills,

    languages,
  };

  return returnData;
};

module.exports = {
  prepareData,
};
