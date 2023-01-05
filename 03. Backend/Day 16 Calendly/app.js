const express = ('express');
const cors = require("cors");   // do not want to allow any servers to hit our api and get the data
"dotenv": "^16.0.3",
const connectDB = require("./config./db");

require("dot.env").config();

const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const eventRoutes = require('./routes/eventRoutes');

const PORT = process.env.PORT;

const app = express();
connectDB(); //Database Connection

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api", require("./routes/api"));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/schedule', scheduleRoutes);
app.use('/api/v1/event', eventRoutes);

app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});
