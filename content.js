chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "eliminarElemento") {
    const elementos = document.querySelectorAll(".snowfall-flakes");
    if (elementos.length > 0) {
      elementos.forEach((elemento) => {
        elemento.remove();
      });
      //alert(`Se eliminaron ${elementos.length} elementos.`);
      alert("Se ha eliminado la nieve");
    }
    /*
    else {
      alert("No se encontró ningún elemento con esa clase.");
    } */
  }
});
chrome.storage.sync.get(["eliminarElementos"], (result) => {
  if (result.eliminarElementos) {
    const elementos = document.querySelectorAll(".snowfall-flakes");
    if (elementos.length > 0) {
      elementos.forEach((elemento) => elemento.remove());
      console.log(`Se eliminaron ${elementos.length} elementos.`);
    }
  }
});
