const NICHES_DATA = [
  {
    id:"ai-tools",
    tr:"AI Araçları ve Otomasyon",en:"AI Tools & Automation",de:"KI-Tools & Automatisierung",
    cat:{tr:"Teknoloji",en:"Technology",de:"Technologie"},
    sub:{tr:"ChatGPT, Midjourney, otomasyon",en:"ChatGPT, Midjourney, automation",de:"ChatGPT, Midjourney, Automatisierung"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:55,money:88,trend:94,faceless:95,shorts:84,longform:86,sustain:82,newCh:76,under:70,multi:86},
    audience:{tr:"Girişimciler, freelancerlar, KOBİ sahipleri",en:"Entrepreneurs, freelancers, small business owners",de:"Unternehmer, Freelancer, KMU-Inhaber"},
    competitor:{tr:"AI inceleme kanalları",en:"AI review channels",de:"KI-Review-Kanäle"},
    risk:{score:85,kapatma:5,
      sebep:{tr:"Düşük risk - Eğitim içeriği",en:"Low risk - Educational content",de:"Niedriges Risiko"},
      yapma:{tr:["Telifli müzik kullanma","Yanıltıcı vaatler"],en:["Don't use copyrighted music","Don't make misleading promises"],de:["Keine urheberrechtlich geschützte Musik","Keine irreführenden Versprechen"]},
      yap:{tr:["Kendi sesin","Açık kaynak demo"],en:["Your own voice","Open source demos"],de:["Eigene Stimme","Open-Source-Demos"]}
    },
    examples:[
      {type:"beginner",name:"AI Quick Tips",subs:"3.2K",age:{tr:"4 ay",en:"4 months",de:"4 Monate"},growth:"+800/ay",strategy:{tr:"Günde 1 short atıyor, basit anlatım",en:"1 short daily, simple explanations",de:"1 Short täglich, einfache Erklärungen"}},
      {type:"rising",name:"Beginner AI",subs:"28K",age:{tr:"1 yıl",en:"1 year",de:"1 Jahr"},growth:"+3K/ay",strategy:{tr:"Haftada 3 video, eğitim odaklı",en:"3 videos weekly, education focused",de:"3 Videos pro Woche, bildungsorientiert"}},
      {type:"success",name:"AI Daily",subs:"125K",age:{tr:"18 ay",en:"18 months",de:"18 Monate"},growth:"+6K/ay",strategy:{tr:"Günlük AI haberleri, tutarlı paylaşım",en:"Daily AI news, consistent posting",de:"Tägliche KI-Nachrichten"}}
    ]
  },
  {
    id:"nocode",
    tr:"No-Code Otomasyon",en:"No-Code Automation",de:"No-Code Automatisierung",
    cat:{tr:"Teknoloji",en:"Technology",de:"Technologie"},
    sub:{tr:"Zapier, Make, Notion",en:"Zapier, Make, Notion",de:"Zapier, Make, Notion"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:48,money:90,trend:88,faceless:92,shorts:72,longform:92,sustain:86,newCh:82,under:78,multi:88},
    audience:{tr:"İşletme sahipleri, freelancerlar",en:"Business owners, freelancers",de:"Geschäftsinhaber, Freelancer"},
    competitor:{tr:"No-code eğitim kanalları",en:"No-code education channels",de:"No-Code-Bildungskanäle"},
    risk:{score:90,kapatma:2,
      sebep:{tr:"Çok güvenli niş",en:"Very safe niche",de:"Sehr sichere Nische"},
      yapma:{tr:["Crackli yazılım"],en:["Pirated software"],de:["Raubkopierte Software"]},
      yap:{tr:["Free trial demolar","Resmi dökümantasyon"],en:["Free trial demos","Official docs"],de:["Kostenlose Demos","Offizielle Dokumentation"]}
    },
    examples:[
      {type:"beginner",name:"NoCode Daily",subs:"4.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1K/ay",strategy:{tr:"Kısa otomasyon ipuçları",en:"Short automation tips",de:"Kurze Automatisierungstipps"}},
      {type:"rising",name:"Zapier Master",subs:"45K",age:{tr:"1 yıl",en:"1 year",de:"1 Jahr"},growth:"+4K/ay",strategy:{tr:"Adım adım rehberler",en:"Step-by-step guides",de:"Schritt-für-Schritt"}},
      {type:"success",name:"Make Automate",subs:"180K",age:{tr:"2 yıl",en:"2 years",de:"2 Jahre"},growth:"+8K/ay",strategy:{tr:"İleri seviye iş akışları",en:"Advanced workflows",de:"Fortgeschrittene Workflows"}}
    ]
  },
  {
    id:"productivity",
    tr:"Verimlilik Sistemleri",en:"Productivity Systems",de:"Produktivitätssysteme",
    cat:{tr:"Yaşam",en:"Lifestyle",de:"Lebensstil"},
    sub:{tr:"Notion, Obsidian, dijital düzen",en:"Notion, Obsidian, digital organization",de:"Notion, Obsidian"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:62,money:72,trend:80,faceless:87,shorts:78,longform:84,sustain:89,newCh:72,under:62,multi:76},
    audience:{tr:"Öğrenciler, çalışanlar",en:"Students, professionals",de:"Studenten, Berufstätige"},
    competitor:{tr:"Notion kanalları",en:"Notion channels",de:"Notion-Kanäle"},
    risk:{score:88,kapatma:3,
      sebep:{tr:"Eğitim odaklı, düşük risk",en:"Education-focused",de:"Bildungsorientiert"},
      yapma:{tr:["Tıbbi tavsiye"],en:["Medical advice"],de:["Medizinischer Rat"]},
      yap:{tr:["Pratik örnekler"],en:["Practical examples"],de:["Praktische Beispiele"]}
    },
    examples:[
      {type:"beginner",name:"Notion Newbie",subs:"5K",age:{tr:"6 ay",en:"6 months",de:"6 Monate"},growth:"+900/ay",strategy:{tr:"Şablon paylaşımı",en:"Template sharing",de:"Vorlagen teilen"}},
      {type:"rising",name:"Productive Daily",subs:"35K",age:{tr:"14 ay",en:"14 months",de:"14 Monate"},growth:"+2.5K/ay",strategy:{tr:"Günlük rutinler",en:"Daily routines",de:"Tägliche Routinen"}},
      {type:"success",name:"Focus Master",subs:"160K",age:{tr:"2 yıl",en:"2 years",de:"2 Jahre"},growth:"+5K/ay",strategy:{tr:"Derin çalışma teknikleri",en:"Deep work techniques",de:"Tiefenarbeit"}}
    ]
  },
  {
    id:"cyber",
    tr:"Siber Güvenlik",en:"Cybersecurity",de:"Cybersicherheit",
    cat:{tr:"Teknoloji",en:"Technology",de:"Technologie"},
    sub:{tr:"Parola, dolandırıcılık",en:"Password, scam protection",de:"Passwort, Betrugsschutz"},
    langs:["TR","EN","DE","ES","FR","AR"],
    scores:{comp:52,money:82,trend:86,faceless:90,shorts:75,longform:88,sustain:90,newCh:78,under:76,multi:83},
    audience:{tr:"Teknik olmayan kullanıcılar",en:"Non-technical users",de:"Nicht-technische Nutzer"},
    competitor:{tr:"Siber güvenlik kanalları",en:"Cybersecurity channels",de:"Cybersicherheits-Kanäle"},
    risk:{score:75,kapatma:8,
      sebep:{tr:"Hack demo riski",en:"Hack demo risk",de:"Hack-Demo-Risiko"},
      yapma:{tr:["Yasadışı hack","Gerçek saldırı"],en:["Illegal hacking","Real attacks"],de:["Illegales Hacking"]},
      yap:{tr:["Eğitim amaçlı","Kendi sistemde test"],en:["Educational","Own systems only"],de:["Bildungszweck"]}
    },
    examples:[
      {type:"beginner",name:"Safe Online",subs:"6K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1.2K/ay",strategy:{tr:"Günlük güvenlik ipuçları",en:"Daily security tips",de:"Tägliche Tipps"}},
      {type:"rising",name:"Cyber Basics",subs:"42K",age:{tr:"13 ay",en:"13 months",de:"13 Monate"},growth:"+3K/ay",strategy:{tr:"Dolandırıcılık örnekleri",en:"Scam examples",de:"Betrugsbeispiele"}},
      {type:"success",name:"Security Hub",subs:"195K",age:{tr:"22 ay",en:"22 months",de:"22 Monate"},growth:"+7K/ay",strategy:{tr:"Kapsamlı rehberler",en:"Comprehensive guides",de:"Umfassende Leitfäden"}}
    ]
  },
  {
    id:"science",
    tr:"Bilim Anlatımı",en:"Science Explained",de:"Wissenschaft Erklärt",
    cat:{tr:"Eğitim",en:"Education",de:"Bildung"},
    sub:{tr:"Günlük bilim, fizik",en:"Everyday science, physics",de:"Alltagswissenschaft"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:66,money:64,trend:78,faceless:94,shorts:88,longform:82,sustain:92,newCh:68,under:60,multi:88},
    audience:{tr:"Meraklı izleyiciler",en:"Curious viewers",de:"Neugierige Zuschauer"},
    competitor:{tr:"Bilim kanalları",en:"Science channels",de:"Wissenschaftskanäle"},
    risk:{score:90,kapatma:2,
      sebep:{tr:"Çok güvenli",en:"Very safe",de:"Sehr sicher"},
      yapma:{tr:["Yanlış bilgi"],en:["Misinformation"],de:["Falschinformation"]},
      yap:{tr:["Kaynak göster"],en:["Cite sources"],de:["Quellen angeben"]}
    },
    examples:[
      {type:"beginner",name:"Science Bites",subs:"4K",age:{tr:"4 ay",en:"4 months",de:"4 Monate"},growth:"+1K/ay",strategy:{tr:"60 saniyelik bilim",en:"60-second science",de:"60-Sekunden-Wissenschaft"}},
      {type:"rising",name:"Daily Physics",subs:"38K",age:{tr:"15 ay",en:"15 months",de:"15 Monate"},growth:"+2.8K/ay",strategy:{tr:"Görsel deneyler",en:"Visual experiments",de:"Visuelle Experimente"}},
      {type:"success",name:"Wonder Science",subs:"220K",age:{tr:"24 ay",en:"24 months",de:"24 Monate"},growth:"+8K/ay",strategy:{tr:"Hikaye anlatımı",en:"Storytelling",de:"Geschichtenerzählung"}}
    ]
  },
  {
    id:"engineering",
    tr:"Mühendislik Hikayeleri",en:"Engineering Stories",de:"Ingenieurgeschichten",
    cat:{tr:"Belgesel",en:"Documentary",de:"Dokumentation"},
    sub:{tr:"Köprüler, makineler",en:"Bridges, machines",de:"Brücken, Maschinen"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:44,money:70,trend:74,faceless:96,shorts:72,longform:90,sustain:88,newCh:84,under:86,multi:80},
    audience:{tr:"Mühendislik meraklıları",en:"Engineering enthusiasts",de:"Ingenieur-Begeisterte"},
    competitor:{tr:"How-it-works kanalları",en:"How-it-works channels",de:"Wie-es-funktioniert-Kanäle"},
    risk:{score:92,kapatma:1,
      sebep:{tr:"Çok güvenli",en:"Very safe",de:"Sehr sicher"},
      yapma:{tr:["Telifli görsel"],en:["Copyrighted images"],de:["Urheberrechtlich geschützte Bilder"]},
      yap:{tr:["Stock video","Çizim"],en:["Stock video","Animation"],de:["Stockvideo","Animation"]}
    },
    examples:[
      {type:"beginner",name:"Build Stories",subs:"3.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+850/ay",strategy:{tr:"Mini belgeseller",en:"Mini docs",de:"Mini-Dokumentationen"}},
      {type:"rising",name:"Engineering Today",subs:"32K",age:{tr:"14 ay",en:"14 months",de:"14 Monate"},growth:"+2.5K/ay",strategy:{tr:"Detaylı analizler",en:"Detailed analysis",de:"Detaillierte Analysen"}},
      {type:"success",name:"How Built",subs:"145K",age:{tr:"20 ay",en:"20 months",de:"20 Monate"},growth:"+5.5K/ay",strategy:{tr:"Tarihsel hikayeler",en:"Historical stories",de:"Historische Geschichten"}}
    ]
  },
  {
    id:"history",
    tr:"Tarih Hikayeleri",en:"History Stories",de:"Geschichtsgeschichten",
    cat:{tr:"Tarih",en:"History",de:"Geschichte"},
    sub:{tr:"İlginç tarih, savaşlar",en:"Interesting history",de:"Interessante Geschichte"},
    langs:["TR","EN","DE","ES","FR","AR"],
    scores:{comp:65,money:62,trend:74,faceless:94,shorts:82,longform:88,sustain:90,newCh:70,under:65,multi:86},
    audience:{tr:"Tarih meraklıları",en:"History enthusiasts",de:"Geschichtsinteressierte"},
    competitor:{tr:"Tarih kanalları",en:"History channels",de:"Geschichtskanäle"},
    risk:{score:80,kapatma:8,
      sebep:{tr:"Politik tarih riski",en:"Political history risk",de:"Politisches Risiko"},
      yapma:{tr:["Güncel politika"],en:["Current politics"],de:["Aktuelle Politik"]},
      yap:{tr:["Akademik kaynak","Tarafsız"],en:["Academic sources","Neutral"],de:["Akademische Quellen"]}
    },
    examples:[
      {type:"beginner",name:"History Daily",subs:"5K",age:{tr:"6 ay",en:"6 months",de:"6 Monate"},growth:"+1.1K/ay",strategy:{tr:"Günlük tarih anekdotları",en:"Daily anecdotes",de:"Tägliche Anekdoten"}},
      {type:"rising",name:"Past Untold",subs:"48K",age:{tr:"16 ay",en:"16 months",de:"16 Monate"},growth:"+3.5K/ay",strategy:{tr:"Bilinmeyen olaylar",en:"Unknown events",de:"Unbekannte Ereignisse"}},
      {type:"success",name:"Time Tales",subs:"185K",age:{tr:"22 ay",en:"22 months",de:"22 Monate"},growth:"+7K/ay",strategy:{tr:"Kapsamlı belgeseller",en:"Documentaries",de:"Dokumentationen"}}
    ]
  },
  {
    id:"space",
    tr:"Uzay ve Astronomi",en:"Space & Astronomy",de:"Weltraum & Astronomie",
    cat:{tr:"Bilim",en:"Science",de:"Wissenschaft"},
    sub:{tr:"Gezegenler, kara delik",en:"Planets, black holes",de:"Planeten, Schwarze Löcher"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:60,money:68,trend:82,faceless:96,shorts:88,longform:85,sustain:90,newCh:72,under:68,multi:88},
    audience:{tr:"Uzay meraklıları",en:"Space enthusiasts",de:"Weltraum-Fans"},
    competitor:{tr:"Astronomi kanalları",en:"Astronomy channels",de:"Astronomie-Kanäle"},
    risk:{score:90,kapatma:3,
      sebep:{tr:"Güvenli",en:"Safe",de:"Sicher"},
      yapma:{tr:["Komplo teorileri"],en:["Conspiracy theories"],de:["Verschwörungstheorien"]},
      yap:{tr:["NASA kaynakları","Bilimsel"],en:["NASA sources","Scientific"],de:["NASA-Quellen"]}
    },
    examples:[
      {type:"beginner",name:"Space Shorts",subs:"4.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1K/ay",strategy:{tr:"NASA görselleri + anlatım",en:"NASA visuals + narration",de:"NASA-Bilder + Erzählung"}},
      {type:"rising",name:"Cosmos Daily",subs:"38K",age:{tr:"14 ay",en:"14 months",de:"14 Monate"},growth:"+3K/ay",strategy:{tr:"Güncel uzay haberleri",en:"Current space news",de:"Aktuelle Weltraumnachrichten"}},
      {type:"success",name:"Universe Now",subs:"175K",age:{tr:"21 ay",en:"21 months",de:"21 Monate"},growth:"+6.5K/ay",strategy:{tr:"Derin uzay belgeselleri",en:"Deep space docs",de:"Tiefraum-Dokus"}}
    ]
  },
  {
    id:"psychology",
    tr:"Psikoloji ve Davranış",en:"Psychology & Behavior",de:"Psychologie & Verhalten",
    cat:{tr:"Kişisel Gelişim",en:"Self-Improvement",de:"Selbstentwicklung"},
    sub:{tr:"Davranış, alışkanlık",en:"Behavior, habits",de:"Verhalten, Gewohnheiten"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:68,money:76,trend:82,faceless:88,shorts:85,longform:82,sustain:88,newCh:66,under:58,multi:82},
    audience:{tr:"Kendini geliştirenler",en:"Self-improvers",de:"Selbstentwickler"},
    competitor:{tr:"Gelişim kanalları",en:"Development channels",de:"Entwicklungskanäle"},
    risk:{score:75,kapatma:10,
      sebep:{tr:"Tıbbi iddia riski",en:"Medical claim risk",de:"Medizinisches Risiko"},
      yapma:{tr:["Tıbbi tedavi iddiası"],en:["Medical treatment claims"],de:["Medizinische Behauptungen"]},
      yap:{tr:["Disclaimer","Kaynak"],en:["Disclaimer","Sources"],de:["Haftungsausschluss"]}
    },
    examples:[
      {type:"beginner",name:"Mind Tips",subs:"5.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1.3K/ay",strategy:{tr:"Kısa psikoloji ipuçları",en:"Short psychology tips",de:"Kurze Tipps"}},
      {type:"rising",name:"Psyche Daily",subs:"42K",age:{tr:"13 ay",en:"13 months",de:"13 Monate"},growth:"+3.2K/ay",strategy:{tr:"Davranış analizleri",en:"Behavior analysis",de:"Verhaltensanalyse"}},
      {type:"success",name:"Brain Hacks",subs:"195K",age:{tr:"23 ay",en:"23 months",de:"23 Monate"},growth:"+7.5K/ay",strategy:{tr:"Bilimsel açıklamalar",en:"Scientific explanations",de:"Wissenschaftliche Erklärungen"}}
    ]
  },
  {
    id:"language",
    tr:"Dil Öğrenme",en:"Language Learning",de:"Sprachen Lernen",
    cat:{tr:"Eğitim",en:"Education",de:"Bildung"},
    sub:{tr:"Hikaye, kelime, telaffuz",en:"Stories, vocabulary",de:"Geschichten, Wortschatz"},
    langs:["TR","EN","DE","ES","FR","AR","PT"],
    scores:{comp:60,money:68,trend:84,faceless:92,shorts:90,longform:80,sustain:92,newCh:78,under:74,multi:96},
    audience:{tr:"Dil öğrenenler",en:"Language learners",de:"Sprachlernende"},
    competitor:{tr:"Dil kanalları",en:"Language channels",de:"Sprachkanäle"},
    risk:{score:90,kapatma:3,
      sebep:{tr:"Güvenli",en:"Safe",de:"Sicher"},
      yapma:{tr:["Telifli kitap"],en:["Copyrighted books"],de:["Urheberrechtliche Bücher"]},
      yap:{tr:["Kendi hikayeleri","Public domain"],en:["Original stories"],de:["Eigene Geschichten"]}
    },
    examples:[
      {type:"beginner",name:"Easy English",subs:"6K",age:{tr:"4 ay",en:"4 months",de:"4 Monate"},growth:"+1.5K/ay",strategy:{tr:"Günlük 5 kelime",en:"5 words daily",de:"5 Wörter täglich"}},
      {type:"rising",name:"Story Spanish",subs:"45K",age:{tr:"12 ay",en:"12 months",de:"12 Monate"},growth:"+4K/ay",strategy:{tr:"Hikayelerle öğretim",en:"Story-based learning",de:"Geschichtenbasiert"}},
      {type:"success",name:"Lingo Pro",subs:"210K",age:{tr:"20 ay",en:"20 months",de:"20 Monate"},growth:"+9K/ay",strategy:{tr:"Tam dil paketleri",en:"Complete packages",de:"Komplette Pakete"}}
    ]
  },
  {
    id:"finance",
    tr:"Kişisel Finans",en:"Personal Finance",de:"Persönliche Finanzen",
    cat:{tr:"Finans",en:"Finance",de:"Finanzen"},
    sub:{tr:"Bütçe, tasarruf",en:"Budget, savings",de:"Budget, Sparen"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:75,money:90,trend:82,faceless:82,shorts:85,longform:85,sustain:80,newCh:55,under:50,multi:80},
    audience:{tr:"Para yönetimi öğrenenler",en:"Money management learners",de:"Geldmanagement"},
    competitor:{tr:"Finans kanalları",en:"Finance channels",de:"Finanzkanäle"},
    risk:{score:55,kapatma:28,
      sebep:{tr:"Yatırım tavsiyesi yasak",en:"Investment advice forbidden",de:"Anlageberatung verboten"},
      yapma:{tr:["Hisse önerisi","Garantili kazanç","Yatırım tavsiyesi"],en:["Stock recommendations","Guaranteed returns"],de:["Aktienempfehlungen","Garantierte Renditen"]},
      yap:{tr:["Bütçeleme","Disclaimer"],en:["Budgeting","Disclaimer"],de:["Budgetierung","Haftungsausschluss"]}
    },
    examples:[
      {type:"beginner",name:"Money Habits",subs:"4K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+950/ay",strategy:{tr:"Tasarruf ipuçları",en:"Saving tips",de:"Spartipps"}},
      {type:"rising",name:"Budget Daily",subs:"38K",age:{tr:"14 ay",en:"14 months",de:"14 Monate"},growth:"+3K/ay",strategy:{tr:"Aylık plan örnekleri",en:"Monthly plan examples",de:"Monatspläne"}},
      {type:"success",name:"Smart Money",subs:"175K",age:{tr:"22 ay",en:"22 months",de:"22 Monate"},growth:"+7K/ay",strategy:{tr:"Finansal okuryazarlık",en:"Financial literacy",de:"Finanzbildung"}}
    ]
  },
  {
    id:"mealprep",
    tr:"Yemek Hazırlığı",en:"Meal Prep",de:"Mahlzeitenvorbereitung",
    cat:{tr:"Yemek",en:"Food",de:"Essen"},
    sub:{tr:"Haftalık plan, pratik tarif",en:"Weekly plan, easy recipes",de:"Wochenplan"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:74,money:64,trend:80,faceless:70,shorts:92,longform:76,sustain:86,newCh:62,under:56,multi:82},
    audience:{tr:"Yoğun çalışanlar",en:"Busy people",de:"Vielbeschäftigte"},
    competitor:{tr:"Yemek kanalları",en:"Food channels",de:"Essenskanäle"},
    risk:{score:88,kapatma:4,
      sebep:{tr:"Güvenli",en:"Safe",de:"Sicher"},
      yapma:{tr:["Tıbbi diyet iddiası"],en:["Medical diet claims"],de:["Medizinische Diätbehauptungen"]},
      yap:{tr:["Genel tarif"],en:["General recipes"],de:["Allgemeine Rezepte"]}
    },
    examples:[
      {type:"beginner",name:"Quick Meals",subs:"5.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1.4K/ay",strategy:{tr:"15 dakika tarifler",en:"15-min recipes",de:"15-Min-Rezepte"}},
      {type:"rising",name:"Prep Weekly",subs:"42K",age:{tr:"13 ay",en:"13 months",de:"13 Monate"},growth:"+3.5K/ay",strategy:{tr:"Haftalık alışveriş listesi",en:"Weekly shopping list",de:"Wöchentliche Einkaufsliste"}},
      {type:"success",name:"Meal Master",subs:"160K",age:{tr:"19 ay",en:"19 months",de:"19 Monate"},growth:"+6.5K/ay",strategy:{tr:"Beslenme planları",en:"Nutrition plans",de:"Ernährungspläne"}}
    ]
  },
  {
    id:"fitness",
    tr:"Ev Fitness",en:"Home Fitness",de:"Heim-Fitness",
    cat:{tr:"Fitness",en:"Fitness",de:"Fitness"},
    sub:{tr:"Kısa egzersiz, ev antrenmanı",en:"Short workout, home training",de:"Kurzes Training"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:66,money:70,trend:78,faceless:66,shorts:88,longform:72,sustain:84,newCh:68,under:64,multi:80},
    audience:{tr:"Ev antrenmanı yapanlar",en:"Home workout people",de:"Heimtrainierende"},
    competitor:{tr:"Fitness kanalları",en:"Fitness channels",de:"Fitnesskanäle"},
    risk:{score:70,kapatma:12,
      sebep:{tr:"Yaralanma + tıbbi iddia",en:"Injury + medical claims",de:"Verletzungsgefahr"},
      yapma:{tr:["Yaralı kişilere tavsiye"],en:["Advice to injured people"],de:["Rat an Verletzte"]},
      yap:{tr:["Disclaimer","Doktor önerisi"],en:["Disclaimer","Doctor advice"],de:["Haftungsausschluss"]}
    },
    examples:[
      {type:"beginner",name:"10-Min Fit",subs:"5K",age:{tr:"4 ay",en:"4 months",de:"4 Monate"},growth:"+1.2K/ay",strategy:{tr:"10 dakikalık antrenmanlar",en:"10-minute workouts",de:"10-Minuten-Training"}},
      {type:"rising",name:"Home Strong",subs:"40K",age:{tr:"13 ay",en:"13 months",de:"13 Monate"},growth:"+3K/ay",strategy:{tr:"Hafta planları",en:"Weekly plans",de:"Wochenpläne"}},
      {type:"success",name:"Fit Daily",subs:"180K",age:{tr:"21 ay",en:"21 months",de:"21 Monate"},growth:"+7K/ay",strategy:{tr:"Tam programlar",en:"Full programs",de:"Vollständige Programme"}}
    ]
  },
  {
    id:"diy",
    tr:"Ev Tamiri DIY",en:"Home Repair DIY",de:"Heimwerker DIY",
    cat:{tr:"Pratik",en:"Practical",de:"Praktisch"},
    sub:{tr:"Tamir, alet kullanımı",en:"Repair, tool use",de:"Reparatur"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:56,money:74,trend:72,faceless:74,shorts:82,longform:78,sustain:88,newCh:78,under:72,multi:80},
    audience:{tr:"Ev sahipleri",en:"Homeowners",de:"Hausbesitzer"},
    competitor:{tr:"DIY kanalları",en:"DIY channels",de:"DIY-Kanäle"},
    risk:{score:75,kapatma:10,
      sebep:{tr:"Güvenlik riski",en:"Safety risk",de:"Sicherheitsrisiko"},
      yapma:{tr:["Tehlikeli iş"],en:["Dangerous work"],de:["Gefährliche Arbeit"]},
      yap:{tr:["Güvenlik ekipmanı"],en:["Safety equipment"],de:["Sicherheitsausrüstung"]}
    },
    examples:[
      {type:"beginner",name:"Easy Fix",subs:"4.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1.1K/ay",strategy:{tr:"5 dakika tamir",en:"5-min repairs",de:"5-Min-Reparaturen"}},
      {type:"rising",name:"DIY Home",subs:"38K",age:{tr:"15 ay",en:"15 months",de:"15 Monate"},growth:"+2.8K/ay",strategy:{tr:"Haftalık projeler",en:"Weekly projects",de:"Wochenprojekte"}},
      {type:"success",name:"Build It",subs:"165K",age:{tr:"23 ay",en:"23 months",de:"23 Monate"},growth:"+6K/ay",strategy:{tr:"Büyük projeler",en:"Big projects",de:"Große Projekte"}}
    ]
  },
  {
    id:"plants",
    tr:"Bitki Bakımı",en:"Plant Care",de:"Pflanzenpflege",
    cat:{tr:"Yaşam",en:"Lifestyle",de:"Lebensstil"},
    sub:{tr:"İç mekan bitkileri",en:"Houseplants",de:"Zimmerpflanzen"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:55,money:62,trend:75,faceless:70,shorts:85,longform:78,sustain:90,newCh:75,under:72,multi:78},
    audience:{tr:"Bitki severler",en:"Plant lovers",de:"Pflanzenliebhaber"},
    competitor:{tr:"Bitki kanalları",en:"Plant channels",de:"Pflanzenkanäle"},
    risk:{score:92,kapatma:2,
      sebep:{tr:"Çok güvenli",en:"Very safe",de:"Sehr sicher"},
      yapma:{tr:["Yanlış bakım"],en:["Wrong care"],de:["Falsche Pflege"]},
      yap:{tr:["Botanik kaynaklar"],en:["Botanical sources"],de:["Botanische Quellen"]}
    },
    examples:[
      {type:"beginner",name:"Plant Pals",subs:"5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1.2K/ay",strategy:{tr:"Günlük bakım ipuçları",en:"Daily care tips",de:"Tägliche Pflegetipps"}},
      {type:"rising",name:"Green Daily",subs:"35K",age:{tr:"14 ay",en:"14 months",de:"14 Monate"},growth:"+2.7K/ay",strategy:{tr:"Bitki türleri",en:"Plant species",de:"Pflanzenarten"}},
      {type:"success",name:"Indoor Garden",subs:"145K",age:{tr:"20 ay",en:"20 months",de:"20 Monate"},growth:"+5.5K/ay",strategy:{tr:"Bahçe tasarımı",en:"Garden design",de:"Gartendesign"}}
    ]
  },
  {
    id:"book",
    tr:"Kitap Özetleri",en:"Book Summaries",de:"Buchzusammenfassungen",
    cat:{tr:"Eğitim",en:"Education",de:"Bildung"},
    sub:{tr:"İş, psikoloji kitapları",en:"Business, psychology books",de:"Business-Bücher"},
    langs:["TR","EN","DE","ES","FR"],
    scores:{comp:70,money:66,trend:72,faceless:94,shorts:76,longform:88,sustain:90,newCh:62,under:54,multi:80},
    audience:{tr:"Okuma sevenler",en:"Book lovers",de:"Buchliebhaber"},
    competitor:{tr:"Kitap kanalları",en:"Book channels",de:"Buchkanäle"},
    risk:{score:65,kapatma:18,
      sebep:{tr:"Telif hakkı riski",en:"Copyright risk",de:"Urheberrechtsrisiko"},
      yapma:{tr:["Tam kitap okuma","Uzun alıntılar"],en:["Full book reading","Long quotes"],de:["Volltext-Lesen"]},
      yap:{tr:["Fair use","Kendi yorumun"],en:["Fair use","Own analysis"],de:["Fair Use"]}
    },
    examples:[
      {type:"beginner",name:"Book Bites",subs:"4K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+950/ay",strategy:{tr:"5 dakikalık özetler",en:"5-min summaries",de:"5-Min-Zusammenfassungen"}},
      {type:"rising",name:"Read Fast",subs:"32K",age:{tr:"13 ay",en:"13 months",de:"13 Monate"},growth:"+2.5K/ay",strategy:{tr:"Konu odaklı analizler",en:"Topic analysis",de:"Themenanalyse"}},
      {type:"success",name:"Book Master",subs:"155K",age:{tr:"20 ay",en:"20 months",de:"20 Monate"},growth:"+5.8K/ay",strategy:{tr:"Karşılaştırmalı analiz",en:"Comparative analysis",de:"Vergleichsanalyse"}}
    ]
  },
  {
    id:"geography",
    tr:"Coğrafya",en:"Geography",de:"Geografie",
    cat:{tr:"Eğitim",en:"Education",de:"Bildung"},
    sub:{tr:"Ülkeler, haritalar",en:"Countries, maps",de:"Länder, Karten"},
    langs:["TR","EN","DE","ES","FR","PT","AR"],
    scores:{comp:50,money:58,trend:82,faceless:96,shorts:92,longform:80,sustain:86,newCh:80,under:80,multi:92},
    audience:{tr:"Coğrafya meraklıları",en:"Geography enthusiasts",de:"Geografie-Fans"},
    competitor:{tr:"Bilgi kanalları",en:"Knowledge channels",de:"Wissenskanäle"},
    risk:{score:92,kapatma:2,
      sebep:{tr:"Çok güvenli",en:"Very safe",de:"Sehr sicher"},
      yapma:{tr:["Sınır tartışmaları"],en:["Border disputes"],de:["Grenzstreitigkeiten"]},
      yap:{tr:["Tarafsız bilgi"],en:["Neutral info"],de:["Neutrale Informationen"]}
    },
    examples:[
      {type:"beginner",name:"Map Facts",subs:"5K",age:{tr:"4 ay",en:"4 months",de:"4 Monate"},growth:"+1.3K/ay",strategy:{tr:"Günlük 1 harita",en:"1 map daily",de:"1 Karte täglich"}},
      {type:"rising",name:"World Tour",subs:"40K",age:{tr:"12 ay",en:"12 months",de:"12 Monate"},growth:"+3.5K/ay",strategy:{tr:"Ülke profilleri",en:"Country profiles",de:"Länderprofile"}},
      {type:"success",name:"Geo Daily",subs:"195K",age:{tr:"22 ay",en:"22 months",de:"22 Monate"},growth:"+8K/ay",strategy:{tr:"Kapsamlı belgeseller",en:"Documentaries",de:"Dokumentationen"}}
    ]
  },
  {
    id:"travel",
    tr:"Az Bilinen Seyahat",en:"Hidden Travel",de:"Versteckte Reisen",
    cat:{tr:"Seyahat",en:"Travel",de:"Reisen"},
    sub:{tr:"Turistik olmayan yerler",en:"Off-the-beaten-path",de:"Abseits der Touristenpfade"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:46,money:62,trend:76,faceless:82,shorts:82,longform:86,sustain:84,newCh:82,under:88,multi:88},
    audience:{tr:"Seyahat meraklıları",en:"Travel enthusiasts",de:"Reise-Fans"},
    competitor:{tr:"Seyahat kanalları",en:"Travel channels",de:"Reisekanäle"},
    risk:{score:85,kapatma:4,
      sebep:{tr:"Güvenli",en:"Safe",de:"Sicher"},
      yapma:{tr:["İzinsiz özel mülk"],en:["Private property"],de:["Privateigentum"]},
      yap:{tr:["Halka açık alan","İzin al"],en:["Public areas","Get permission"],de:["Öffentliche Bereiche"]}
    },
    examples:[
      {type:"beginner",name:"Hidden Spots",subs:"4.5K",age:{tr:"5 ay",en:"5 months",de:"5 Monate"},growth:"+1.2K/ay",strategy:{tr:"Yerel ipuçları",en:"Local tips",de:"Lokale Tipps"}},
      {type:"rising",name:"Off Beaten",subs:"35K",age:{tr:"14 ay",en:"14 months",de:"14 Monate"},growth:"+2.8K/ay",strategy:{tr:"Şehir rehberleri",en:"City guides",de:"Stadtführer"}},
      {type:"success",name:"Travel Deep",subs:"155K",age:{tr:"21 ay",en:"21 months",de:"21 Monate"},growth:"+6K/ay",strategy:{tr:"Kültür belgeselleri",en:"Culture docs",de:"Kulturdokumentationen"}}
    ]
  },
  {
    id:"editing",
    tr:"Video Düzenleme",en:"Video Editing",de:"Videobearbeitung",
    cat:{tr:"Kreatif",en:"Creative",de:"Kreativ"},
    sub:{tr:"CapCut, DaVinci",en:"CapCut, DaVinci",de:"CapCut, DaVinci"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:60,money:78,trend:84,faceless:82,shorts:84,longform:88,sustain:86,newCh:76,under:70,multi:86},
    audience:{tr:"YouTuberlar",en:"YouTubers",de:"YouTuber"},
    competitor:{tr:"Edit kanalları",en:"Edit channels",de:"Bearbeitungskanäle"},
    risk:{score:88,kapatma:4,
      sebep:{tr:"Güvenli",en:"Safe",de:"Sicher"},
      yapma:{tr:["Telifli müzik demo"],en:["Copyrighted music"],de:["Urheberrechtliche Musik"]},
      yap:{tr:["Royalty-free müzik"],en:["Royalty-free music"],de:["Lizenzfreie Musik"]}
    },
    examples:[
      {type:"beginner",name:"Edit Tips",subs:"5K",age:{tr:"4 ay",en:"4 months",de:"4 Monate"},growth:"+1.3K/ay",strategy:{tr:"Kısa düzenleme ipuçları",en:"Short editing tips",de:"Kurze Tipps"}},
      {type:"rising",name:"CapCut Pro",subs:"45K",age:{tr:"13 ay",en:"13 months",de:"13 Monate"},growth:"+3.5K/ay",strategy:{tr:"CapCut eğitimleri",en:"CapCut tutorials",de:"CapCut-Tutorials"}},
      {type:"success",name:"Edit Master",subs:"185K",age:{tr:"22 ay",en:"22 months",de:"22 Monate"},growth:"+7K/ay",strategy:{tr:"Profesyonel teknikler",en:"Pro techniques",de:"Profi-Techniken"}}
    ]
  },
  {
    id:"factbites",
    tr:"İlginç Bilgiler",en:"Interesting Facts",de:"Interessante Fakten",
    cat:{tr:"Eğitim",en:"Education",de:"Bildung"},
    sub:{tr:"60 saniyede bilgi",en:"60-second facts",de:"60-Sekunden-Fakten"},
    langs:["TR","EN","DE","ES","FR","PT"],
    scores:{comp:55,money:60,trend:90,faceless:95,shorts:95,longform:60,sustain:85,newCh:80,under:75,multi:92},
    audience:{tr:"Geniş kitle",en:"General audience",de:"Allgemeines Publikum"},
    competitor:{tr:"Fact kanalları",en:"Fact channels",de:"Fakten-Kanäle"},
    risk:{score:85,kapatma:5,
      sebep:{tr:"Güvenli",en:"Safe",de:"Sicher"},
      yapma:{tr:["Yanlış bilgi"],en:["Misinformation"],de:["Falschinformation"]},
      yap:{tr:["Kaynaklı bilgi"],en:["Sourced facts"],de:["Belegte Fakten"]}
    },
    examples:[
      {type:"beginner",name:"Fact Bytes",subs:"6K",age:{tr:"3 ay",en:"3 months",de:"3 Monate"},growth:"+2K/ay",strategy:{tr:"Günde 3 short",en:"3 shorts daily",de:"3 Shorts täglich"}},
      {type:"rising",name:"Mind Blow",subs:"55K",age:{tr:"11 ay",en:"11 months",de:"11 Monate"},growth:"+5K/ay",strategy:{tr:"Şaşırtıcı gerçekler",en:"Shocking facts",de:"Schockierende Fakten"}},
      {type:"success",name:"Daily Facts",subs:"245K",age:{tr:"18 ay",en:"18 months",de:"18 Monate"},growth:"+12K/ay",strategy:{tr:"Viral içerik",en:"Viral content",de:"Virale Inhalte"}}
    ]
  }
];
