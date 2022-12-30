const express = ('express');
const cors = require("cors");
const app = express();
const connectDB = require("./config./db");

require("dot.env").config();

const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const EventRoutes = require('./routes/EventRoutes');
connectDB();
app.set(cors());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/schedule', scheduleRoutes);
app.use('/api/v1/event', eventRoutes);

app.listen(process.env.PORT, () => {
    console.log('server is running');
})
