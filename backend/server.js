const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("API running");
});

const startServer = async () => {

    await connectDB();

    app.listen(5000, ()=>{
        console.log("Server running on port 5000");
    });

};

const leaseRoutes = require("./routes/leaseRoutes");
app.use("/api/leases", leaseRoutes);

const inspectionRoutes = require("./routes/inspectionRoutes");
app.use("/api/inspections", inspectionRoutes);

const listingRoutes = require("./routes/listingRoutes");
app.use("/api/listings", listingRoutes);

startServer();