import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined. Please set it in your .env file.");
    return;
  }

  try {
    const db = await connect(process.env.MONGODB_URI);

    conn.isConnected = db.connections[0].readyState;
    console.log(`Connected to MongoDB: ${db.connection.db.databaseName}`);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connection.on("connected", () => {
  console.log("MongoDB connection established successfully.");
});

connection.on("disconnected", () => {
  console.log("MongoDB connection was disconnected.");
});

connection.on("error", (err) => {
  console.error("MongoDB Error:", err.message);
});

process.on("SIGINT", async () => {
  await connection.close();
  console.log("MongoDB connection closed due to app termination.");
  process.exit(0);
});
