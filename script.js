async function handleSend() {
    const input = document.getElementById('user-query'); // أو معرف الإدخال لديك
    const display = document.getElementById('chat-display'); // منطقة عرض الرسائل
    const query = input.value.trim();

    if (!query) return; // منع الإرسال الفارغ

    // 1. عرض رسالة المستخدم أولاً
    display.innerHTML += `<div class="message user-msg">${query}</div>`;
    input.value = ""; // تنظيف الحقل فوراً
    display.scrollTop = display.scrollHeight;

    // 2. إنشاء loadingId فريد وضمان وجوده في الـ DOM
    const loadingId = "bot-response-" + Date.now();
    
    // إنشاء عنصر الرسالة كـ Object لضمان التحكم به قبل الإضافة
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'message bot-msg';
    botMessageElement.id = loadingId; // ربط المعرف هنا هو السر
    botMessageElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل...';
    
    display.appendChild(botMessageElement);
    display.scrollTop = display.scrollHeight;

    try {
        // 3. الاتصال بالمحرك المحدث في Streamlit
        const response = await fetch('https://shaheen-backend-a5huxtb3zxkpvacbggancq.streamlit.app/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query })
        });

        if (!response.ok) throw new Error('سيرفر Streamlit غير مستجيب');

        const data = await response.json();
        
        // 4. تحديث نفس العنصر بالرد الحقيقي
        const targetElement = document.getElementById(loadingId);
        if (targetElement) {
            targetElement.innerHTML = `<b>شاهين شات:</b><br>${data.reply}`;
        }

    } catch (e) {
        // 5. معالجة الأخطاء برسالة بسيطة دون تفاصيل تقنية مزعجة
        const errorElement = document.getElementById(loadingId);
        if (errorElement) {
            errorElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> نعتذر عن هذا التأخير اللحظي، يرجى المحاولة مرة أخرى.';
        }
        console.error("Diagnostic Log:", e);
    }
    
    display.scrollTop = display.scrollHeight;
}
