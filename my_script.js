document.getElementById("toggleEstado").addEventListener("click", () => {
  //alert("Click");
  // Envía un mensaje al content script para que elimine el elemento
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "eliminarElemento" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toggleEstado");

  // Cargar el estado actual desde el almacenamiento
  chrome.storage.sync.get(["eliminarElementos"], (result) => {
    const estado = result.eliminarElementos ?? false;
    actualizarBoton(estado);
  });

  // Manejar el clic en el botón para cambiar el estado
  button.addEventListener("click", () => {
    chrome.storage.sync.get(["eliminarElementos"], (result) => {
      const nuevoEstado = !result.eliminarElementos;
      chrome.storage.sync.set({ eliminarElementos: nuevoEstado }, () => {
        actualizarBoton(nuevoEstado);
      });
    });
  });

  function actualizarBoton(estado) {
    button.textContent = estado ? "Desactivar" : "Activar";
    if (estado) {
      button.classList.remove("bg-green-500", "hover:bg-green-600");
      button.classList.add("bg-red-500", "hover:bg-red-600");
    } else {
      button.classList.remove("bg-red-500", "hover:bg-red-600");
      button.classList.add("bg-green-500", "hover:bg-green-600");
    }
  }
});
