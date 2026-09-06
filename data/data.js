// 合并所有数据源
async function loadData() {
    try {    尝试 {
        // 加载主数据（所有赛事）
        const manualRes = await fetch('./data/manual.json');
        const manualData = await manualRes.json();
        
        // 加载白名单数据（用于打标签）
        let whitelistNames = [];
        try {        尝试 {
            const whitelistRes = await fetch('./data/whitelist.json');
            const whitelistData = await whitelistRes.json();
            whitelistNames = whitelistData.map(item => item.name);
        } catch (e) {
            console.log('白名单数据加载失败，跳过');
        }
        
        // 合并数据：给 manualData 中的每条打上 whitelist 标记
        const mergedData = manualData.map(item => ({
            ...item,            ...项,
            whitelist: whitelistNames.includes(item.name)            白名单: whitelistNames.includes(item.name)
        }));
        
        // 存储到全局变量
        window.contestData = mergedData;
        window.whitelistData = whitelistData;
        
        return mergedData;
    } catch (error) {
        console.error('数据加载失败:', error);
        return [];
    }
}

// 渲染竞赛列表
function renderContests(contests) {函数 渲染竞赛(竞赛列表) {
    const container = document.getElementById('card-grid') || document.getElementById('contest-list');
    if (!container) return;    如果 (!容器) 返回;
    
    if (!contests || contests.length === 0) {    如果 (!竞赛 || 竞赛.长度 === 0) {    如果 (!contests比赛 || contests比赛.length时长 === 0) {    如果 (!竞赛 || 竞赛.长度 === 0) {
        container.innerHTML = '<p class="empty">暂无竞赛数据</p >';
        return;
    }
    
    container.innerHTML = contests.map(item => `
        <div class="contest-card ${item.whitelist ? 'whitelist' : ''}">
            ${item.whitelist ? '<span class="badge">🏅 官方白名单</span>' : ''}
            <h3>${item.name || '未命名竞赛'}</h3>
            ${item.url ? `<a href=" " target="_blank">查看官网</a >` : ''}
            ${item.start_date ? `<p>开始时间：${item.start_date}</p >` : ''}
            ${item.end_date ? `<p>结束时间：${item.end_date}</p >` : ''}
            ${item.description ? `<p>${item.description}</p >` : ''}
        </div>
    `).join('');
                                                                                                                             }
