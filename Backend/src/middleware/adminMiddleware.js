module.exports = (req, res, next) => {
  const role = String(req.user?.role || '').toLowerCase();

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required.',
    });
  }

  next();
};
