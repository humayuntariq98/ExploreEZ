function handleError(res, message, error) {
    console.error(error);
    res.status(500).json({ error: message });
}
module.exports = { handleError };