const input = document.getElementById("userInput");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");
const orb = document.getElementById("orb");

button.addEventListener("click", enviar);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        enviar();
    }
});

async function enviar() {
    const mensaje = input.value.trim();

    if (mensaje === "") {
        return;
    }

    agregarMensaje("Tú: " + mensaje);

    input.value = "";

    orb.classList.add("escuchando");

    try {
        const respuesta = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: mensaje
            })
        });

        const datos = await respuesta.json();

        agregarMensaje("Harvix: " + datos.reply);

    } catch (error) {

        agregarMensaje(
            "Harvix: Todavía no estoy conectado a mi mente."
        );

        console.error(error);

    } finally {
        orb.classList.remove("escuchando");
    }
}

function agregarMensaje(texto) {
    const mensaje = document.createElement("p");

    mensaje.textContent = texto;

    chat.appendChild(mensaje);

    chat.scrollTop = chat.scrollHeight;
}