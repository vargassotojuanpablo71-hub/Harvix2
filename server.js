const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    try {
        const mensaje = req.body.message;

        const respuesta = await client.responses.create({
            model: "gpt-5.6-luna",
            input: mensaje
        });

        res.json({
            reply: respuesta.output_text
        });

    } catch (error) {
        console.error("ERROR OPENAI:", error);

        res.status(500).json({
            reply: "No pude conectar con mi mente: " + error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Harvix está funcionando en el puerto ${PORT}`);
});