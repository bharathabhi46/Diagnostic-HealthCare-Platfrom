import express from "express";
import { registerRouter } from "./routes/auth.js";
import { testRouter } from "./routes/testRouter.js";
import { packageRouter } from "./routes/packageRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { orderRouter } from "./routes/orderRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { collectorRouter } from "./routes/collectorRouter.js";
const app = express();

app.use(express.json());
app.use("/api/auth", registerRouter);
app.use("/api/tests", testRouter);
app.use("/api/packages", packageRouter);

app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.use("/api/admin", adminRouter);
app.use("/api/collector", collectorRouter);

app.use("/");
app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

export default app;
