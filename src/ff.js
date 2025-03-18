const arr = [['https://wallhere.com/ Wallhere（多种类）'],

['https://avogadr.io/ Avogadr（可自定义化学式壁纸）'],

['https://gratisography.com/ Gratisography（脑洞设计师独立网站）'],

['https://digitalblasphemy.com/seeall.shtml?y=2020 Digital-Blasphemy（8K／按年份）'],

['http://desktopwallpapers.org.ua/ DesktopwallPapers（2W8+资源）'],

['https://www.wallpaperfusion.com/ Wallpaperfusion（4K／超宽屏）'],

['https://wallpapersite.com/ WallpaperSite（多种类）'],

['https://www.nasa.gov/multimedia/imagegallery/iotd.html NASA image of the Day（宇宙／星空）'],

['https://www.nastol.com.ua/ NASTOL（16W+资源）'],

['https://hdqwalls.com/ HDqwalls（多种类）'],

['https://www.eso.org/public/unitedkingdom/images/ Images（宇宙／星空）'],

['https://www.wallpapermaiden.com/ WallpaperMaiden（6K／多二次元）'],

['http://www.facets.la/ Facet（插画／矢量风）'],

['https://vlad.studio/zh/wallpapers/ Vladstudio（童话／绘本风）（需注册才能下载）'],

['http://justinmaller.com/ Justinmaller（插画／矢量风）'],

['https://www.dpm.org.cn/lights/royal.html 故宫壁纸'],

['https://www.gamewallpapers.com/ Gamewallpapers（游戏CG站）'],

['https://www.cgwallpapers.com/ CGwallpapers（CG壁纸）'],

['http://simpledesktops.com/browse/ Simpledesktops（极简主义）'],

['https://10wallpaper.com/cn/ 10Wallpaper（3W6+资源）'],

['https://wallroom.io/ Wallroom（插画风／2K／4K／5K）'],

['https://anime-pictures.net/ 动漫图片和壁纸'],

['https://wall.alphacoders.com/?lang=Chinese Wallpaper Abyss（84W+资源）'],

['https://zhutix.com/wallpaper/ 致美化（细化到同一系列作品）'],

['https://wallhaven.cc/ WallHave（70W+资源）'],

['https://desk.3gbizhi.com/ 3G壁纸'],

['http://pic.netbian.com/ 彼岸图网（4K壁纸／一个免费一天只能下载一张／1元可下载7张）'],

['https://bizhi.vercel.app/ 电脑壁纸'],

['http://wallls.com/ Wallls（多种类）'],

['https://cs-mod.ru/wallpapers/csgo CS-Mod（CS:GO壁纸）'],

['http://cn.gde-fon.com/ Gde-Fon（6W+资源）'],

['http://hddesktopwallpapers.in/ HDdesktopwallpapers（多分类）'],

['http://desk.zol.com.cn/ 中关村壁纸（4K／多分类）'],

['http://www.zhuoku.com/ 站酷壁纸（多种类）'],

['https://graffitiwallpaper.com/ GraffitiwallPaper（多种类）'],

['https://desktopwalls.net/ Desktopwalls（多种类）'],

['https://pixabay.com/images/search/desktop%20wallpaper/ Pixabay桌面壁纸'],

['https://www.pexels.com/search/desktop%20wallpaper/ Pexels桌面壁纸'],

['https://wallpaperfx.com/ WallpaperFX（多种类）'],

['https://librestock.com/ Librestock（多种类）'],

['https://pickywallpapers.com/ PickywallPaper（多种类）'],

['https://www.wallpaperup.com/ WallpaperUp（多种类）'],

['https://www.goodfon.com/ Goodfon（多种类／5K）'],

['https://www.obzhi.com/ 乌云壁纸（多种类）'],

['https://www.socwall.com/ Socwall（多风景）'],

['https://bing.ioliu.cn/ 必应壁纸（多风景）'],

['https://www.kwiatki.org/ Kwiatki（鲜花壁纸）'],

['https://www.moviemania.io/desktop Moviemania（网站没被墙，图片被墙）（电影壁纸）'],

['https://wallpaperscraft.com/ WallpapersCraft（8.4W+资源）'],

['https://bz.zzzmh.cn/index 极简壁纸']]

const obj = {}
const dd = arr.map(itemList => {
    const keyDesc = itemList[0].split(' ');
    const ffff = keyDesc[0].match('//([a-z0-9A-Z.-]+)\.(cn|com|org|io|net|in|ru|la|cc|gov|studio|app)');
    const name =  ffff ? ffff[1] : ''
    if (!name) {
        console.log(keyDesc[0])
        return;
    }
    obj[name] = {
        link: keyDesc[0],
        desc: [keyDesc[1]]
    };
    return {
        link: keyDesc[0],
        desc: [keyDesc[1]]
    }
})
console.log(JSON.stringify(obj));