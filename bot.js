const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch'); // fetch için ekleyin
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot hazır!');
    client.user.setActivity("Henry's Angel", { type: 'WATCHING' }); // Durumu ayarlama

    const voiceChannelId = 'YOUR_VOICE_CHANNEL_ID'; // Ses kanalının ID'sini buraya yazın
    const voiceChannel = client.channels.cache.get(voiceChannelId);

    if (voiceChannel) {
        voiceChannel.join()
            .then(connection => {
                console.log(`Bot ${voiceChannel.name} kanalına girdi.`);
            })
            .catch(err => {
                console.error('Kanalına girerken hata oluştu:', err);
            });
    } else {
        console.log('Belirtilen ses kanalı bulunamadı.');
    }
});

let gameActive = false;
let randomNumber = 0;
let attempts = 0;

client.on('messageCreate', async message => {
    // Admin kontrolü
    const isAdmin = message.member.permissions.has('ADMINISTRATOR');

    if (message.content.startsWith('!ban')) {
        if (!isAdmin) {
            return message.channel.send('Bu komutu kullanma yetkiniz yok.');
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            member.ban()
                .then(() => {
                    message.channel.send(`${user.tag} yasaklandı.`);
                })
                .catch(err => {
                    message.channel.send('Yasaklama işlemi başarısız oldu.');
                    console.error(err);
                });
        } else {
            message.channel.send('Yasaklamak için bir kullanıcı belirtmelisiniz.');
        }
    }

    if (message.content.startsWith('!kick')) {
        if (!isAdmin) {
            return message.channel.send('Bu komutu kullanma yetkiniz yok.');
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.cache.get(user.id);
            member.kick()
                .then(() => {
                    message.channel.send(`${user.tag} atıldı.`);
                })
                .catch(err => {
                    message.channel.send('Atma işlemi başarısız oldu.');
                    console.error(err);
                });
        } else {
            message.channel.send('Atmak için bir kullanıcı belirtmelisiniz.');
        }
    }

    if (message.content.startsWith('!lock')) {
        if (!isAdmin) {
            return message.channel.send('Bu komutu kullanma yetkiniz yok.');
        }
        const channel = message.channel;
        channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: false })
            .then(() => {
                message.channel.send('Bu kanal kilitlendi. Mesaj gönderilemez.');
            })
            .catch(err => {
                message.channel.send('Kanalı kilitleme işlemi başarısız oldu.');
                console.error(err);
            });
    }

    if (message.content.startsWith('!avatar')) {
        const user = message.mentions.users.first();
        if (user) {
            const avatarEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${user.username} Avatarı`)
                .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setTimestamp();

            message.channel.send({ embeds: [avatarEmbed] });
        } else {
            message.channel.send('Avatarını görmek istediğiniz kullanıcıyı etiketlemelisiniz.');
        }
    }

    if (message.content.startsWith('!startgame')) {
        if (gameActive) {
            return message.channel.send('Oyun zaten aktif!');
        }
        randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100 arası rastgele sayı
        attempts = 0;
        gameActive = true;
        message.channel.send('Sayı tahmin etme oyunu başladı! 1 ile 100 arasında bir sayı tahmin edin.');
    }

    if (message.content.startsWith('!guess')) {
        if (!gameActive) {
            return message.channel.send('Öncelikle oyunu başlatmalısınız! `!startgame` ile başlayın.');
        }
        const guess = parseInt(message.content.split(' ')[1]);
        attempts++;

        if (isNaN(guess)) {
            return message.channel.send('Lütfen geçerli bir sayı tahmin edin.');
        }

        if (guess < randomNumber) {
            message.channel.send('Tahmininiz çok düşük! Tekrar deneyin.');
        } else if (guess > randomNumber) {
            message.channel.send('Tahmininiz çok yüksek! Tekrar deneyin.');
        } else {
            message.channel.send(`Tebrikler! Doğru tahmin ettiniz! Sayı: ${randomNumber}. Toplam deneme: ${attempts}`);
            gameActive = false; // Oyunu bitir
        }
    }

    if (message.content.startsWith('!endgame')) {
        if (!gameActive) {
            return message.channel.send('Oyun aktif değil.');
        }
        gameActive = false;
        message.channel.send(`Oyun sona erdi. Doğru sayı: ${randomNumber}.`);
    }

    if (message.content.startsWith('!kaccm')) {
        const user = message.author; // Komutu yazan kullanıcı
        const randomSize = Math.floor(Math.random() * 50) + 1; // 1 ile 50 arasında rastgele boyut

        const kaccmEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.username} Avatarı`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: 'Penisboyun:', value: `${randomSize} cm`, inline: true }
            )
            .setTimestamp();

        message.channel.send({ embeds: [kaccmEmbed] });
    }

    // Yeni komutlar

    if (message.content.startsWith('!poll')) {
        const question = message.content.split(' ').slice(1).join(' ');
        const pollEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Anket')
            .setDescription(question)
            .setFooter('Reaksiyonlar ile oy kullanın!');

        message.channel.send({ embeds: [pollEmbed] }).then(sentMessage => {
            sentMessage.react('👍');
            sentMessage.react('👎');
        });
    }

    if (message.content.startsWith('!remindme')) {
        const args = message.content.split(' ').slice(1);
        const time = parseInt(args[0]);
        const reminder = args.slice(1).join(' ');

        if (isNaN(time)) {
            return message.channel.send('Lütfen geçerli bir süre girin.');
        }

        setTimeout(() => {
            message.channel.send(`Hatırlatma: ${reminder}`);
        }, time * 1000); // Süreyi saniye cinsine çevir
    }

    if (message.content.startsWith('!weather')) {
        const city = message.content.split(' ').slice(1).join(' ');
        const apiKey = 'YOUR_API_KEY'; // Hava durumu API anahtarınızı buraya ekleyin
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weatherEmbed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle(`Hava Durumu: ${data.name}`)
                        .addFields(
                            { name: 'Sıcaklık', value: `${data.main.temp} °C`, inline: true },
                            { name: 'Hava Durumu', value: data.weather[0].description, inline: true }
                        )
                        .setTimestamp();

                    message.channel.send({ embeds: [weatherEmbed] });
                } else {
                    message.channel.send('Şehir bulunamadı.');
                }
            })
            .catch(err => {
                console.error(err);
                message.channel.send('Hava durumu bilgisi alınırken bir hata oluştu.');
            });
    }

    if (message.content.startsWith('!gif')) {
        const searchTerm = message.content.split(' ').slice(1).join(' ');
        const giphyApiKey = 'YOUR_GIPHY_API_KEY'; // Giphy API anahtarınızı buraya ekleyin
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${searchTerm}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const gifUrl = data.data.images.original.url;
                message.channel.send(gifUrl);
            })
            .catch(err => {
                console.error(err);
                message.channel.send('GIF alınırken bir hata oluştu.');
            });
    }

    if (message.content.startsWith('!quote')) {
        const quotes = [
            "Hayatta en önemli şey, ne kadar uzun yaşadığınız değil, ne kadar iyi yaşadığınızdır.",
            "Başarı, hazırlığın fırsatla buluştuğu yerdir.",
            "Hayallerinizi takip edin, onları gerçekleştirmek için çalışın."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        message.channel.send(randomQuote);
    }
});

client.login('YOUR_BOT_TOKEN');
