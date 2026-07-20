import app from "./index";
import { env } from "./config/env";

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
