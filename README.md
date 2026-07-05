# Chat entre Procesos con Sockets 💬

Este proyecto consiste en implementar una comunicación entre dos procesos independientes usando sockets TCP.
El sistema demuestra la interoperabilidad de protocolos de comunicación mediante el uso de **Sockets TCP** como mecanismo de Comunicación Entre Procesos (IPC), interconectando dos entornos tecnológicos completamente distintos en una arquitectura distribuida.

---

## 🛠️ Tecnologías Utilizadas

*   **Servidor:** Node.js (JavaScript) ejecutado sobre entorno Linux (Ubuntu/WSL).
*   **Cliente:** C# (.NET) con una interfaz de consola enriquecida mediante la librería `Spectre.Console`.
*   **Protocolo:** TCP (Transmission Control Protocol) sobre la interfaz local (`127.0.0.1`).

---

## 🚀 Instrucciones de Ejecución

Para correr el proyecto localmente, asegurate de tener instalados **Node.js** y el **SDK de .NET**.

### 1. Levantar el Servidor (Node.js)
Abrí una terminal y corre los siguientes comandos:
   ```bash
   cd servidor

   npm install

   npm run dev
   ```
### 2. Levantar el Cliente (C#)
Abrí otra terminal y corre los siguientes comandos:
  ```bash
  cd cliente/cliente-test
  dotnetrun
  ```


## Servidor
-<img width="604" height="351" alt="image" src="https://github.com/user-attachments/assets/a419ef8d-b9be-49e1-964f-99f83347ef33" />

## Cliente
-<img width="546" height="252" alt="image" src="https://github.com/user-attachments/assets/99a1b288-aa87-46ea-b8c7-77982540b40c" />
