const path = require('path');

module.exports = (req, res, next) => {
  const filePath = path.join(__dirname, '../assets/images', req.url);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Image not found');
    }
  });
};
