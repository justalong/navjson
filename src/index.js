const wall = require('./normalnav/wall.js');
const ppt = require('./normalnav/ppt.js');
const tool = require('./normalnav/tool.js');
const pdf = require('./normalnav/pdf.js');
const clean = require('./normalnav/clean.js');
const appbuy = require('./normalnav/appbuy.js');
const audio = require('./normalnav/audio.js');
const study = require('./normalnav/study.js');
const ebook = require('./normalnav/ebook.js');
const move = require('./normalnav/move.js');
const music = require('./normalnav/music.js');
const mess = require('./normalnav/mess.js');

module.exports = {
    "更新时间": {
        "v8": {
            "link":"2025/5/03",
            "desc": ["更新预览/工资性价比计算/白噪音/app购买优惠"]
        },
        "v7": {
            "link":"2025/4/16",
            "desc": ["更新office和图片素材"]
        },
        "v6": {
            "link":"2025/4/14",
            "desc": ["更新工具和桌面清理"]
        },
        "v5": {
            "link":"2025/4/02",
            "desc": ["更新工具集合"]
        },
        "v4": {
            "link":"2025/4/01",
            "desc": ["更新开源资讯网站"]
        },
        "v3": {
            "link":"2025/3/24",
            "desc": ["更新ppt网站"]
        },
        "v2": {
            "link":"2025/3/18",
            "desc": ["更新壁纸网站"]
        },
        "v1": {
            "link":"2025/3/13",
            "desc": ["更新内容电子书网站国外版本"]
        }
    },
    "网盘资源": {
        "音乐": {
            "link": "https://pan.baidu.com/s/1Y8HPkLOzpSQXvVjGdQi2pA?pwd=iy8q"
        },
        "录屏截屏": {
            "link": "https://pan.baidu.com/s/1vnLSEKS4zLunRhkHekCV3Q?pwd=e3fk"
        },
        "跳过广告": {
            "link": "https://pan.baidu.com/s/1Z7kcxCzpaXGmh2hzK4s7lQ?pwd=cqr6"
        },
        "压缩包": {
            "link": "https://pan.baidu.com/s/1E0nB5K6oFjoOPCH-kPv5_w?pwd=16t3"
        }
    },
    ...wall,
    ...ppt,
    ...tool,
    ...pdf,
    ...study,
    ...clean,
    ...appbuy,
    ...audio,
    ...ebook,
    ...move,
    ...music,
    ...mess,
    "总导航": {
        "导航": {
            "link": "https://github.com/justalong/navjson/blob/main/docs/res.md",
            "desc": [""]
        }
    },
}
