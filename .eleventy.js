const slugify = require("slugify");
const moment = require("moment");

module.exports = (config) => {
    // Markdown library
    let markdownIt = require("markdown-it");
    let options = {
        html: true,
        breaks: true,
        linkify: true,
    };

    // Set markdown parser for md files
    config.setLibrary("md", markdownIt(options));

    // Creates a markdown filter for rendering
    const md = new markdownIt(options);
    config.addFilter("markdown", (content) => {
        return md.render(content);
    });

    // Date formatting
    config.addFilter("date", (date, format) => {
        const dateObj = date == 'now' ? new Date() : new Date(date);
        const formattedDate = moment(dateObj).format(format);
        return formattedDate;
    });

    // Slugify
    config.addFilter("slugify", (text) => {
        return slugify(text, {
            lower: true,
            trim: true,
        });
    });

    // Update front-end based on css changes
    config.setBrowserSyncConfig({
        files: ["./dist/css/**/*.css", "./dist/js/**/*.js"],
    });

    // Pass throughs (js, favicon, ...)
    config.addPassthroughCopy("./src/public/css");
    config.addPassthroughCopy("./src/public/js");
    config.addPassthroughCopy("./src/public/favicon.png");
    config.addPassthroughCopy("./src/public/img");

    // Collections
    // config.addCollection("projects", (collection) => {
    //     return collection.getFilteredByGlob("./src/projects/*.md");
    // });

    return {
        dataTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",

        dir: {
            input: "src",
            output: "dist",
        },
    };
};
