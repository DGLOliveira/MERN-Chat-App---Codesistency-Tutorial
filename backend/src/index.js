import express from 'express';
import authRoutes from './routes/auth.route.js';

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.use("/api/auth", authRoutes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});