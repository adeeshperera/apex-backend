const validateInput = (fields) => {
  return (req, res, next) => {
    const errors = [];
    
    fields.forEach(field => {
      if (!req.body[field]) {
        errors.push(`${field} is required`);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
  };
};

module.exports = { validateInput };