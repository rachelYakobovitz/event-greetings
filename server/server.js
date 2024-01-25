
const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const bodyParser = require("body-parser");

const app = express();
const port = 3001;
const openai = new OpenAI({ apiKey: "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" });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate-greeting', async (req, res) => {
    try {
        const options = req.body;
        const greetingOptions = await getGreetingOptions(options);
        res.json(greetingOptions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getGreetingOptions(options) {
    const prompt = buildPrompt(options);
    const response = await OpenAIAPI(prompt);
    return processResponse(response);
}

function buildPrompt(options) {
    if (options.event == 'birthday') {
        return `Write me 3 examples of ${options.type} for ${options.event} for age ${options.eventDetails} in the atmosphere of ${options.atmosphere}
        return 3 greetings in a parsable JSON format like follows:
         { "1": "first greeting", "2": "second greeting", "3": "third greeting" }`;
    }
    else {
        return `Write me 3 examples of ${options.type} for ${options.event} of ${options.eventDetails} in the atmosphere of ${options.atmosphere}
  return 3 greetings in a parsable JSON format like follows:
   { "1": "first greeting", "2": "second greeting", "3": "third greeting" }`;
    }
}

async function OpenAIAPI(prompt) {
    console.log(prompt);
    try {
        const generatedGreetings = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            temperature: 0.8,
        });
        const response = generatedGreetings.choices[0].message.content;

        res.send(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

