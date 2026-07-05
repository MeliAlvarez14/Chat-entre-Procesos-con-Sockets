using System;
using System.IO; 
using System.Net.Sockets;
using System.Text;
using Spectre.Console;

AnsiConsole.Write(
    new FigletText("SOCKY CHAT")
        .Centered()
        .Color(Color.Pink1));

try 
{
    TcpClient client = new TcpClient("127.0.0.1", 5000);
    AnsiConsole.MarkupLine("[green]✔[/] Conectado al servidor con éxito.\n");

    NetworkStream stream = client.GetStream();
    bool conectado = true;

    while (conectado)
    {
        string mensaje = AnsiConsole.Prompt(
            new TextPrompt<string>("[bold DeepPink3_1]Escribí tu mensaje:[/] ")
                .AllowEmpty());

        if (string.IsNullOrEmpty(mensaje)) continue;

        if (mensaje.Trim().ToLower() == "salir")
        {
            conectado = false;
            continue;
        }

        try
        {
            byte[] dataEnviar = Encoding.UTF8.GetBytes(mensaje);
            stream.Write(dataEnviar, 0, dataEnviar.Length);

            byte[] dataRecibir = new byte[1024];
            int bytesLeidos = stream.Read(dataRecibir, 0, dataRecibir.Length);
            
            if (bytesLeidos > 0)
            {
                string respuesta = Encoding.UTF8.GetString(dataRecibir, 0, bytesLeidos);
                
                string contenidoLimpio = $"[Gold1]Tú:[/] {Markup.Escape(mensaje)}\n[bold DeepPink4_2]Servidor:[/] {Markup.Escape(respuesta)}";

                var panel = new Panel(contenidoLimpio)
                {
                    Border = BoxBorder.Rounded,
                    Padding = new Padding(1, 0, 1, 0)
                };
                
                AnsiConsole.Write(panel);
            }
            else
            {
                AnsiConsole.MarkupLine("\n[bold red]✖ El servidor interrumpió la conexión.[/]");
                conectado = false;
            }
        }
        catch (IOException)
        {
            AnsiConsole.MarkupLine("\n[bold red]✖ Error:[/] No se pudo enviar el mensaje. El servidor no está disponible.");
            conectado = false;
        }
    }

    AnsiConsole.MarkupLine("[Gray93]Desconectando del servidor...[/]");
    stream.Close();
    client.Close();
}
catch (Exception e) 
{
    AnsiConsole.MarkupLine("[bold red]No se pudo establecer la conexión inicial con el servidor.[/]");
    AnsiConsole.WriteException(e);
}