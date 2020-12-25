import app from "./config/app";
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
  console.log("Pogchampion!!");
});
