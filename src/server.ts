import app from "./config/app";
const PORT = 8000;

var ip: string;
if (process.env.NODE_ENV == "production") {
  ip = "192.168.0.22";
} else {
  ip = "localhost";
}

app.listen(PORT, ip, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Listening at http://${ip}:${PORT}`);
});
