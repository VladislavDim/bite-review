export default function errorHandler(err, req, res, next) {
    if (err.name === 'MulterError') {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }

    if (err.message?.includes("Only image files")) {
        return res.status(415).json({ message: err.message });
    }

    console.error('Unhandled server error:', err);
    res.status(500).json({ message: "Internal server error" });
}
