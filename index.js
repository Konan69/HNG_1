const express = require("express");
const requestIp = require("request-ip");
const geoip = require("geoip-lite");

const app = express();

app.use(requestIp.mw());

app.get("/hello", (req, res) => {
  const visitor_name = req.query.visitor_name;
  const clientIp = req.clientIp; // Access the IP from the middleware
  console.log(clientIp);
  const geo = geoip.lookup(clientIp); // Get geolocation info

  const location = geo ? `${geo.city}, ${geo.country}` : "Unknown";

  res.json({
    Client_ip: clientIp,
    location: location,
    greeting: `Hello ${visitor_name}, the temperature is 30 degrees Celsius in ${location}`,
  });
});

app.listen(8000, () => console.log("Server started on port 8000"));
