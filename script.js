// Função para carregar dados salvos do localStorage
function loadSavedData() {
    const elements = document.querySelectorAll('[data-edit="text"]');
    elements.forEach(el => {
        const key = el.id || el.textContent.trim(); // Use id ou texto como chave
        const saved = localStorage.getItem(key);
        if (saved) el.textContent = saved;
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
        // Salvar mudanças de texto
        texts.forEach(el => {
            const key = el.id || el.textContent.trim();
            localStorage.setItem(key, el.textContent);
        });
    }
});

// Carregar dados ao iniciar
loadSavedData();