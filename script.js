async function handleSend() {
    const input = document.getElementById('user-query');
    const display = document.getElementById('chat-display');
    const query = input.value.trim();

    if (!query) return;

    // عرض رسالة المستخدم
    display.innerHTML += `<div class="message user-msg">${query}</div>`;
    input.value = "";
    display.scrollTop = display.scrollHeight;

    // إنشاء عنصر الرد المؤقت
    const loadingId = "bot-response-" + Date.now();
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'message bot-msg';
    botMessageElement.id = loadingId;
    botMessageElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل...';
    display.appendChild(botMessageElement);
    display.scrollTop = display.scrollHeight;

    try {
        // الاتصال بالسيرفر الجديد على Railway
        const response = await fetch('https://shaheen-backend.up.railway.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query })
        });

        if (!response.ok) throw new Error('سيرفر غير مستجيب');

        const data = await response.json();
        
        const targetElement = document.getElementById(loadingId);
        if (targetElement) {
            targetElement.innerHTML = `<b>شاهين شات:</b><br>${data.reply}`;
        }

    } catch (e) {
        const errorElement = document.getElementById(loadingId);
        if (errorElement) {
            errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> نعتذر، حدث خطأ. حاول مرة أخرى.';
        }
        console.error("Error:", e);
    }
    
    display.scrollTop = display.scrollHeight;
}
