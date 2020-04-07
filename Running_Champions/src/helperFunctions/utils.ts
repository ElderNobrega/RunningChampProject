export function sayHello() {
    return Math.random() < 0.5 ? "Hello" : "Hola";
}

export function enableDarkTheme(shouldEnable) {
    document.body.classList.toggle("dark", shouldEnable);
}