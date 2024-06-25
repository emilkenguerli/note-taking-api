const connectDB = require("./database");
const app = require("./app");
const config = require("./config");
require("dotenv").config();

// Connect to the database
connectDB();

// Start the server
const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
