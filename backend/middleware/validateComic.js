
// comicValidator.js
//
// Brendan Dileo, June 2025

const validateComic = (req, res, next) => {
    const { title, author, issue, volume } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Missing required fields!' });
    }
    next();
};

module.exports = validateComic;