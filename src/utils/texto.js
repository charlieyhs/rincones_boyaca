/** Recorta el texto a `n` caracteres y agrega "..." solo si lo recortó. */
export function truncar(texto = "", n = 100) {
  return texto.length > n ? `${texto.slice(0, n).trimEnd()}...` : texto;
}

/** Minúsculas y sin tildes, para comparar búsquedas ("Bárbara" === "barbara"). */
export function normalizarTexto(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
