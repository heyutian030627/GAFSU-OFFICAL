const fs = require('fs');
const path = require('path');

// 修复单个文件的语言切换功能
function fixFile(filePath) {
    try {
        // 读取文件内容
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // 找到JavaScript部分
        const scriptStart = content.indexOf('<script>');
        const scriptEnd = content.lastIndexOf('</script>');
        
        if (scriptStart === -1 || scriptEnd === -1) {
            console.log(`跳过 ${filePath}：未找到完整的script标签`);
            return;
        }
        
        // 提取并修复JavaScript代码
        let scriptContent = content.substring(scriptStart, scriptEnd + 9); // 9是</script>的长度
        
        // 修复switchLanguage函数的语法错误
        const fixedScript = scriptContent.replace(/        document.addEventListener\('DOMContentLoaded', function\(\) \{\n            // Language Switching Functionality\n            function switchLanguage\(lang\) \{\n                // Save language preference to localStorage\n                localStorage.setItem\('gafsuLanguage', lang\);\n                \n                // Hide all elements with data-lang attribute\n                const allLangElements = document.querySelectorAll\('[data-lang]'\);\n                allLangElements.forEach\(el => \{\n                    el.classList.add\('hidden'\);\n                \n        // Mobile Menu Toggle\n        const mobileMenuButton = document.querySelector\('.mobile-menu-button'\);\n        const mobileMenu = document.querySelector\('.mobile-menu'\);\n        \n        if \(mobileMenuButton && mobileMenu\) \{\n            mobileMenuButton.addEventListener\('click', function\(\) \{\n                mobileMenu.classList.toggle\('hidden'\);\n            \});\n        \}\n        \n        // Language Switching for Navigation\n        function switchLanguageForNavigation\(lang\) \{\n            // Update language button states\n            const langButtons = document.querySelectorAll\('.lang-btn'\);\n            langButtons.forEach\(btn => \{\n                btn.classList.remove\('bg-blue-600', 'text-white', 'shadow-sm'\);\n                btn.classList.add\('bg-gray-800/50', 'text-gray-300'\);\n            \});\n            \n            // Highlight the active language button\n            const activeButtons = document.querySelectorAll\(`#lang\$\{lang === 'zh' ? 'Zh' : 'En'\}, #mobileLang\$\{lang === 'zh' ? 'Zh' : 'En'\}`\);\n            activeButtons.forEach\(btn => \{\n                btn.classList.add\('bg-blue-600', 'text-white', 'shadow-sm'\);\n                btn.classList.remove\('bg-gray-800/50', 'text-gray-300'\);\n            \});\n        \}\n        \n        // Add click event listeners to language buttons for navigation\n        const langZhButtons = document.querySelectorAll\('#langZh, #mobileLangZh'\);\n        const langEnButtons = document.querySelectorAll\('#langEn, #mobileLangEn'\);\n        \n        langZhButtons.forEach\(btn => \{\n            btn.addEventListener\('click', \(\) => \{\n                switchLanguage\('zh'\);\n                switchLanguageForNavigation\('zh'\);\n            \});\n        \}\);\n        \n        langEnButtons.forEach\(btn => \{\n            btn.addEventListener\('click', \(\) => \{\n                switchLanguage\('en'\);\n                switchLanguageForNavigation\('en'\);\n            \});\n        \}\);\n        \n        // Initialize language for navigation\n        const savedLanguage = localStorage.getItem\('gafsuLanguage'\) || 'zh';\n        switchLanguageForNavigation\(savedLanguage\);\n\}\);\n                \n                // Show only elements with the selected language\n                const langElements = document.querySelectorAll\(`[data-lang="\$\{lang\}"]`\);\n                langElements.forEach\(el => \{\n                    el.classList.remove\('hidden'\);\n                \}\);\n            \}\n            \n            // Check if there's a saved language preference\n            const savedLanguage = localStorage.getItem\('gafsuLanguage'\) || 'zh';\n            switchLanguage\(savedLanguage\);\n        \}\);/, 
        `        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }
            
            // Language Switching Functionality
            function switchLanguage(lang) {
                // Save language preference to localStorage
                localStorage.setItem('gafsuLanguage', lang);
                
                // Hide all elements with data-lang attribute
                const allLangElements = document.querySelectorAll('[data-lang]');
                allLangElements.forEach(el => {
                    el.classList.add('hidden');
                });
                
                // Show only elements with the selected language
                const langElements = document.querySelectorAll(`[data-lang="${lang}"]`);
                langElements.forEach(el => {
                    el.classList.remove('hidden');
                });
            }
            
            // Language Switching for Navigation
            function switchLanguageForNavigation(lang) {
                // Update language button states
                const langButtons = document.querySelectorAll('.lang-btn');
                langButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
                    btn.classList.add('bg-gray-800/50', 'text-gray-300');
                });
                
                // Highlight the active language button
                const activeButtons = document.querySelectorAll(`#lang${lang === 'zh' ? 'Zh' : 'En'}, #mobileLang${lang === 'zh' ? 'Zh' : 'En'}`);
                activeButtons.forEach(btn => {
                    btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
                    btn.classList.remove('bg-gray-800/50', 'text-gray-300');
                });
            }
            
            // Add click event listeners to language buttons for navigation
            const langZhButtons = document.querySelectorAll('#langZh, #mobileLangZh');
            const langEnButtons = document.querySelectorAll('#langEn, #mobileLangEn');
            
            langZhButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    switchLanguage('zh');
                    switchLanguageForNavigation('zh');
                });
            });
            
            langEnButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    switchLanguage('en');
                    switchLanguageForNavigation('en');
                });
            });
            
            // Initialize language
            const savedLanguage = localStorage.getItem('gafsuLanguage') || 'zh';
            switchLanguage(savedLanguage);
            switchLanguageForNavigation(savedLanguage);
        });`);
        
        // 将修复后的脚本替换回原文件
        const newContent = content.replace(scriptContent, fixedScript);
        fs.writeFileSync(filePath, newContent, 'utf-8');
        
        console.log(`已修复 ${filePath}`);
        
    } catch (error) {
        console.error(`修复 ${filePath} 时出错：`, error.message);
    }
}

// 修复所有高校页面
function fixAllUniversityPages() {
    const currentDir = process.cwd();
    const universityFiles = require('fs').readdirSync(currentDir)
        .filter(file => file.startsWith('university_') && file.endsWith('.html'));
    
    console.log(`找到 ${universityFiles.length} 个高校页面文件`);
    
    universityFiles.forEach(file => {
        fixFile(path.join(currentDir, file));
    });
    
    console.log('所有高校页面修复完成！');
}

// 执行修复
fixAllUniversityPages();
