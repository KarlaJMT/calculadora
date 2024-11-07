const pantalla = document.querySelector(".pantalla");
let numeroAnterior = "";
let OperadorActual = null;
let ReiniciarPantalla = false;

function agregar(valor) {
    if (ReiniciarPantalla) {
        pantalla.value = "";
        ReiniciarPantalla = false;
    }

    if (["+", "-", "*", "/", "√"].includes(valor)) {
        if (OperadorActual !== null && valor !== "√") {
            calcular();
        }
        if (valor === "√") {
            OperadorActual = valor;
            calcular();
        } else {
            numeroAnterior = pantalla.value;
            OperadorActual = valor;
            ReiniciarPantalla = true;
        }
    } else {
        pantalla.value += valor;
    }
}

function limpiar() {
    pantalla.value = "";
    numeroAnterior = "";
    OperadorActual = null;
    ReiniciarPantalla = false;
}

function borrar() {
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular() {
    if (OperadorActual === null || ReiniciarPantalla) return;

    const num1 = parseFloat(numeroAnterior);
    const num2 = parseFloat(pantalla.value);

    if (isNaN(num1) && OperadorActual !== "√" || isNaN(num2)) {
        pantalla.value = "Error";
        setTimeout(limpiar, 1500);
        return;
    }

    let resultado;
    switch (OperadorActual) {
        case "+":
            resultado = num1 + num2;
            break;
        case "-":
            resultado = num1 - num2;
            break;
        case "*":
            resultado = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                pantalla.value = "Error";
                setTimeout(limpiar, 1500);
                return;
            }
            resultado = num1 / num2;
            break;
        case "√":
            if (num2 < 0) {
                pantalla.value = "Error";
                setTimeout(limpiar, 1500);
                return;
            }
            resultado = Math.sqrt(num2);
            break;
    }

    // Redondear resultado para que tenga máximo 8 decimales.
    resultado = Math.round(resultado * 100000000) / 100000000;
    pantalla.value = resultado;
    OperadorActual = null;
    numeroAnterior = "";
    ReiniciarPantalla = true;
}

// Manejo de eventos en el teclado.
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    const key = event.key;

    // Números y operadores.
    if (/[0-9\+\-\*\/\.]/.test(key)) {
        agregar(key);
    }
    // Tecla "Enter" para calcular el resultado.
    else if (key === "Enter") {
        calcular();
    }
    // Tecla "Escape" para limpiar la pantalla.
    else if (key === "Escape") {
        limpiar();
    }
    // Tecla "Backspace" para borrar o eliminar.
    else if (key === "Backspace") {
        borrar();
    }
});