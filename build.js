const fs = require('fs');
const path = require('path');
const json2md = require("json2md");
const allData = require('./src/index.js');
const promptData = require('./src/miniprompt/prompt.js');
const eatFood = require('./src/miniprompt/eat.js');
const ainavTool = require('./src/ainav/ainav_tool.js');
const { sortByMonthlyVisits } = require('./src/utils/index.js');
const { rimrafSync } = require('rimraf');

// console.log(sortByMonthlyVisits(ainavTool), 'sortByMonthlyVisits')
// process.exit(0)
// 导入quick-test模块
const { quickTest } = require('./quick-test.js');

const jsonMkDownList = [];

const createFile = (file = './README.md', content) => {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, content, 'utf8');
}

const funUl = (item) => {
    let arr = [item.link];
    if (item.canuse) {
        arr.unshift(`可用性-${item.canuse}；${item.monthlyVisits ? `月访问-${item.monthlyVisits}` : ''}`)
    }
    if (item.desc) {
        return [{
            ul: arr.concat(item.desc.filter(it => it))
        }]
    }
    return arr;
}

// 执行构建的主要函数
async function build(quickBuild = false) {
    console.log('🚀 开始构建过程...\n');
    
    let testResults = null;
    
    // 第一步：执行网络联通性测试（除非是快速构建）
    if (!quickBuild) {
        console.log('第一步：执行网络联通性测试');
        try {
            testResults = await quickTest();
            console.log('✅ 网络联通性测试完成\n');
        } catch (error) {
            console.error('⚠️  网络测试失败，继续构建过程...', error.message);
        }
    } else {
        console.log('第一步：跳过网络联通性测试（快速构建模式）\n');
    }
    
    // 第二步：对数据进行排序
    console.log('第二步：对数据进行排序');
    
    // 使用测试后的数据或原始数据进行排序
    const rawData = testResults?.allData?.data || allData;
    const sortedData = sortByMonthlyVisits(rawData);
    console.log('✅ 数据排序完成\n');
    
    // 第三步：生成markdown文档
    console.log('第三步：生成文档');
    
    const typekeys = Object.keys(sortedData);
    
    typekeys.forEach(item => {
        const subItem = sortedData[item];
        const subKyeys = Object.keys(subItem);
        jsonMkDownList.push({
            h3: item
        });
        subKyeys.map(ssItem => {
            jsonMkDownList.push({
                ul: [ssItem].concat(funUl(subItem[ssItem]))
            })
        })
    });

    // 清理并创建输出目录
    rimrafSync('./docs');
    rimrafSync('./dist');
    
    // 创建文档
    console.log(jsonMkDownList, 'jsonMkDownList')
    createFile('./docs/res.md', json2md(jsonMkDownList));
    
    // 第四步：生成数据文件
    console.log('\n第四步：生成数据文件');
    
    // 使用测试后的数据
    const finalAinavTool = testResults?.ainavTool?.data || ainavTool;
    const sortedDataAi = sortByMonthlyVisits(finalAinavTool);
    
    // 云静态数据 - 使用排序后的数据
    createFile('./dist/index.json5', JSON.stringify(sortedData));
    createFile('./dist/minip.json5', JSON.stringify(promptData));
    createFile('./dist/eatfood.json5', JSON.stringify(eatFood));
    
    console.log('✅ 常规数据文件生成完成');
    
    // 第五步：单独处理ainav_tool
    console.log('\n第五步：单独构建ainav_tool');
    
    // 新增：创建ainav_tool的json5压缩版本
    createFile('./dist/ainav_tool.json5', JSON.stringify(sortedDataAi));
    
    // 新增：为ainav_tool生成markdown文档
    const ainavMkDownList = [];
    const ainavTypekeys = Object.keys(sortedDataAi);

    ainavTypekeys.forEach(item => {
        const subItem = sortedDataAi[item];
        const subKyeys = Object.keys(subItem);
        ainavMkDownList.push({
            h3: item
        });
        subKyeys.map(ssItem => {
            ainavMkDownList.push({
                ul: [ssItem].concat(funUl(subItem[ssItem]))
            })
        })
    });

    createFile('./docs/ainav_tool.md', json2md(ainavMkDownList));
    
    console.log('✅ ainav_tool构建完成');
    console.log(`📁 生成文件: 
    - ./dist/ainav_tool.json5 (压缩JSON5格式)
    - ./docs/ainav_tool.md (markdown文档)`);
    
    console.log('\n🎉 构建完成！');
    console.log('📊 构建统计:');
    console.log(`  - 文档文件: 2 个`);
    console.log(`  - 数据文件: ${fs.readdirSync('./dist').length} 个`);
    console.log(`  - 总大小: ${(fs.readdirSync('./dist').reduce((total, file) => {
        return total + fs.statSync(path.join('./dist', file)).size;
    }, 0) / 1024).toFixed(2)} KB`);
    
    if (testResults) {
        console.log(`\n🔍 网络测试摘要:`);
        console.log(`  - allData: ${testResults.allData.results.filter(r => r.canuse === '是').length}/${testResults.allData.results.length} 可用`);
        console.log(`  - ainavTool: ${testResults.ainavTool.results.filter(r => r.canuse === '是').length}/${testResults.ainavTool.results.length} 可用`);
    }
}

// 如果是直接执行这个文件，则运行构建
if (require.main === module) {
    const args = process.argv.slice(2);
    const quickBuild = args.includes('--quick');
    build(quickBuild).catch(console.error);
}

module.exports = { build };
