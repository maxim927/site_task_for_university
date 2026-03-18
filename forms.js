// ===== js/forms.js =====
// Обработка форм с отправкой на email и Telegram

// Имитация отправки (в реальности нужно использовать backend/PHP)
function handleFormSubmit(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Собираем данные
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Показываем сообщение о отправке
        showNotification('Отправка...', 'info');
        
        try {
            // Здесь должен быть fetch к вашему бэкенду
            // Например: await fetch(endpoint, { method: 'POST', body: formData })
            
            // Имитация задержки
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');
            form.reset();
        } catch (error) {
            showNotification('Ошибка при отправке. Попробуйте позже.', 'error');
        }
    });
}

// Уведомления
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00c851' : type === 'error' ? '#ff4444' : '#33b5e5'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Загрузка файлов (показ имени файла)
function setupFileInputs() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const label = input.parentElement.querySelector('.file-name');
                if (label) label.textContent = `Выбран: ${fileName}`;
            }
        });
    });
}

// Telegram интеграция
function setupTelegramLinks() {
    const telegramLinks = document.querySelectorAll('.telegram-link');
    telegramLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Здесь можно добавить метрики
            window.open('https://t.me/grandgambit', '_blank');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleFormSubmit('contact-form', '/api/contact');
    handleFormSubmit('career-form', '/api/career');
    setupFileInputs();
    setupTelegramLinks();
});