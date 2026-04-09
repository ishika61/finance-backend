exports.getRecords = async (req, res) => {
  try {
    const { type, category, search, page = 1, limit = 5 } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    // 🔍 Search in category or note
    if (search) {
      filter.$or = [
        { category: { $regex: search, $options: "i" } },
        { note: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;

    const records = await Record.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      records
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};