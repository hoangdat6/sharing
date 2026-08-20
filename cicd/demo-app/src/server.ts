import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const app = createApp();

app.listen(port, () => {
  console.log(`demo-app listening on http://127.0.0.1:${port}`);
});
