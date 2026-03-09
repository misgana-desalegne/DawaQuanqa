const MIN_ENTRIES_PER_LEVEL = 80;

const baseExpressionsByLevel = {
  A1: [
    { id: "a1_hello", en: "Hello", fr: "Bonjour", am: "ሰላም", ti: "ሰላም", fa: "سلام" },
    { id: "a1_good_morning", en: "Good morning", fr: "Bonjour", am: "እንደምን አደሩ", ti: "ከመይ ሓዲርካ", fa: "صبح بخیر" },
    { id: "a1_good_evening", en: "Good evening", fr: "Bonsoir", am: "መልካም ምሽት", ti: "ሰናይ ምሸት", fa: "عصر بخیر" },
    { id: "a1_goodbye", en: "Goodbye", fr: "Au revoir", am: "ደህና ሁን", ti: "ደሓን ኩን", fa: "خداحافظ" },
    { id: "a1_please", en: "Please", fr: "S'il vous plait", am: "እባክህ", ti: "በጃኻ", fa: "لطفا" },
    { id: "a1_thank_you", en: "Thank you", fr: "Merci", am: "እናመሰግናለን", ti: "የቐንየለይ", fa: "تشکر" },
    { id: "a1_excuse_me", en: "Excuse me", fr: "Excusez-moi", am: "ይቅርታ", ti: "ይቕረታ", fa: "ببخشید" },
    { id: "a1_yes", en: "Yes", fr: "Oui", am: "አዎ", ti: "እወ", fa: "بله" },
    { id: "a1_no", en: "No", fr: "Non", am: "አይ", ti: "ኣይፋል", fa: "نه" },
    { id: "a1_water", en: "Water", fr: "Eau", am: "ውሃ", ti: "ማይ", fa: "آب" },
    { id: "a1_bread", en: "Bread", fr: "Pain", am: "ዳቦ", ti: "ባኒ", fa: "نان" },
    { id: "a1_house", en: "House", fr: "Maison", am: "ቤት", ti: "ገዛ", fa: "خانه" },
    { id: "a1_book", en: "Book", fr: "Livre", am: "መጽሐፍ", ti: "መጽሓፍ", fa: "کتاب" },
    { id: "a1_my_name", en: "My name is...", fr: "Je m'appelle...", am: "ስሜ ... ነው", ti: "ስመይ ... እዩ", fa: "نام من ... است" },
    { id: "a1_i_am", en: "I am...", fr: "Je suis...", am: "እኔ ... ነኝ", ti: "ኣነ ... እየ", fa: "من ... هستم" },
    { id: "a1_where_is", en: "Where is...?", fr: "Ou est...?", am: "... የት ነው?", ti: "... ኣበይ ኣሎ?", fa: "... کجاست؟" }
  ],
  A2: [
    { id: "a2_need_help", en: "I need help", fr: "J'ai besoin d'aide", am: "እገዛ እፈልጋለሁ", ti: "ሓገዝ የድልየኒ", fa: "من کمک نیاز دارم" },
    { id: "a2_how_much", en: "How much is this?", fr: "C'est combien?", am: "ይህ ስንት ነው?", ti: "እዚ ክንደይ እዩ?", fa: "این چند است؟" },
    { id: "a2_learning", en: "I am learning", fr: "J'apprends", am: "እየተማርኩ ነው", ti: "ይመሃር ኣለኹ", fa: "من در حال یادگیری هستم" },
    { id: "a2_not_understand", en: "I don't understand", fr: "Je ne comprends pas", am: "አልገባኝም", ti: "ኣይተረድኣንን", fa: "من متوجه نمی شوم" },
    { id: "a2_repeat", en: "Can you repeat?", fr: "Pouvez-vous repeter?", am: "እባክዎ ይድገሙ", ti: "በጃኹም ደጊምኩም", fa: "می توانید تکرار کنید؟" },
    { id: "a2_station", en: "Train station", fr: "Gare", am: "ባቡር ጣቢያ", ti: "መደበኛ ባቡር", fa: "ایستگاه قطار" },
    { id: "a2_hospital", en: "Hospital", fr: "Hopital", am: "ሆስፒታል", ti: "ሆስፒታል", fa: "شفاخانه" },
    { id: "a2_market", en: "Market", fr: "Marche", am: "ገበያ", ti: "ዕዳጋ", fa: "بازار" },
    { id: "a2_work", en: "Work", fr: "Travail", am: "ስራ", ti: "ስራሕ", fa: "کار" },
    { id: "a2_family", en: "Family", fr: "Famille", am: "ቤተሰብ", ti: "ስድራ", fa: "فامیل" },
    { id: "a2_tomorrow", en: "Tomorrow", fr: "Demain", am: "ነገ", ti: "ጽባሕ", fa: "فردا" },
    { id: "a2_yesterday", en: "Yesterday", fr: "Hier", am: "ትናንት", ti: "ትማሊ", fa: "دیروز" },
    { id: "a2_tired", en: "I am tired", fr: "Je suis fatigue", am: "ደክሞኛል", ti: "ደኪመ", fa: "من خسته هستم" },
    { id: "a2_hungry", en: "I am hungry", fr: "J'ai faim", am: "ራብ አለብኝ", ti: "ጠሚ ኣለኒ", fa: "من گرسنه هستم" },
    { id: "a2_lets_go", en: "Let's go", fr: "Allons-y", am: "እንሂድ", ti: "ንኺድ", fa: "بیایید برویم" },
    { id: "a2_what_time", en: "What time is it?", fr: "Quelle heure est-il?", am: "ስንት ሰዓት ነው?", ti: "ሰዓት ክንደይ እዩ?", fa: "ساعت چند است؟" }
  ],
  B1: [
    { id: "b1_job", en: "I am looking for a job", fr: "Je cherche un emploi", am: "ስራ እፈልጋለሁ", ti: "ስራሕ እደሊ ኣለኹ", fa: "من دنبال کار هستم" },
    { id: "b1_experience", en: "I have experience", fr: "J'ai de l'experience", am: "ልምድ አለኝ", ti: "ተሞክሮ ኣለኒ", fa: "من تجربه دارم" },
    { id: "b1_speak", en: "I can speak", fr: "Je peux parler", am: "መናገር እችላለሁ", ti: "ክዛረብ እኽእል", fa: "من می توانم صحبت کنم" },
    { id: "b1_appointment", en: "Appointment", fr: "Rendez-vous", am: "ቀጠሮ", ti: "ቆጸራ", fa: "قرار ملاقات" },
    { id: "b1_document", en: "Document", fr: "Document", am: "ሰነድ", ti: "ሰነድ", fa: "سند" },
    { id: "b1_rent", en: "Rent", fr: "Loyer", am: "ኪራይ", ti: "ኪራይ", fa: "کرایه" },
    { id: "b1_transport", en: "Public transport", fr: "Transport public", am: "የህዝብ መጓጓዣ", ti: "ህዝባዊ መጓዓዝያ", fa: "ترانسپورت عمومی" },
    { id: "b1_internet", en: "Internet connection", fr: "Connexion internet", am: "የኢንተርኔት ግንኙነት", ti: "ኢንተርነት ርክብ", fa: "اتصال اینترنت" },
    { id: "b1_school", en: "My child goes to school", fr: "Mon enfant va a l'ecole", am: "ልጄ ወደ ትምህርት ቤት ይሄዳል", ti: "ውሉደይ ናብ ቤት ትምህርቲ ይኸይድ", fa: "طفل من به مکتب می رود" },
    { id: "b1_insurance", en: "Health insurance", fr: "Assurance maladie", am: "የጤና ኢንሹራንስ", ti: "ናይ ጥዕና ኢንሹራንስ", fa: "بیمه صحی" },
    { id: "b1_emergency", en: "Emergency", fr: "Urgence", am: "አስቸኳይ", ti: "ህጹጽ", fa: "اضطراری" },
    { id: "b1_report", en: "I want to report a problem", fr: "Je veux signaler un probleme", am: "ችግር ማሳወቅ እፈልጋለሁ", ti: "ጸገም ክሕብር እደሊ", fa: "می خواهم یک مشکل را گزارش دهم" },
    { id: "b1_neighborhood", en: "Neighborhood", fr: "Quartier", am: "አካባቢ", ti: "ከባቢ", fa: "محله" },
    { id: "b1_skills", en: "I want to improve my skills", fr: "Je veux ameliorer mes competences", am: "ክህሎቴን ማሻሻል እፈልጋለሁ", ti: "ክእለተይ ከምዕብል እደሊ", fa: "می خواهم مهارت هایم را بهتر کنم" },
    { id: "b1_meeting", en: "Meeting", fr: "Reunion", am: "ስብሰባ", ti: "ኣኼባ", fa: "جلسه" },
    { id: "b1_ontime", en: "Please come on time", fr: "Venez a l'heure", am: "እባክዎ በሰዓቱ ይምጡ", ti: "በጃኹም ብሰዓቱ ንዑ", fa: "لطفا به وقت بیایید" }
  ],
  B2: [
    { id: "b2_bank", en: "I would like to open a bank account", fr: "Je voudrais ouvrir un compte bancaire", am: "የባንክ ሂሳብ መክፈት እፈልጋለሁ", ti: "ኣካውንት ባንክ ክኸፍት እደሊ", fa: "می خواهم حساب بانکی باز کنم" },
    { id: "b2_explain", en: "Could you explain the process?", fr: "Pouvez-vous expliquer le processus?", am: "ሂደቱን ማብራራት ይችላሉ?", ti: "እቲ ሂደት ክትገልጹለይ ትኽእሉ?", fa: "می توانید روند را توضیح دهید؟" },
    { id: "b2_legal", en: "I need legal advice", fr: "J'ai besoin de conseils juridiques", am: "የህግ ምክር እፈልጋለሁ", ti: "ሕጋዊ ምኽሪ የድልየኒ", fa: "من مشاوره حقوقی نیاز دارم" },
    { id: "b2_permit", en: "Residence permit renewal", fr: "Renouvellement du permis de sejour", am: "የመኖሪያ ፈቃድ ማደስ", ti: "ፍቓድ መንበሪ ምሕዳስ", fa: "تمدید اجازه اقامت" },
    { id: "b2_interview", en: "Job interview", fr: "Entretien d'embauche", am: "የስራ ቃለ መጠይቅ", ti: "ቃለ መሕትት ስራሕ", fa: "مصاحبه کاری" },
    { id: "b2_training", en: "Professional training", fr: "Formation professionnelle", am: "የሙያ ስልጠና", ti: "ሙያዊ ስልጠና", fa: "آموزش حرفه ای" },
    { id: "b2_equal", en: "Equal opportunity", fr: "Egalite des chances", am: "እኩል ዕድል", ti: "ማዕረ ዕድል", fa: "فرصت برابر" },
    { id: "b2_support_center", en: "Community support center", fr: "Centre de soutien communautaire", am: "የማህበረሰብ ድጋፍ ማዕከል", ti: "ማእከል ድጋፍ ማሕበረሰብ", fa: "مرکز حمایت اجتماعی" },
    { id: "b2_patience", en: "I appreciate your patience", fr: "J'apprecie votre patience", am: "ትዕግስትዎን እጅግ አደንቃለሁ", ti: "ትዕግስትኩም ኣመስግን", fa: "از شکیبایی شما سپاسگزارم" },
    { id: "b2_exchange", en: "Cultural exchange", fr: "Echange culturel", am: "የባህል ልውውጥ", ti: "ባህላዊ ልውውጥ", fa: "تبادل فرهنگی" },
    { id: "b2_long_term", en: "Long-term plan", fr: "Plan a long terme", am: "የረጅም ጊዜ እቅድ", ti: "ናይ ነዊሕ ግዜ መደብ", fa: "برنامه درازمدت" },
    { id: "b2_finance", en: "Financial planning", fr: "Planification financiere", am: "የገንዘብ እቅድ", ti: "ፋይናንሳዊ መደብ", fa: "برنامه ریزی مالی" },
    { id: "b2_digital", en: "Digital services", fr: "Services numeriques", am: "ዲጂታል አገልግሎቶች", ti: "ዲጂታል ኣገልግሎታት", fa: "خدمات دیجیتال" },
    { id: "b2_rights", en: "Customer rights", fr: "Droits des clients", am: "የደንበኛ መብቶች", ti: "መሰል ዓማዊል", fa: "حقوق مشتری" },
    { id: "b2_volunteer", en: "Volunteer program", fr: "Programme de benevolat", am: "የበጎ ፈቃድ ፕሮግራም", ti: "ፕሮግራም ተወፋይ", fa: "برنامه داوطلبی" },
    { id: "b2_support", en: "Thank you for your support", fr: "Merci pour votre soutien", am: "ለድጋፍዎ እናመሰግናለን", ti: "ንድጋፍኩም የቐንየለይ", fa: "از حمایت شما سپاسگزارم" }
  ]
};

