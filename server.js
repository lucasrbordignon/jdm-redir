const http = require("http");

// Defina o ID do pixel na variável de ambiente PIXEL_ID (ou troque aqui)
const PIXEL_ID = process.env.PIXEL_ID || "1333531238811803";

const links = [
  "https://api.whatsapp.com/send?phone=556291276662&text=Ol%C3%A1%20Jordana!%20Tenho%20interesse%20em%20adquirir%20meu%20primeiro%20im%C3%B3vel!&",
  "https://api.whatsapp.com/send?phone=556298155550&text=Ol%C3%A1%20Dirceu!%20Tenho%20interesse%20em%20adquirir%20meu%20primeiro%20im%C3%B3vel!&",
];

let i = 0;

const pagina = (destino) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Redirecionando...</title>
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(PIXEL_ID)});
fbq('track', 'PageView');
fbq('track', 'Contact');
setTimeout(function () { location.replace(${JSON.stringify(destino)}); }, 700);
</script>
<noscript><meta http-equiv="refresh" content="0;url=${destino.replace(/&/g, "&amp;")}"></noscript>
</head>
<body style="font-family:sans-serif;text-align:center;padding-top:20vh">
<p>Redirecionando para o WhatsApp...</p>
<p><a href="${destino.replace(/&/g, "&amp;")}">Clique aqui se não for redirecionado</a></p>
</body>
</html>`;

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.writeHead(204);
      return res.end();
    }
    const destino = links[i];
    i = (i + 1) % links.length; // alterna 1, 2, 1, 2...
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    });
    res.end(pagina(destino));
  })
  .listen(process.env.PORT || 3000, () => console.log("Rodando"));
