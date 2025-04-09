const fs = require('fs');
const path = require('path');
const json2md = require("json2md");
const allData = require('./src/index.js');
const promptData = require('./src/miniprompt/prompt.js');
const eatFood = require('./src/miniprompt/eat.js');
const { rimrafSync } = require('rimraf');

const jsonMkDownList = [];
const typekeys = Object.keys(allData);

const createFile = (file = './README.md', content) => {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, content, 'utf8');
}

const funUl = (item) => {
    if (item.desc) {
        return [{
            ul: item.desc.filter(it => it)
        }]
    }
    return [];
}

typekeys.forEach(item => {
    const subItem = allData[item];
    const subKyeys = Object.keys(subItem);
    jsonMkDownList.push({
        h3: item
    });
    subKyeys.map(ssItem => {
        jsonMkDownList.push({
            ul: subItem[ssItem].link ? [ssItem + ": " + subItem[ssItem].link].concat(funUl(subItem[ssItem])) : funUl(subItem[ssItem])
        })
    })
});


rimrafSync('./docs');

createFile('./docs/res.md', json2md(jsonMkDownList));

// 云静态数据
createFile('./dist/index.json5', JSON.stringify(allData));
createFile('./dist/minip.json5', JSON.stringify(promptData));
createFile('./dist/eatfood.json5', JSON.stringify(eatFood));