const supplementConfigs = {
  A1: {
    subjects: [
      { en: "I", fr: "Je", de: "Ich", am: "እኔ", ti: "ኣነ", fa: "من" },
      { en: "You", fr: "Tu", de: "Du", am: "አንተ", ti: "ንስኻ", fa: "تو" },
      { en: "We", fr: "Nous", de: "Wir", am: "እኛ", ti: "ንሕና", fa: "ما" },
      { en: "They", fr: "Ils", de: "Sie", am: "እነሱ", ti: "ንሳቶም", fa: "آنها" }
    ],
    verbs: [
      { en: "need", fr: "avons besoin de", de: "brauchen", am: "እፈልጋለሁ", ti: "የድልየኒ", fa: "نیاز دارم" },
      { en: "have", fr: "ai", de: "habe", am: "አለኝ", ti: "ኣለኒ", fa: "دارم" },
      { en: "see", fr: "vois", de: "sehe", am: "አያለሁ", ti: "እርኢ", fa: "می بینم" },
      { en: "like", fr: "aime", de: "mag", am: "እወዳለሁ", ti: "እፈቱ", fa: "دوست دارم" }
    ],
    objects: [
      { en: "water", fr: "de l'eau", de: "Wasser", am: "ውሃ", ti: "ማይ", fa: "آب" },
      { en: "bread", fr: "du pain", de: "Brot", am: "ዳቦ", ti: "ባኒ", fa: "نان" },
      { en: "a book", fr: "un livre", de: "ein Buch", am: "መጽሐፍ", ti: "መጽሓፍ", fa: "کتاب" },
      { en: "the bus", fr: "le bus", de: "den Bus", am: "አውቶቡስ", ti: "ኣውቶቡስ", fa: "اتوبوس" }
    ]
  },
  A2: {
    subjects: [
      { en: "I", fr: "Je", de: "Ich", am: "እኔ", ti: "ኣነ", fa: "من" },
      { en: "We", fr: "Nous", de: "Wir", am: "እኛ", ti: "ንሕና", fa: "ما" },
      { en: "My family", fr: "Ma famille", de: "Meine Familie", am: "ቤተሰቤ", ti: "ስድራይ", fa: "خانواده من" },
      { en: "Our group", fr: "Notre groupe", de: "Unsere Gruppe", am: "ቡድናችን", ti: "ጉጅለና", fa: "گروه ما" }
    ],
    verbs: [
      { en: "visit", fr: "visite", de: "besuche", am: "እጎበኛለሁ", ti: "እበጽሕ", fa: "بازدید می کنم" },
      { en: "prepare", fr: "prepare", de: "bereite vor", am: "አዘጋጃለሁ", ti: "አዳልው", fa: "آماده می کنم" },
      { en: "buy", fr: "achete", de: "kaufe", am: "እገዛለሁ", ti: "እዕድግ", fa: "می خرم" },
      { en: "search for", fr: "cherche", de: "suche", am: "እፈልጋለሁ", ti: "እደሊ", fa: "جستجو می کنم" }
    ],
    objects: [
      { en: "the market", fr: "le marche", de: "den Markt", am: "ገበያ", ti: "ዕዳጋ", fa: "بازار" },
      { en: "the station", fr: "la gare", de: "den Bahnhof", am: "ጣቢያ", ti: "ጣብያ", fa: "ایستگاه" },
      { en: "the hospital", fr: "l'hopital", de: "das Krankenhaus", am: "ሆስፒታል", ti: "ሆስፒታል", fa: "شفاخانه" },
      { en: "the documents", fr: "les documents", de: "die Dokumente", am: "ሰነዶች", ti: "ሰነዳት", fa: "اسناد" }
    ]
  },
  B1: {
    subjects: [
      { en: "I", fr: "Je", de: "Ich", am: "እኔ", ti: "ኣነ", fa: "من" },
      { en: "Our team", fr: "Notre equipe", de: "Unser Team", am: "ቡድናችን", ti: "ጉጅለና", fa: "تیم ما" },
      { en: "My colleague", fr: "Mon collegue", de: "Mein Kollege", am: "ባልደረባዬ", ti: "መሳርሕተይ", fa: "همکار من" },
      { en: "The community", fr: "La communaute", de: "Die Gemeinschaft", am: "ማህበረሰቡ", ti: "ማሕበረሰብ", fa: "جامعه" }
    ],
    verbs: [
      { en: "discusses", fr: "discute", de: "bespricht", am: "ይወያያል", ti: "ይዛተ", fa: "بحث می کند" },
      { en: "organizes", fr: "organise", de: "organisiert", am: "ያዘጋጃል", ti: "የዳሉ", fa: "سازماندهی می کند" },
      { en: "improves", fr: "ameliore", de: "verbessert", am: "ያሻሽላል", ti: "የመሓይሽ", fa: "بهبود می دهد" },
      { en: "supports", fr: "soutient", de: "unterstuetzt", am: "ይደግፋል", ti: "ይድግፍ", fa: "حمایت می کند" }
    ],
    objects: [
      { en: "the project plan", fr: "le plan du projet", de: "den Projektplan", am: "የፕሮጀክት እቅድ", ti: "መደብ ፕሮጀክት", fa: "طرح پروژه" },
      { en: "the meeting", fr: "la reunion", de: "die Besprechung", am: "ስብሰባ", ti: "ኣኼባ", fa: "جلسه" },
      { en: "the application", fr: "la demande", de: "den Antrag", am: "ማመልከቻ", ti: "ምልክታ", fa: "درخواست" },
      { en: "the training program", fr: "le programme de formation", de: "das Trainingsprogramm", am: "የስልጠና ፕሮግራም", ti: "ፕሮግራም ስልጠና", fa: "برنامه آموزشی" }
    ]
  },
  B2: {
    subjects: [
      { en: "I", fr: "Je", de: "Ich", am: "እኔ", ti: "ኣነ", fa: "من" },
      { en: "Our organization", fr: "Notre organisation", de: "Unsere Organisation", am: "ድርጅታችን", ti: "ውድብና", fa: "سازمان ما" },
      { en: "The city office", fr: "Le bureau municipal", de: "Das Stadtbuero", am: "የከተማ ቢሮ", ti: "ቤት ጽሕፈት ከተማ", fa: "دفتر شهری" },
      { en: "The policy group", fr: "Le groupe politique", de: "Die Politikgruppe", am: "የፖሊሲ ቡድን", ti: "ጉጅለ ፖሊሲ", fa: "گروه پالیسی" }
    ],
    verbs: [
      { en: "evaluates", fr: "evalue", de: "bewertet", am: "ይገምግማል", ti: "ይገምግም", fa: "ارزیابی می کند" },
      { en: "coordinates", fr: "coordonne", de: "koordiniert", am: "ያስተባብራል", ti: "ይወሃህድ", fa: "هماهنگ می کند" },
      { en: "reviews", fr: "examine", de: "prueft", am: "ይመርምራል", ti: "ይምርምር", fa: "بازبینی می کند" },
      { en: "implements", fr: "met en oeuvre", de: "setzt um", am: "ይተግብራል", ti: "ይፍጽም", fa: "اجرا می کند" }
    ],
    objects: [
      { en: "the long-term strategy", fr: "la strategie a long terme", de: "die Langzeitstrategie", am: "የረጅም ጊዜ ስትራቴጂ", ti: "ስትራተጂ ነዊሕ ግዜ", fa: "استراتژی درازمدت" },
      { en: "the public service process", fr: "le processus de service public", de: "den oeffentlichen Dienstprozess", am: "የህዝብ አገልግሎት ሂደት", ti: "ሂደት ኣገልግሎት ህዝቢ", fa: "روند خدمات عمومی" },
      { en: "the financial plan", fr: "le plan financier", de: "den Finanzplan", am: "የገንዘብ እቅድ", ti: "መደብ ፋይናንስ", fa: "برنامه مالی" },
      { en: "the community program", fr: "le programme communautaire", de: "das Gemeinschaftsprogramm", am: "የማህበረሰብ ፕሮግራም", ti: "ፕሮግራም ማሕበረሰብ", fa: "برنامه اجتماعی" }
    ]
  }
};

