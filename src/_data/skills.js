

const fetch = require('node-fetch');

const getSkills = async () => {
    const data = await fetch(`${process.env.CMS_URL}/api/skills?populate=*&sort[0]=id:asc`);
    const response = await data.json();

    const skills = response.data.map(skill => {
        return {
            ...skill.attributes
        }
    });

    return skills;
}

module.exports = getSkills;