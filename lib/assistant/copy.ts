import type { AssistantLocale } from "./types";

export interface AssistantCopy {
  name: string;
  tagline: string;
  launcher: string;
  close: string;
  openFullPage: string;
  welcome: string;
  placeholder: string;
  send: string;
  searching: string;
  sources: string;
  ageTitle: string;
  ageBody: string;
  ageConfirm: string;
  ageContinue: string;
  privacyNote: string;
  unavailable: string;
  genericError: string;
  rateLimited: string;
  turnstileWaiting: string;
  unsupported: string;
  blocked: string;
  crisis: string;
  remaining: string;
  retry: string;
}

export const ASSISTANT_COPY: Record<AssistantLocale, AssistantCopy> = {
  en: {
    name: "Ask MYSverse",
    tagline: "Answers grounded in MYSverse and the MYSverse Wiki",
    launcher: "Ask MYSverse",
    close: "Close assistant",
    openFullPage: "Open full page",
    welcome:
      "Hi! Ask me about MYSverse, Bandaraya, Lebuhraya, Sumaya, projects, or this website.",
    placeholder: "Ask a MYSverse question…",
    send: "Send",
    searching: "Searching MYSverse…",
    sources: "Sources",
    ageTitle: "Before you start",
    ageBody:
      "Ask MYSverse uses AI and may be inaccurate. Check the cited pages and do not share personal information.",
    ageConfirm:
      "I am at least 13. If I am under 18, I have permission from my parent or guardian.",
    ageContinue: "Continue",
    privacyNote: "This conversation stays in this browser session.",
    unavailable: "Ask MYSverse is temporarily unavailable.",
    genericError: "Something went wrong. Please try again.",
    rateLimited: "You have reached the current message limit. Try again later.",
    turnstileWaiting: "Completing the security check…",
    unsupported:
      "I could not find that in the MYSverse sources. Try the [MYSverse Wiki](https://mys.wiki) or [contact MYSverse](https://mysver.se/en#contact).",
    blocked:
      "I cannot help with that request. I can answer age-appropriate questions about MYSverse and its games.",
    crisis:
      "I’m sorry you’re dealing with this. If you may be in immediate danger, call Malaysia’s emergency number **999** now. You can also call **Talian HEAL 15555** or **Befrienders KL at +603-7627 2929**. Please tell a trusted adult or someone near you who can stay with you.",
    remaining: "{count} messages left today",
    retry: "Retry"
  },
  ms: {
    name: "Tanya MYSverse",
    tagline: "Jawapan berdasarkan MYSverse dan Wiki MYSverse",
    launcher: "Tanya MYSverse",
    close: "Tutup pembantu",
    openFullPage: "Buka halaman penuh",
    welcome:
      "Hai! Tanya saya tentang MYSverse, Bandaraya, Lebuhraya, Sumaya, projek atau laman web ini.",
    placeholder: "Tanya soalan tentang MYSverse…",
    send: "Hantar",
    searching: "Mencari dalam MYSverse…",
    sources: "Sumber",
    ageTitle: "Sebelum anda bermula",
    ageBody:
      "Tanya MYSverse menggunakan AI dan mungkin tidak tepat. Semak halaman yang dipetik dan jangan kongsi maklumat peribadi.",
    ageConfirm:
      "Saya berumur sekurang-kurangnya 13 tahun. Jika saya di bawah 18 tahun, saya telah mendapat kebenaran ibu bapa atau penjaga.",
    ageContinue: "Teruskan",
    privacyNote: "Perbualan ini kekal dalam sesi pelayar ini.",
    unavailable: "Tanya MYSverse tidak tersedia buat sementara waktu.",
    genericError: "Sesuatu telah berlaku. Sila cuba lagi.",
    rateLimited: "Anda telah mencapai had mesej semasa. Cuba lagi kemudian.",
    turnstileWaiting: "Melengkapkan semakan keselamatan…",
    unsupported:
      "Saya tidak dapat mencari maklumat itu dalam sumber MYSverse. Cuba [Wiki MYSverse](https://mys.wiki/ms) atau [hubungi MYSverse](https://mysver.se/ms#contact).",
    blocked:
      "Saya tidak dapat membantu dengan permintaan itu. Saya boleh menjawab soalan yang sesuai mengikut umur tentang MYSverse dan permainannya.",
    crisis:
      "Saya bersimpati anda sedang menghadapi perkara ini. Jika anda mungkin berada dalam bahaya segera, hubungi nombor kecemasan Malaysia **999** sekarang. Anda juga boleh menghubungi **Talian HEAL 15555** atau **Befrienders KL di +603-7627 2929**. Beritahu orang dewasa yang dipercayai atau seseorang berhampiran yang boleh menemani anda.",
    remaining: "{count} mesej lagi hari ini",
    retry: "Cuba lagi"
  },
  zh: {
    name: "询问 MYSverse",
    tagline: "根据 MYSverse 与 MYSverse Wiki 提供答案",
    launcher: "询问 MYSverse",
    close: "关闭助手",
    openFullPage: "打开完整页面",
    welcome:
      "你好！你可以询问有关 MYSverse、Bandaraya、Lebuhraya、Sumaya、项目或此网站的问题。",
    placeholder: "询问 MYSverse 问题…",
    send: "发送",
    searching: "正在搜索 MYSverse…",
    sources: "来源",
    ageTitle: "开始之前",
    ageBody:
      "询问 MYSverse 使用 AI，回答可能不准确。请核对引用页面，也不要分享个人资料。",
    ageConfirm:
      "我已满 13 岁。如果我未满 18 岁，我已获得父母或监护人的许可。",
    ageContinue: "继续",
    privacyNote: "此对话只保留在本次浏览器会话中。",
    unavailable: "询问 MYSverse 暂时无法使用。",
    genericError: "出现问题，请再试一次。",
    rateLimited: "你已达到当前消息上限，请稍后再试。",
    turnstileWaiting: "正在完成安全检查…",
    unsupported:
      "我在 MYSverse 来源中找不到该资料。请尝试 [MYSverse Wiki](https://mys.wiki/zh) 或 [联系 MYSverse](https://mysver.se/zh#contact)。",
    blocked:
      "我无法协助此请求。我可以回答适合年龄、有关 MYSverse 及其游戏的问题。",
    crisis:
      "很遗憾你正面对这些事情。如果你可能有即时危险，请立即拨打马来西亚紧急号码 **999**。你也可拨打 **Talian HEAL 15555** 或 **Befrienders KL +603-7627 2929**。请告诉一位你信任的成年人，或请身边的人陪着你。",
    remaining: "今天还可发送 {count} 条消息",
    retry: "重试"
  },
  ta: {
    name: "MYSverse-ஐக் கேளுங்கள்",
    tagline: "MYSverse மற்றும் MYSverse Wiki ஆதாரங்களிலிருந்து பதில்கள்",
    launcher: "MYSverse-ஐக் கேளுங்கள்",
    close: "உதவியாளரை மூடு",
    openFullPage: "முழுப் பக்கத்தைத் திற",
    welcome:
      "வணக்கம்! MYSverse, Bandaraya, Lebuhraya, Sumaya, திட்டங்கள் அல்லது இந்த இணையதளம் பற்றி என்னிடம் கேளுங்கள்.",
    placeholder: "MYSverse பற்றிக் கேளுங்கள்…",
    send: "அனுப்பு",
    searching: "MYSverse-இல் தேடுகிறது…",
    sources: "ஆதாரங்கள்",
    ageTitle: "தொடங்குவதற்கு முன்",
    ageBody:
      "MYSverse உதவியாளர் AI-ஐப் பயன்படுத்துகிறது; பதில்கள் தவறாக இருக்கலாம். மேற்கோள் காட்டப்பட்ட பக்கங்களைச் சரிபார்த்து, தனிப்பட்ட தகவலைப் பகிர வேண்டாம்.",
    ageConfirm:
      "எனக்கு குறைந்தது 13 வயது. நான் 18 வயதிற்குட்பட்டவர் என்றால், பெற்றோர் அல்லது பாதுகாவலரின் அனுமதி பெற்றுள்ளேன்.",
    ageContinue: "தொடர்க",
    privacyNote: "இந்த உரையாடல் இந்த உலாவி அமர்வில் மட்டும் இருக்கும்.",
    unavailable: "MYSverse உதவியாளர் தற்காலிகமாகக் கிடைக்கவில்லை.",
    genericError: "ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
    rateLimited: "தற்போதைய செய்தி வரம்பை அடைந்துவிட்டீர்கள். பின்னர் முயற்சிக்கவும்.",
    turnstileWaiting: "பாதுகாப்புச் சரிபார்ப்பு நடைபெறுகிறது…",
    unsupported:
      "MYSverse ஆதாரங்களில் அந்தத் தகவலைக் கண்டுபிடிக்க முடியவில்லை. [MYSverse Wiki](https://mys.wiki/ta) அல்லது [MYSverse தொடர்புப் பக்கத்தை](https://mysver.se/ta#contact) முயற்சிக்கவும்.",
    blocked:
      "அந்தக் கோரிக்கைக்கு என்னால் உதவ முடியாது. MYSverse மற்றும் அதன் விளையாட்டுகள் பற்றிய வயதுக்கு ஏற்ற கேள்விகளுக்கு பதிலளிக்க முடியும்.",
    crisis:
      "நீங்கள் இதை எதிர்கொள்வதற்கு வருந்துகிறேன். உடனடி ஆபத்தில் இருக்கலாம் என்றால், மலேசிய அவசர எண்ணான **999**-ஐ இப்போதே அழைக்கவும். **Talian HEAL 15555** அல்லது **Befrienders KL +603-7627 2929** ஆகியவற்றையும் அழைக்கலாம். நம்பகமான பெரியவர் ஒருவரிடமோ, உங்களுடன் இருக்கக்கூடிய அருகிலுள்ள ஒருவரிடமோ உடனே சொல்லுங்கள்.",
    remaining: "இன்று இன்னும் {count} செய்திகள்",
    retry: "மீண்டும் முயற்சி"
  }
};
