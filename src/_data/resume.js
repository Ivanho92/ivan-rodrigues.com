const fetch = require('node-fetch');

const getAge = dateString => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getResume = async () => {
    const data = await fetch(`${process.env.CMS_URL}/api/resume?populate=*`);
    const response = await data.json();

    const { cv, profilePicture, header, about, education } = response.data.attributes;

    return {
        cv,
        profilePicture,
        header,
        about,
        education,
        age: getAge('02/03/1992')
    };
}

module.exports = getResume;