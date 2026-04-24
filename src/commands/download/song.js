const { yta } = require('../lib/y2mate')
const yts = require('yt-search')

module.exports = {
    name: 'song',
    alias: ['music', 'play'],
    category: 'download',
    desc: 'Download songs from YouTube',
    async run({ msg, conn }, { q }) {
        if (!q) return msg.reply('🎵 *සින්දුවේ නම දාන්න නංගි*\n\nඋදා:.song නුඹේ හිත')

        await msg.reply('🐝 *Bee Queen සින්දුව හොයනවා...* ⏳')

        try {
            const search = await yts(q)
            const video = search.videos[0]
            if (!video) return msg.reply('❌ සින්දුව හම්බුනේ නෑ')

            const { dl_link, title } = await yta(video.url, 'mp3')

            await conn.sendMessage(msg.from, {
                audio: { url: dl_link },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: `🎵 ${title}`,
                        body: 'Bee Queen MD Bot 🐝👑',
                        thumbnailUrl: video.thumbnail,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: msg })

        } catch (e) {
            console.log(e)
            msg.reply('❌ Error: සින්දුව බාගන්න බැරි වුනා')
        }
    }
    }
