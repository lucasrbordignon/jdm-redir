const http = require("http");

const links = [
  "https://api.whatsapp.com/send?phone=556291276662&text=Ol%C3%A1%20Jordana!%20Tenho%20interesse%20em%20adquirir%20meu%20primeiro%20im%C3%B3vel!&",
  "https://api.whatsapp.com/send?phone=556298155550&text=Ol%C3%A1%20Dirceu!%20Tenho%20interesse%20em%20adquirir%20meu%20primeiro%20im%C3%B3vel!&",
];

let i = 0;

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.writeHead(204);
      return res.end();
    }
    const destino = links[i];
    i = (i + 1) % links.length; // alterna 1, 2, 1, 2...
    res.writeHead(302, {
      Location: destino,
      "Cache-Control": "no-store, no-cache, must-revalidate",
    });
    res.end();
  })
  .listen(process.env.PORT || 3000, () => console.log("Rodando"));
