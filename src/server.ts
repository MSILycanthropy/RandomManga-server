import app from "./config/app";
const PORT = 8000;

var ip = process.env.INTERNAL_IP || "localhost";

app.listen(PORT, ip, () => {
  console.log(`Listening at http://${ip}:${PORT}`);
});
