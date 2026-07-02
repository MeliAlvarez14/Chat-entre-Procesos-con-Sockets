using System;
using System.Net.Sockets;
using System.Text;

try 
{
    TcpClient client = new TcpClient("127.0.0.1", 5000);
    Console.WriteLine("Conectado al servidor con éxito.");
    Console.WriteLine("Escribí tus mensajes a continuación. Para salir, escribí 'salir'.\n");

    NetworkStream stream = client.GetStream();
    bool conectado = true;

    while (conectado)
    {
        Console.Write("> ");
        string mensaje = Console.ReadLine();

        if (string.IsNullOrEmpty(mensaje)) continue;

        if (mensaje.Trim().ToLower() == "salir")
        {
            conectado = false;
            continue;
        }

        byte[] dataEnviar = Encoding.UTF8.GetBytes(mensaje);
        stream.Write(dataEnviar, 0, dataEnviar.Length);

        byte[] dataRecibir = new byte[1024]; // Aumentamos un poco el buffer por las dudas
        int bytesLeidos = stream.Read(dataRecibir, 0, dataRecibir.Length);
        
        if (bytesLeidos > 0)
        {
            string respuesta = Encoding.UTF8.GetString(dataRecibir, 0, bytesLeidos);
            Console.WriteLine($"[Servidor]: {respuesta}");
        }
    }

    Console.WriteLine("Desconectando del servidor...");
    stream.Close();
    client.Close();
}
catch (Exception e) 
{
    Console.WriteLine($"Error: {e.Message}");
}