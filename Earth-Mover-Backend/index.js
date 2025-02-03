import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import EquipmentRoute from "./routes/EquipmentRoute.js"
import uploadRoute from "./controllers/routeUpload.js"
import adminRouters from "./routes/adminRouters.js";
import fileUpload from "express-fileupload"
import path from "path"
dotenv.config();
const app = express();
const PORT = process.env.PORT;

const _dirname = path.resolve();

connectDB();
app.use(cors());    
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({useTempFiles:true}));
app.use(cors({
    origin:['https://www.dushadinfra.com','https://wwww.admin.dushadinfra.com'],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}))

app.get("/", (req,res) => {
    res.send("Api is working fine");
})

app.use("/api/users", uploadRoute);
app.use("/api", EquipmentRoute);

// admin api from here
app.use('/admin/v1',adminRouters);

app.listen(PORT, () => {
    console.log(`PORT is running at ${PORT}`);
})