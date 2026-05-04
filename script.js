// دالة تأثير الكتابة التدريجي
function typeEffect(element, text, speed = 30) {
    let index = 0;
    element.innerHTML = ""; // تفريغ المكان قبل البدء
    
    function play() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(play, speed);
            
            // النزول التلقائي لأسفل المحادثة أثناء الكتابة
            const chatContainer = document.getElementById('chat-container');
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
    play();
}

// الدالة الأساسية لإرسال الرسالة وعرض الرد
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');
    const message = userInput.value.trim();

    if (message === "") return;

    // 1. عرض رسالة المستخدم
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = message;
    chatContainer.appendChild(userDiv);
    userInput.value = "";

    // 2. تجهيز مكان رد "شاهين" (فارغ في البداية)
    const botDiv = document.createElement('div');
    botDiv.className = 'message bot-message typing';
    chatContainer.appendChild(botDiv);

    try {
        // 3. استدعاء واجهة برمجة التطبيقات (API)
        // ملاحظة: استبدل الرابط أدناه برابط الـ Backend الخاص بك إذا تغير
        const response = await fetch('https://shaheen-backend-o6p47v47oa-uc.a.run.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // 4. تشغيل تأثير الكتابة على الرد القادم من السيرفر
        typeEffect(botDiv, data.reply);
        botDiv.classList.remove('typing');

    } catch (error) {
        botDiv.textContent = "عذراً سيد محمد، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.";
        botDiv.classList.remove('typing');
    }
}

// تفعيل الإرسال عند الضغط على زر Enter
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
