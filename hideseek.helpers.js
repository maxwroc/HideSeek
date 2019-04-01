/**
 * HideSeek helpers
 * @preserve
 */
(window["hideseek"] = window["hideseek"] || {}).removeAccents = function(text) {
  return text
    .replace(/[áàãâäą]/gi, "a")
    .replace(/[çčć]/gi, "c")
    .replace(/[éè¨êę]/gi, "e")
    .replace(/[íìïî]/gi, "i")
    .replace(/[ĺľł]/gi, "l")
    .replace(/[ñňń]/gi, "n")
    .replace(/[óòöôõ]/gi, "o")
    .replace(/[ŕř]/gi, "r")
    .replace(/[šś]/gi, "s")
    .replace(/[ť]/gi, "t")
    .replace(/[úùüû]/gi, "u")
    .replace(/[ý]/gi, "y")
    .replace(/[žźż]/gi, "z");
};