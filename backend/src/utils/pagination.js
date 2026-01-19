const paginate = (req) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100); // Cap at 100 items per page
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

module.exports = paginate;
