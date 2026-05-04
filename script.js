document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد العناصر من الواجهة التي ظهرت في الصورة
    const sendBtn = document.querySelector('.send-btn') || document.querySelector('button');
    const inputField = document.querySelector('input[type="text"]');
    const chatContent = document.querySelector('.main-content');

    async function handleSend() {
        const text = inputField.value.trim();
        if (!text) return;

        // إخفاء رسالة الترحيب
        const welcome = document.querySelector('.welcome-section');
        if (welcome) welcome.style.display = 'none';

        // 2. إضافة رسالة المستخدم
        const uDiv = document.createElement('div');
        uDiv.style.cssText = "color: white; background: #2d2d2d; padding: 12px; border-radius: 10px; margin: 10px 0; align-self: flex-end; margin-left: auto; max-width: 80%;";
        uDiv.textContent = text;
        chatContent.appendChild(uDiv);
        inputField.value = "";

        // 3. إضافة مكان رد "شاهين"
        const bDiv = document.createElement('div');
        bDiv.style.cssText = "color: #00ff88; background: #1a1a1a; padding: 12px; border-radius: 10px; margin: 10px 0; border-left: 3px solid #00ff88; max-width: 80%;";
        chatContent.appendChild(bDiv);

        try {
            const res = await fetch('https://shaheen-backend-o6p47v47oa-uc.a.run.app/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            
            // تأثير الكتابة التدريجي
            let i = 0;
            function type() {
                if (i < data.reply.length) {
                    bDiv.innerHTML += data.reply.charAt(i);
                    i++;
                    setTimeout(type, 30);
                    chatContent.scrollTop = chatContent.scrollHeight;
                }
            }
            type();
        } catch (e) {
            bDiv.textContent = "خطأ في الاتصال بالسيرفر.";
        }
    }

    // ربط الأحداث
    sendBtn.onclick = handleSend;
    inputField.onkeypress = (e) => { if(e.key === 'Enter') handleSend(); };
});
