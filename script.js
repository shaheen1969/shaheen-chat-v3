// رابط المحرك (Backend) على ستريمليت
const STREAMLIT_URL = "https://shaheen-backend-whhxz5hz7tjwahyhid9ved.streamlit.app/";

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = inputField.value.trim();
    
    if (!message) return;

    // 1. مسح شاشة الترحيب عند أول رسالة
    const welcomeScreen = document.querySelector('.welcome-screen');
    if (welcomeScreen) welcomeScreen.remove();

    // 2. عرض رسالة المستخدم في الواجهة
    const userDiv = document.createElement('div');
    userDiv.style.cssText = "align-self: flex-end; background: #1c1f22; padding: 12px 18px; border-radius: 15px 15px 0 15px; margin: 10px 0; max-width: 80%; border: 1px solid #333; color: #fff;";
    userDiv.innerHTML = message;
    chatBox.appendChild(userDiv);

    // 3. مسح خانة الإدخال والتمرير للأسفل
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // 4. إنشاء مكان لرد الذكاء الاصطناعي مع تأثير "شاهين يكتب..."
    const aiDiv = document.createElement('div');
    aiDiv.style.cssText = "align-self: flex-start; background: #121416; padding: 12px 18px; border-radius: 15px 15px 15px 0; margin: 10px 0; max-width: 80%; border: 1px solid #2ecc71; color: #2ecc71; font-weight: 500;";
    aiDiv.innerHTML = "شاهين يفكر...";
    chatBox.appendChild(aiDiv);

    try {
        // 5. الربط مع المحرك عبر فتح نافذة منبثقة (مؤقتاً للتحقق من العمل)
        const finalUrl = `${STREAMLIT_URL}?message=${encodeURIComponent(message)}`;
        window.open(finalUrl, 'ShaheenAI', 'width=500,height=700,top=100,left=100');
        
        // ملاحظة: بمجرد استقرار الربط، سنلغي النافذة المنبثقة ونجعل الرد يظهر بـ "تأثير الكتابة" داخل الموقع
        
    } catch (e) {
        aiDiv.innerHTML = "عذراً، حدث خطأ في الاتصال بالمحرك.";
        console.error(e);
    }
}

// تفعيل الإرسال عند ضغط Enter
document.getElementById('user-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
