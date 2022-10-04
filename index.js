require("dotenv").config();
const {
  createAudioResource,
  StreamType,
  createAudioPlayer,
  joinVoiceChannel,
} = require("@discordjs/voice");
const { Client, GuildMember } = require("discord.js");
const axios = require("axios");
const { join } = require("path");
const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
  partials: ["CHANNEL"],
});

const prefix = "%";

client.on("ready", () => {
  console.log(`${client.user.username} is Online.`);
  client.user.setActivity("New Command: %join");
});

client.on("messageCreate", async (message) => {
  const channel = message.member.voice.channel;
  const resource = createAudioResource(join("./music", "Toccataa.mp3"), {
    inlineVolume: true,
  });

  if (message.content === `${prefix}join`) {
    if (!channel) {
      return message.channel.send("Mpes Voice-Chat re blaka.");
    }
    try {
      const player = createAudioPlayer();
      const Connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      Connection.subscribe(player);
      player.play(resource);
      player.on("idle", () => {
        Connection.disconnect();
      });
      player.on("error", (error) => {
        console.error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (
    message.content === "skase" ||
    message.content === "SKASE" ||
    message.content === "ΣΚΑΣΕ" ||
    message.content === "Skase" ||
    message.content === "σκάσε" ||
    message.content === "Σκάσε" ||
    message.content === "Σκασε" ||
    message.content === "σκασε" ||
    message.content === "skaste" ||
    message.content === "Skaste" ||
    message.content === "Σκάστε" ||
    message.content === "σκάστε" ||
    message.content === "skaste" ||
    message.content === "gamiese" ||
    message.content === "Du-te dracu"
  ) {
    await message.reply("Σκάσε Εσύ");
  } else if (message.content === "brise me") {
    axios
      .get("https://evilinsult.com/generate_insult.php?lang=en&type=json")
      .then((response) => {
        const data = response.data;
        message.reply(data.insult);
      });
  }
});

client.login(process.env.token);
