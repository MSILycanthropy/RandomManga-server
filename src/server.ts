import app from "./config/app";
const PORT = 8000;

app.listen(PORT, "192.168.0.22", () => {
  console.log(`Listening at http://192.168.0.22:${PORT}`);
});
