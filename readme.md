Bu Discord botu, kullanıcıların etkileşimde bulunabileceği çeşitli komutlar sunan bir moderasyon ve eğlence botudur. Aşağıda botun özellikleri ve işlevleri hakkında detaylı bir açıklama bulunmaktadır:
Özellikler
1. Moderasyon Komutları:
!ban @kullanıcı: Belirtilen kullanıcıyı sunucudan yasaklar. Bu komut yalnızca admin yetkisine sahip kullanıcılar tarafından kullanılabilir.
!kick @kullanıcı: Belirtilen kullanıcıyı sunucudan atar. Bu komut da yalnızca admin yetkisine sahip kullanıcılar tarafından kullanılabilir.
!lock: Kullanıcıların mesaj göndermesini engelleyen bir kanal kilidi uygular. Yalnızca admin yetkisine sahip kullanıcılar tarafından kullanılabilir.
2. Eğlence Komutları:
!avatar @kullanıcı: Belirtilen kullanıcının profil fotoğrafını gösterir.
!startgame: "Sayı Tahmin Et" oyununu başlatır. Kullanıcılar 1 ile 100 arasında bir sayı tahmin eder.
!guess <sayı>: Kullanıcı, tahmin ettiği sayıyı girer. Doğru tahmin ettiğinde oyun sona erer.
!endgame: Oyun sona erdirilir ve doğru sayı gösterilir.
!kaccm: Komutu yazan kullanıcının avatarını ve rastgele bir boyut (1-50 cm arasında) gösterir.
!poll <soru>: Kullanıcıların oy kullanabileceği bir anket oluşturur.
!remindme <süre> <hatırlatma>: Kullanıcıya belirli bir süre sonra hatırlatma gönderir.
!weather <şehir>: Belirtilen şehir için hava durumu bilgisi alır. (Hava durumu API'si gerektirir.)
!gif <arama terimi>: Belirtilen terim için rastgele bir GIF gönderir. (Giphy API'si gerektirir.)
!quote: Rastgele bir alıntı gönderir.
3. Ses Kanalı Bağlantısı:
Bot, belirli bir ses kanalına otomatik olarak bağlanır ve bu kanalda aktif olarak bulunur.
Kullanım
Bot, kullanıcıların etkileşimde bulunabileceği çeşitli komutlar sunarak sunucu deneyimini zenginleştirir.
Kullanıcılar, botun sunduğu komutları kullanarak moderasyon işlemleri gerçekleştirebilir veya eğlenceli aktivitelerde bulunabilir.
Gereksinimler
discord.js: Discord API'si ile etkileşimde bulunmak için kullanılan ana kütüphane.
node-fetch: HTTP istekleri yapmak için kullanılan bir kütüphane.
Hava Durumu API Anahtarı: Hava durumu bilgisi almak için gerekli.
Giphy API Anahtarı: GIF gönderimi için gerekli.
Kurulum
Gerekli modülleri yüklemek için npm install komutunu kullanın.
2. YOUR_BOT_TOKEN, YOUR_API_KEY, ve YOUR_GIPHY_API_KEY alanlarını kendi bilgilerinize göre güncelleyin.
3. Botu başlatmak için node bot.js komutunu kullanın.
Bu bot, Discord sunucularında moderasyon ve eğlence işlevlerini bir araya getirerek kullanıcıların etkileşimde bulunmasını sağlar. Başka bir isteğiniz olursa lütfen belirtin!