function composeSentence(subject, verb, object, lang) {
  if (lang === "am" || lang === "ti" || lang === "fa") {
    return `${subject[lang]} ${object[lang]} ${verb[lang]}`;
  }

  return `${subject[lang]} ${verb[lang]} ${object[lang]}`;
}

function buildSupplementEntries(level) {
  const config = supplementConfigs[level];
  const entries = [];
  let counter = 1;

  for (const subject of config.subjects) {
    for (const verb of config.verbs) {
      for (const object of config.objects) {
        entries.push({
          id: `${level.toLowerCase()}_supp_${counter}`,
          en: composeSentence(subject, verb, object, "en"),
          fr: composeSentence(subject, verb, object, "fr"),
          de: composeSentence(subject, verb, object, "de"),
          am: composeSentence(subject, verb, object, "am"),
          ti: composeSentence(subject, verb, object, "ti"),
          fa: composeSentence(subject, verb, object, "fa")
        });
        counter += 1;
      }
    }
  }

  return entries;
}

function withMinimumEntries(level) {
  const baseEntries = [...(baseExpressionsByLevel[level] || [])];
  if (baseEntries.length >= MIN_ENTRIES_PER_LEVEL) {
    return baseEntries;
  }

  const supplementEntries = buildSupplementEntries(level);
  const needed = MIN_ENTRIES_PER_LEVEL - baseEntries.length;
  return [...baseEntries, ...supplementEntries.slice(0, needed)];
}

export const expressionsByLevel = {
  A1: withMinimumEntries("A1"),
  A2: withMinimumEntries("A2"),
  B1: withMinimumEntries("B1"),
  B2: withMinimumEntries("B2")
};

export const levelSectionTitles = {
  A1: ["Everyday Basics", "Polite Expressions", "People and Places", "Starter Sentences"],
  A2: ["Daily Communication", "Travel and City", "Health and Family", "Time and Routine"],
  B1: ["Work and Community", "Services and Documents", "Personal Growth", "Social Interaction"],
  B2: ["Civic and Professional", "Systems and Process", "Planning and Rights", "Advanced Communication"]
};
