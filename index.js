const http = require("http");
const https = require("https");
const fs = require("fs");
const homeFile = fs.readFileSync("home.html", "utf8"); // Specify encoding

const replaceVal = (tempVal, orgVal) => {
   let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
   temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
   temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
   temperature = temperature.replace("{%location%}", orgVal.name);
   temperature = temperature.replace("{%country%}", orgVal.sys.country);
   return temperature;
}

const server = http.createServer((req, res) => {
   if (req.url == "/") {
      https.get("https://api.openweathermap.org/data/2.5/weather?lat=18.52&lon=73.85&appid=027fb6b43e7909692652556192f4976c", (response) => {
         let data = '';

         response.on('data', (chunk) => {
            data += chunk;
         });

         response.on('end', () => {
            const objData = JSON.parse(data);
            const realTimeData = replaceVal(homeFile, objData); // Replace placeholders
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(realTimeData); // Send the modified HTML
            res.end();
         });

         response.on('error', (err) => {
            console.error("Error in response:", err);
            res.end();
         });
      });
   }
});

server.listen(8000, "127.0.0.1", () => {
   console.log("Server is running on port 8000");
});
