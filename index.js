import express from "express";
import geoip from "geoip-lite";

const app = express();

app.get("/hello", (req, res) => {
  const visitor_name = req.query.visitor_name;
  const clientIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

  const ipv4 = clientIp.split(":").pop();

  console.log(ipv4);
  const geo = geoip.lookup(ipv4); // Get geolocation info

  const location = geo ? `${geo.city}, ${geo.country}` : "Unknown";

  res.json({
    Client_ip: ipv4,
    location: location,
    greeting: `Hello ${visitor_name}, the temperature is 30 degrees Celsius in ${location}`,
  });
});

app.listen(8000, () => console.log("Server started on port 8000"));
