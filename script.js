const textArea = document.getElementById('textArea');
const charCount = document.getElementById('charCount');
const charLimit = document.getElementById('charLimit');
const titleInput = document.getElementById('titleInput');
const titleFixBtn = document.getElementById('titleFixBtn');
const mainTitle = document.getElementById('mainTitle');

let titleFixed = false;

function updateCharCount() {
    const currentLength = textArea.value.length;
    const limit = parseInt(charLimit.value) || 400;
    
    charCount.textContent = `${currentLength}/${limit}`;
    
    if (currentLength > limit) {
        charCount.classList.add('over-limit');
    } else {
        charCount.classList.remove('over-limit');
    }
}

function setLimit(limit) {
    charLimit.value = limit;
    updateCharCount();
}

function fixTitle() {
    const title = titleInput.value.trim();
    if (title) {
        titleFixed = true;
        titleInput.disabled = true;
        titleFixBtn.disabled = true;
        titleFixBtn.textContent = '固定済み';
        mainTitle.innerHTML = `📝 ${title}`;
        document.title = title;
    }
}

titleFixBtn.addEventListener('click', fixTitle);

// Enterキーでもタイトルを固定
titleInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !titleFixed) {
        fixTitle();
    }
});

textArea.addEventListener('input', updateCharCount);
charLimit.addEventListener('input', updateCharCount);

// 初期化
updateCharCount();

// 自動保存機能（ローカルストレージは使用不可のため、セッション中のみ保持）
let autoSaveData = '';
textArea.addEventListener('input', function() {
    autoSaveData = textArea.value;
});

// ページ離脱時の警告
window.addEventListener('beforeunload', function(e) {
    if (textArea.value.trim().length > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});