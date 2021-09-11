//importing required Packages
const path = require("path");
const restify = require("restify");
const { BotFrameworkAdapter } = require("botbuilder");
const { EchoBot } = require("./bot");
const mongoose = require("mongoose");

//Configuration of environmnt variables
const dotenv = require("dotenv");
const ENV_FILE = path.join(__dirname, ".env");
dotenv.config({ path: ENV_FILE });


//connecting with databse
mongoose
  .connect(
    `mongodb+srv://Ramu:Ramu123@cluster0-grn1p.mongodb.net/Rajesh5014?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });


//creating the server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
  console.log(
    "\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator"
  );
  console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});


//creating the adapter object to create the bot
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
});

//Handle the error
const onTurnErrorHandler = async (context, error) => {
  console.error(`\n [onTurnError] unhandled error: ${error}`);
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  await context.sendActivity("The bot encountered an error or bug.");
  await context.sendActivity(
    "To continue to run this bot, please fix the bot source code."
  );
};

adapter.onTurnError = onTurnErrorHandler;
const myBot = new EchoBot();


//call the API
server.post("/api/messages", (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await myBot.run(context);
  });
});

//upgrading the api
server.on("upgrade", (req, socket, head) => {
  const streamingAdapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
  });
  streamingAdapter.onTurnError = onTurnErrorHandler;

  streamingAdapter.useWebSocket(req, socket, head, async (context) => {
    await myBot.run(context);
  });
});
