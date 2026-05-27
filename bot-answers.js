const BOT_ANSWERS = {
tr: {
q1:"🎯 3 adım:\n1. Hidden Opportunity filtresini aç\n2. Yeni Kanal Dostu filtresini aç\n3. Risk puanı 80+ olanları seç",
q2:"🧪 30 günde test et:\n1. 10 short paylaş\n2. İzlenmeleri takip et\n3. 1000+ izlenme alıyorsan niş çalışıyor!",
q3:"💰 En karlı nişler:\n🥇 Finance (RPM: $8-15)\n🥈 Business (RPM: $6-12)\n🥉 Tech (RPM: $3-7)\n\nHidden filtresini kullan!",
q4:"🛡️ Risk Detector her nişe güvenlik puanı verir:\n• 80-100: ✅ Çok güvenli\n• 60-80: ⚠️ Orta risk\n• 0-60: ❌ Riskli\n\nYAPMA ve YAP listeleri gösterir!",
q5:"⚠️ Kanal kapanma sebepleri:\n1. 📵 Telif hakkı ihlali\n2. 🚫 Topluluk kuralları\n3. 👶 COPPA (çocuk içerik)\n4. 💊 Tıbbi iddialar\n5. 💰 Yanıltıcı vaatler",
q6:"📜 Telif koruma:\n✅ Royalty-free müzik kullan\n✅ Kendi görsellerini çek\n✅ Public domain içerik\n❌ Bilinen şarkıları çalma\n❌ Film sahnelerini kullanma",
q7:"💰 5 para kazanma yolu:\n1. AdSense ($1-15/1000 izlenme)\n2. Sponsorluk (10K+ aboneden)\n3. Affiliate marketing\n4. Kendi ürünlerin\n5. Üyelik/Patreon",
q8:"📈 1000 abone planı:\n📅 Ay 1: Niş seç + 10 video\n📅 Ay 2: Haftada 3 video + Shorts\n📅 Ay 3-6: Tutarlılık\n\n🎯 Shorts viralleşir!",
q9:"🤝 Sponsorluk almak:\n1. Min 10K abone gerekli\n2. Famebit, LinkedIn kullan\n3. İlk sponsorluk: $200-500\n4. 100K sonra: $2K-10K!"
},
en: {
q1:"🎯 3 steps:\n1. Enable Hidden Opportunity filter\n2. Enable Newbie Friendly filter\n3. Pick niches with Risk score 80+",
q2:"🧪 Test in 30 days:\n1. Post 10 shorts\n2. Track views\n3. If 1000+ views = niche works!",
q3:"💰 Most profitable niches:\n🥇 Finance (RPM: $8-15)\n🥈 Business (RPM: $6-12)\n🥉 Tech (RPM: $3-7)\n\nUse Hidden filter!",
q4:"🛡️ Risk Detector gives safety score:\n• 80-100: ✅ Very safe\n• 60-80: ⚠️ Medium risk\n• 0-60: ❌ Risky\n\nShows DON'T and DO lists!",
q5:"⚠️ Channel ban reasons:\n1. 📵 Copyright infringement\n2. 🚫 Community guidelines\n3. 👶 COPPA violations\n4. 💊 Medical claims\n5. 💰 Misleading promises",
q6:"📜 Copyright protection:\n✅ Use royalty-free music\n✅ Shoot your own visuals\n✅ Public domain content\n❌ Don't play famous songs\n❌ Don't use movie scenes",
q7:"💰 5 ways to earn:\n1. AdSense ($1-15/1000 views)\n2. Sponsorships (10K+ subs)\n3. Affiliate marketing\n4. Own products\n5. Memberships/Patreon",
q8:"📈 1000 subs plan:\n📅 Month 1: Pick niche + 10 videos\n📅 Month 2: 3 videos/week + Shorts\n📅 Month 3-6: Consistency\n\n🎯 Shorts go viral!",
q9:"🤝 Getting sponsorships:\n1. Need 10K+ subscribers\n2. Use Famebit, LinkedIn\n3. First deal: $200-500\n4. After 100K: $2K-10K!"
},
de: {
q1:"🎯 3 Schritte:\n1. Versteckte Chance Filter aktivieren\n2. Anfängerfreundlich Filter aktivieren\n3. Nischen mit Sicherheit 80+ wählen",
q2:"🧪 30 Tage testen:\n1. 10 Shorts posten\n2. Aufrufe verfolgen\n3. 1000+ Aufrufe = Nische funktioniert!",
q3:"💰 Profitabelste Nischen:\n🥇 Finanzen (RPM: $8-15)\n🥈 Business (RPM: $6-12)\n🥉 Tech (RPM: $3-7)\n\nVersteckt-Filter nutzen!",
q4:"🛡️ Risiko-Detektor gibt Sicherheitswert:\n• 80-100: ✅ Sehr sicher\n• 60-80: ⚠️ Mittleres Risiko\n• 0-60: ❌ Riskant\n\nNICHT TUN und TUN Listen!",
q5:"⚠️ Kanalsperr-Gründe:\n1. 📵 Urheberrechtsverletzung\n2. 🚫 Community-Richtlinien\n3. 👶 COPPA\n4. 💊 Medizinische Behauptungen\n5. 💰 Irreführende Versprechen",
q6:"📜 Urheberrecht schützen:\n✅ Lizenzfreie Musik\n✅ Eigene Bilder\n✅ Public Domain\n❌ Keine bekannten Songs\n❌ Keine Filmszenen",
q7:"💰 5 Wege zu verdienen:\n1. AdSense ($1-15/1000 Aufrufe)\n2. Sponsoring (10K+ Abos)\n3. Affiliate-Marketing\n4. Eigene Produkte\n5. Mitgliedschaften",
q8:"📈 1000 Abos Plan:\n📅 Monat 1: Nische + 10 Videos\n📅 Monat 2: 3 Videos/Woche + Shorts\n📅 Monat 3-6: Konstanz\n\n🎯 Shorts werden viral!",
q9:"🤝 Sponsoring bekommen:\n1. Mind. 10K Abonnenten\n2. Famebit, LinkedIn nutzen\n3. Erstes Deal: $200-500\n4. Nach 100K: $2K-10K!"
}
};

const BOT_QUESTIONS = {
tr: {q1:"Hangi nişle başlamalıyım?",q2:"Niş nasıl test edilir?",q3:"Hangi niş para kazandırır?",q4:"Risk Detector ne yapar?",q5:"Kanalım neden kapanır?",q6:"Telif hakkı?",q7:"Para nasıl kazanırım?",q8:"1000 aboneye nasıl?",q9:"Sponsorluk?"},
en: {q1:"Which niche should I start?",q2:"How to test a niche?",q3:"Most profitable niche?",q4:"What is Risk Detector?",q5:"Why channels get banned?",q6:"Copyright protection?",q7:"How to make money?",q8:"How to reach 1000 subs?",q9:"How to get sponsorship?"},
de: {q1:"Welche Nische starten?",q2:"Wie Nische testen?",q3:"Profitabelste Nische?",q4:"Was ist Risiko-Detektor?",q5:"Warum Kanäle gesperrt?",q6:"Urheberrecht?",q7:"Wie Geld verdienen?",q8:"Wie 1000 Abos?",q9:"Sponsoring bekommen?"}
};
