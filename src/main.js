document.addEventListener('DOMContentLoaded', () => {
    // 侧边栏切换
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    
    sidebarCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // 页面切换
    const links = document.querySelectorAll('#sidebar ul li a');
    const sections = document.querySelectorAll('.content-section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有active类
            links.forEach(l => l.parentElement.classList.remove('active'));
            
            // 添加active类到当前点击的链接
            link.parentElement.classList.add('active');
            
            // 隐藏所有内容区域
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // 显示对应的内容区域
            const targetId = link.getAttribute('href').slice(1);
            document.getElementById(targetId).style.display = 'block';
        });
    });
});
