import express from "express";

const app = express();

app.get("/api/hello", (req, res) => {
  const visitor_name = req.query.visitor_name;
  const clientIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

  // Use Vercel's geolocation headers
  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const city = req.headers["x-vercel-ip-city"] || "Unknown";

  const location = `${city}, ${country}`;

  res.send({
    Client_ip: clientIp,
    location: location,
    greeting: `Hello ${visitor_name}, the temperature is 30 degrees Celsius in ${location}`,
  });
});

app.listen(8000, () => console.log("Server started on port 8000"));
