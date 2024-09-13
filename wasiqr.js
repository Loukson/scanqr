const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Wasi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function WASI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Wasi_Tech = Wasi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Wasi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Wasi_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: '' + b64data });
	
				   let WASI_MD_TEXT = `

______________________________________
┏━━━━━━━━━━━━━🌀🤘🏻🍥🍃⚡
┃🍥ᴍᴇʀᴄɪ ᴅ'ᴀᴠᴏɪʀ ᴄʜᴏɪsɪʀ 
┃ɴᴀʀᴜᴛᴏ-ᴍᴅ
┃🍥𝗧𝗛𝗔𝗡𝗞𝗦 𝗖𝗛𝗢𝗢𝗦𝗜𝗡𝗚
┃🌀𝗡𝗔𝗥𝗨𝗧𝗢-𝗠𝗗
┃🍜𝗦𝗘𝗦𝗦𝗜𝗢𝗡 𝗖𝗢𝗡𝗘𝗖𝗧𝗘𝗗 𝗩𝗜𝗔 𝗣𝗔𝗜𝗥
┃🍃𝚂𝚃𝙰𝚁 𝙰𝙽𝙳 𝙵𝙾𝚁𝙺 𝚁𝙴𝙿𝙾 
┗━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━
┃ 𝗝𝗢𝗜𝗡 𝗢𝗨𝗥 𝗦𝗨𝗣𝗣𝗢𝗥𝗧 𝗚𝗥𝗢𝗨𝗣𝗦
┃🍥𝗢𝗪𝗡𝗘𝗥:Wa.me/22502331988
┃🍃𝗚𝗜𝗧𝗛𝗨𝗕.𝗥𝗘𝗣𝗢:https://github.com/Loukson/NARUTO-MD
┃🌀𝗪𝗔-𝗚𝗥𝗢𝗨𝗣:https://chat.whatsapp.com/DGTGrr0SpVlBywx1nfMqM9
┃🤘🏻𝗪𝗔-𝗖𝗛𝗔𝗡𝗡𝗘𝗟:https://whatsapp.com/channel/0029VajmviL5K3zMzqeBRJ39
┃⚡𝗗𝗢𝗡'𝗧 𝗦𝗛𝗔𝗥𝗘 𝗦𝗘𝗦𝗦𝗜𝗢𝗡 𝗜𝗗 𝗪𝗜𝗧𝗛 𝗔𝗡𝗬𝗢𝗡𝗘!!!
┗━━━━━━━━━━━━━━🌀🤘🏻🍥🍃⚡
_____________________________________
	
_Now the second step 😚_`
	 await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id,{text:WASI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Wasi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					WASI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await WASI_MD_QR_CODE()
});
module.exports = router
