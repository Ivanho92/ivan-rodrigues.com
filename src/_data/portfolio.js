const fetch = require('node-fetch');

const getPortfolio = async () => {
    const data = await fetch(`${process.env.CMS_URL}/api/portfolios?populate=*&sort[0]=updatedAt:desc`);
    const response = await data.json();

    const portfolio = response.data.map(record => {
        return {
            ...record.attributes
        }
    });

    return portfolio;
}

module.exports = getPortfolio;