async function sendMessage() {
    const userInput = document.querySelector('input[type="text"]') || document.getElementById('user-input');
    const chatContainer = document.querySelector('.main-content') || document.getElementById('chat-container');
    const message = userInput.value.trim();

    if (message === "") return;

    // إخفاء رسالة الترحيب عند بدء المحادثة
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) welcomeSection.style.display = 'none';

    // 1. عرض رسالة المستخدم
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "color: white; background: #2d2d2d; padding: 15px; border-radius: 10px; margin: 10px 0; align-self: flex-end; max-width: 80%;";
    userDiv.textContent = message;
    chatContainer.appendChild(userDiv);
    userInput.value = "";

    // 2. تجهيز مكان رد "شاهين"
    const botDiv = document.createElement('div');
    botDiv.style.cssText = "color: #00ff88; background: #1a1a1a; padding: 15px; border-radius: 10px; margin: 10px 0; align-self: flex-start; max-width: 80%; border-left: 3px solid #00ff88;";
    chatContainer.appendChild(botDiv);

    try {
        const response = await fetch('https://shaheen-backend-o6p47v47oa-uc.a.run.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // تشغيل تأثير الكتابة
        let index = 0;
        function type() {
            if (index < data.reply.length) {
                botDiv.innerHTML += data.reply.charAt(index);
                index++;
                setTimeout(type, 30);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
        type();

    } catch (error) {
        botDiv.textContent = "عذراً، حدث خطأ في الاتصال بالسيرفر.";
    }
}

// ربط الزر الأخضر (الذي في الصورة) بالكود
document.querySelector('.send-btn')?.addEventListener('click', sendMessage);

// تفعيل الإرسال بـ Enter
document.querySelector('input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
