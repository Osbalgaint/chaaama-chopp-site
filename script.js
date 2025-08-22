// Função para carregar dados salvos do localStorage
function loadSavedData() {
    const elements = document.querySelectorAll('[data-edit="text"]');
    elements.forEach(el => {
        const key = el.id || el.textContent.trim(); // Use id ou texto como chave
        const saved = localStorage.getItem(key);
        if (saved) el.textContent = saved;
    });
    const images = document.querySelectorAll('[data-edit="image"]');
    images.forEach(img => {
        const key = img.alt;
        const savedSrc = localStorage.getItem(key);
        if (savedSrc) img.src = savedSrc;
    });
}

// Função para ativar/desativar modo edição
const editBtn = document.getElementById('editModeBtn');
let editMode = false;
editBtn.addEventListener('click', () => {
    editMode = !editMode;
    editBtn.textContent = editMode ? 'Salvar e Sair do Modo Edição' : 'Ativar Modo Edição';
    const texts = document.querySelectorAll('[data-edit="text"]');
    texts.forEach(el => {
        el.contentEditable = editMode;
    });
    if (!editMode) {
        // Salvar mudanças
        texts.forEach(el => {
            const key = el.id || el.textContent.trim();
            localStorage.setItem(key, el.textContent);
        });
        // Para imagens, adicionar prompts para nova URL
        const images = document.querySelectorAll('[data-edit="image"]');
        images.forEach(img => {
            if (editMode) return;
            const newSrc = prompt(`Nova URL para imagem "${img.alt}":`, img.src);
            if (newSrc) {
                img.src = newSrc;
                localStorage.setItem(img.alt, newSrc);
            }
        });
    } else {
        // Em modo edição, permitir clique em imagem para mudar URL
        const images = document.querySelectorAll('[data-edit="image"]');
        images.forEach(img => {
            img.addEventListener('click', () => {
                if (editMode) {
                    const newSrc = prompt(`Nova URL para esta imagem:`, img.src);
                    if (newSrc) img.src = newSrc;
                }
            });
        });
    }
});

// Carregar dados ao iniciar
loadSavedData();