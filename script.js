// دالة إرسال الرسالة
async function sendMessage() {
    // محاولة إيجاد حقل الكتابة بأكثر من طريقة
    const userInput = document.querySelector('input[type="text"]') || document.querySelector('.input-field') || document.getElementById('user-input');
    // محاولة إيجاد حاوية المحادثة
    const chatContainer = document.querySelector('.main-content') || document.getElementById('chat-container');
    
    const message = userInput.value.trim();
    if (message === "") return;

    // إخفاء رسالة الترحيب "كيف يمكنني مساعدتك" عند أول رسالة
    const welcomeSection = document.querySelector('.welcome-section') || document.querySelector('h1')?.parentElement;
    if (welcomeSection) welcomeSection.style.display = 'none';

    // 1. إضافة رسالة المستخدم للواجهة بتنسيق فوري
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "color: white; background: #2d2d2d; padding: 12px; border-radius: 10px; margin: 10px 0; align-self: flex-end; width: fit-content; max-width: 80%; margin-left: auto;";
    userDiv.textContent = message;
    chatContainer.appendChild(userDiv);
    userInput.value = "";

    // 2. إنشاء مكان لرد "شاهين"
    const botDiv = document.createElement('div');
    botDiv.style.cssText = "color: #00ff88; background: #1a1a1a; padding: 12px; border-radius: 10px; margin: 10px 0; align-self: flex-start; width: fit-content; max-width: 80%; border-left: 3px solid #00ff88;";
    chatContainer.appendChild(botDiv);

    try {
        const response = await fetch('https://shaheen-backend-o6p47v47oa-uc.a.run.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // 3. تأثير الكتابة التدريجي
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
        botDiv.textContent = "عذراً سيد محمد، هناك مشكلة في الاتصال بالسيرفر حالياً.";
    }
}

// ربط الكود بالزر الأخضر الموجود في الصورة
document.addEventListener('click', function(e) {
    if (e.target.closest('.send-btn') || e.target.closest('button')) {
        sendMessage();
    }
});

// ربط الكود بضغط زر Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
