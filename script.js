const inputTexto = document.getElementById("inputTexto");
const btnEncriptar = document.getElementById("btnencriptar");
const btnDesencriptar = document.getElementById("btndesencriptar");
const btnCopiar = document.getElementById("btncopiar");
const outputTexto = document.getElementById("ouputTexto");
const imagenCont = document.getElementById("imagenCont");
const mensajeText = document.getElementById("mensajetext");
const contenido = document.getElementById("contenido");

const reemplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

function ajustarImagen() {
    if (window.innerWidth <= 1200 || outputTexto.value !== "Ningún mensaje fue encontrado") {
        imagenCont.style.display = "none";
    } else {
        imagenCont.style.display = "block";
    }
}

window.addEventListener('resize', ajustarImagen);

const actualizarUI = (texto) => {
    outputTexto.value = texto; 
    inputTexto.value = "";
    ajustarImagen();
    mensajeText.style.display = "none";
    btnCopiar.style.visibility = "visible";
    outputTexto.classList.add("ajustar")
    ajustarAlturaTextarea(outputTexto); 
    contenido.classList.add("ajustar"); 
};

const ajustarAlturaTextarea = (element) => {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
};

const encriptar = (texto) => {
    return reemplazar.reduce((acc, [original, encriptado]) => {
        return acc.replaceAll(original, encriptado);
    }, texto);
};

const desencriptar = (texto) => {
    return reemplazar.reduce((acc, [encriptado, original]) => {
        return acc.replaceAll(original, encriptado);
    }, texto);
};

btnEncriptar.addEventListener('click', () => {
    const texto = inputTexto.value.toLowerCase();
    if (texto) {
        const textoEncriptado = encriptar(texto);
        actualizarUI(textoEncriptado);
    } else {
        alert("Por favor, ingrese un texto.");
        inputTexto.focus();
    }
});

btnDesencriptar.addEventListener('click', () => {
    const texto = inputTexto.value.toLowerCase();
    if (texto) {
        const textoDesencriptado = desencriptar(texto);
        actualizarUI(textoDesencriptado);
    } else {
        alert("Por favor, ingrese un texto.");
        inputTexto.focus();
    }
});

btnCopiar.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputTexto.value); 
        outputTexto.value = "Ningún mensaje fue encontrado"; 
        ajustarImagen();
        mensajeText.style.display = "block";
        btnCopiar.style.visibility = "hidden";
        inputTexto.focus();
    } catch (err) {
        console.error("Error al copiar al portapapeles: ", err);
    }
});

ajustarImagen();
