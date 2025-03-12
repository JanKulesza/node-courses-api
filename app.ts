import { createServer } from "http";

const server = createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    res.write("Hello World!");
    res.end();
  }
  if (req.url === "/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Listening on port 8080...");
});
