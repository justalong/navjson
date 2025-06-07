const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 快速测试单个URL（更短的超时时间）
function quickTestUrl(url, timeout = 5000) {
    return new Promise((resolve) => {
        try {
            const urlObj = new URL(url);
            const isHttps = urlObj.protocol === 'https:';
            const client = isHttps ? https : http;
            
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port || (isHttps ? 443 : 80),
                path: '/',
                method: 'HEAD',
                timeout: timeout,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; NetworkTester/1.0)'
                }
            };

            const req = client.request(options, (res) => {
                resolve(res.statusCode >= 200 && res.statusCode < 500 ? '是' : '否');
            });

            req.on('error', () => resolve('否'));
            req.on('timeout', () => {
                req.destroy();
                resolve('否');
            });

            req.setTimeout(timeout);
            req.end();
        } catch (error) {
            resolve('否');
        }
    });
}

// 为数据添加canuse字段
function addCanUseField(data, testResults) {
    const result = JSON.parse(JSON.stringify(data)); // 深拷贝
    
    Object.keys(result).forEach(categoryName => {
        const category = result[categoryName];
        Object.keys(category).forEach(itemName => {
            const item = category[itemName];
            if (item.link) {
                const testResult = testResults.find(r => r.url === item.link);
                item.canuse = testResult ? testResult.canuse : '未测试';
            } else {
                item.canuse = '无链接';
            }
        });
    });
    
    return result;
}

// 测试ainav_tool数据
async function testAinavTool() {
    console.log('📋 测试 ainav_tool 数据...');
    
    const ainavTool = require('./src/ainav/ainav_tool.js');
    
    // 提取所有URL进行测试
    const allItems = [];
    Object.keys(ainavTool).forEach(categoryName => {
        const category = ainavTool[categoryName];
        Object.keys(category).forEach(itemName => {
            const item = category[itemName];
            if (item.link) {
                allItems.push({
                    title: itemName,
                    url: item.link,
                    category: categoryName,
                    desc: item.desc
                });
            }
        });
    });
    
    console.log(`📊 ainav_tool 总共需要测试 ${allItems.length} 个网站`);
    
    const testResults = await performBatchTest(allItems, 'ainav_tool');
    const resultData = addCanUseField(ainavTool, testResults);
    
    return { data: resultData, results: testResults };
}

// 测试allData数据
async function testAllData() {
    console.log('\n📋 测试 allData 数据...');
    
    const allData = require('./src/index.js');
    
    // 提取所有URL进行测试
    const allItems = [];
    Object.keys(allData).forEach(categoryName => {
        const category = allData[categoryName];
        Object.keys(category).forEach(itemName => {
            const item = category[itemName];
            if (item.link && !item.link.includes('2025/') && !item.link.includes('pan.baidu.com')) {
                // 排除时间链接和网盘链接
                allItems.push({
                    title: itemName,
                    url: item.link,
                    category: categoryName,
                    desc: item.desc
                });
            }
        });
    });
    
    console.log(`📊 allData 总共需要测试 ${allItems.length} 个网站`);
    
    const testResults = await performBatchTest(allItems, 'allData');
    const resultData = addCanUseField(allData, testResults);
    
    return { data: resultData, results: testResults };
}

// 执行批量测试
async function performBatchTest(allItems, dataType) {
    const batchSize = 10;
    let completedCount = 0;
    let availableCount = 0;
    const testResults = [];
    
    for (let i = 0; i < allItems.length; i += batchSize) {
        const batch = allItems.slice(i, i + batchSize);
        
        const promises = batch.map(async (item) => {
            const result = await quickTestUrl(item.url);
            completedCount++;
            
            if (result === '是') {
                availableCount++;
            }
            
            const progress = ((completedCount / allItems.length) * 100).toFixed(1);
            const status = result === '是' ? '✅' : '❌';
            console.log(`[${dataType}] [${progress}%] ${status} ${item.title}: ${result}`);
            
            const testResult = { ...item, canuse: result };
            testResults.push(testResult);
            return testResult;
        });
        
        await Promise.all(promises);
    }
    
    console.log(`\n${dataType} 测试统计:`);
    console.log(`📊 总计: ${allItems.length} 个网站`);
    console.log(`✅ 可用: ${availableCount} 个`);
    console.log(`❌ 不可用: ${allItems.length - availableCount} 个`);
    console.log(`📈 可用率: ${((availableCount / allItems.length) * 100).toFixed(2)}%`);
    
    return testResults;
}

// 主函数
async function quickTest() {
    console.log('🚀 开始快速网络测试...\n');
    
    try {
        console.log('网络连通性测试');
        console.log('=' * 50);
        
        // 测试ainav_tool
        const ainavResult = await testAinavTool();
        
        // 测试allData
        const allDataResult = await testAllData();
        
        console.log(`\n🎉 全部测试完成！`);
        
        return {
            ainavTool: ainavResult,
            allData: allDataResult
        };
        
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        throw error;
    }
}

// 命令行参数处理
function handleCliArgs() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
📋 使用说明:
  node quick-test.js          # 执行网络连通性测试
  node quick-test.js --help   # 显示帮助信息

🔧 功能说明:
  网络连通性测试: 批量测试所有网站的可访问性
        `);
        return;
    }
    
    // 默认执行网络测试
    quickTest();
}

// 运行测试
if (require.main === module) {
    handleCliArgs();
}

// 导出函数供其他模块使用
module.exports = {
    quickTestUrl,
    quickTest,
    testAinavTool,
    testAllData,
    addCanUseField
}; 