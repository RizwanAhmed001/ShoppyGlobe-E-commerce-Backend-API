// --- global errorHandler.js ---
export const errorHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Internal server error' });
};


// --- middleware/methodLogs.js ---
export const methodLogs = (req, res, next) => {
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode}`
    );
  });
  next();
};