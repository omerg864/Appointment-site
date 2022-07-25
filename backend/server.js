import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { errorHandler } from "./middleware/ErrorMiddleware.js";
import connectDB from "./config/db.js";
import colors from "colors";
import { Socket } from "socket.io";
// routes
import userRoutes from "./routes/UserRoutes.js";
import dayRoutes from "./routes/DayRoutes.js";
import settingsRoutes from "./routes/SettingsRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const config = dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

/*const io = new Socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});*/

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/days", dayRoutes);
app.use("/api/v1/settings", settingsRoutes);


if (process.env.NODE_ENV === 'production') {
    console.log(`Server is running on production mode`);
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
    });
}

app.use(errorHandler);