const { join } = require('path');
const { readdirSync, lstatSync } = require('fs');

const defaultLanguage = 'en';

// based on the directories get the language codes
const languages = readdirSync(__dirname).filter(fileName => {
  const joinedPath = join(__dirname, fileName);
  const isDirectory = lstatSync(joinedPath).isDirectory();
  return isDirectory;
});

// defaultLanguage as first
languages.splice(languages.indexOf(defaultLanguage), 1);
languages.unshift(defaultLanguage);

module.exports = {
  languages,
  defaultLanguage,
};
