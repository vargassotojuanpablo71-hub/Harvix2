const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
 console.log("RECIBÍ UN MENSAJE:", req.body.message);  
 
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
        console.error(error);

        res.status(500).json({
            reply: "Lo siento, ocurrió un error al conectar mi mente."
        });
    }
});

app.listen(3000, () => {
    console.log("Harvix está funcionando en el puerto 3000");
});