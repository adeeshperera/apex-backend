const Build = require('../models/Build');

const getUserBuilds = async (req, res) => {
  try {
    const builds = await Build.find({ userId: req.params.userId });
    res.json(builds);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createBuild = async (req, res) => {
  try {
    const { carModel, color, selectedParts, totalPrice } = req.body;
    
    const build = await Build.create({
      userId: req.user._id,
      carModel,
      color,
      selectedParts,
      totalPrice,
    });

    res.status(201).json(build);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateBuild = async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    
    if (build && build.userId.toString() === req.user._id.toString()) {
      const updatedBuild = await Build.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true }
      );
      res.json(updatedBuild);
    } else {
      res.status(404).json({ message: 'Build not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteBuild = async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    
    if (build && build.userId.toString() === req.user._id.toString()) {
      await Build.findByIdAndDelete(req.params.id);
      res.json({ message: 'Build deleted' });
    } else {
      res.status(404).json({ message: 'Build not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBuildById = async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    
    if (build && build.userId.toString() === req.user._id.toString()) {
      res.json(build);
    } else {
      res.status(404).json({ message: 'Build not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserBuilds,
  createBuild,
  updateBuild,
  deleteBuild,
  getBuildById,
};