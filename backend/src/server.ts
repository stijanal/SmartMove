import { app } from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`SmartMove backend pokrenut na http://localhost:${env.PORT}`);
});
