var MANUAL_DATA = [
  {"name":"中国国际大学生创新大赛","url":"https://cy.ncss.cn/"},
  {"name":"挑战杯全国大学生课外学术科技作品竞赛","url":"http://www.tiaozhanbei.net/"},
  {"name":"挑战杯中国大学生创业计划大赛","url":"http://www.chuangqingchun.net/"},
  {"name":"ACM-ICPC国际大学生程序设计竞赛","url":"https://icpc.global/"}
];

var WHITELIST_DATA = [];

function loadData() {
    try {
        var whitelistNames = WHITELIST_DATA.map(function(item) { return item.name; });
        var mergedData = MANUAL_DATA.map(function(item) {
            return {
                ...item,
                whitelist: whitelistNames.includes(item.name)
            };
        });
        window.contestData = mergedData;
        window.whitelistData = WHITELIST_DATA;
        return Promise.resolve(mergedData);
    } catch (error) {
        console.error('数据加载失败:', error);
        return Promise.resolve([]);
    }
}

function renderContests(contests) {
    var container = document.getElementById('card-grid') || document.getElementById('contest-list');
    if (!container) return;
    if (!contests || contests.length === 0) {
        container.innerHTML = '<p class="empty">暂无竞赛数据</p>';
        return;
    }
    container.innerHTML = contests.map(function(item) {
        return '<div class="contest-card' + (item.whitelist ? ' whitelist' : '') + '">' +
            (item.whitelist ? '<span class="badge">🏅 官方白名单</span>' : '') +
            '<h3>' + (item.name || '未命名竞赛') + '</h3>' +
            (item.url ? '<a href="' + item.url + '" target="_blank">查看官网</a>' : '') +
            (item.start_date ? '<p>开始时间：' + item.start_date + '</p>' : '') +
            (item.end_date ? '<p>结束时间：' + item.end_date + '</p>' : '') +
            (item.description ? '<p>' + item.description + '</p>' : '') +
            '</div>';
    }).join('');
}
