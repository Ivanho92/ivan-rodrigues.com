const fetch = require('node-fetch');

const getProjects = async () => {
    const data = await fetch(`${process.env.CMS_URL}/api/experiences?populate=*`);
    const response = await data.json();

    const projectsObj = response.data.map(exp => {
        return { ...exp.attributes.projects }
    });
    
    const projectsArr = projectsObj.map(projectsSet => Object.values(projectsSet) );
    const flatProjects = projectsArr.flat();
    
    return flatProjects;
}

module.exports = getProjects;