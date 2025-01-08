// controllers/designerProfile.controller.js
const User = require('../models/user.model');
const ProfessionalProfile = require('../models/professionalProfile.model');

// Get Designer Profile with essential information
const getDesignerProfile = async (req, res) => {
  try {
    const { designerId } = req.params;

    const designerProfile = await User.findOne({ 
      _id: designerId, 
      role: 'designer' 
    })
    .select('firstName lastName profilePicture average_rating country')
    .lean();

    if (!designerProfile) {
      return res.status(404).json({ message: 'Designer not found' });
    }

    const professionalInfo = await ProfessionalProfile.findOne({ 
      user: designerId 
    })
    .select(`
      company position experience aboutMe
      roleSpecificInfo.isDesigner
      averageRating
      portfolio
      address
    `)
    .populate({
      path: 'ratings',
      select: 'rating review date',
      populate: {
        path: 'givenBy',
        select: 'firstName lastName profilePicture'
      },
      options: { 
        sort: { date: -1 },
        limit: 5 // Get only recent 5 ratings
      }
    })
    .populate({
      path: 'projects',
      select: 'title description status completedAt images',
      match: { status: 'completed' },
      options: {
        sort: { completedAt: -1 },
        limit: 3 // Get only recent 3 projects
      }
    })
    .lean();

    // Combine user and professional info
    const fullProfile = {
      ...designerProfile,
      professionalInfo: professionalInfo || {}
    };

    res.json(fullProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Designer's Full Portfolio
const getDesignerPortfolio = async (req, res) => {
  try {
    const { designerId } = req.params;
    const { page = 1, limit = 9 } = req.query;

    const portfolio = await ProfessionalProfile.findOne({ 
      user: designerId 
    })
    .select('portfolio')
    .slice('portfolio', [(page - 1) * limit, limit])
    .lean();

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Get total count for pagination
    const totalCount = await ProfessionalProfile.findOne({ 
      user: designerId 
    })
    .select('portfolio')
    .then(prof => prof.portfolio.length);

    res.json({
      portfolio: portfolio.portfolio,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Designer's All Reviews
const getDesignerReviews = async (req, res) => {
  try {
    const { designerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await ProfessionalProfile.findOne({ 
      user: designerId 
    })
    .select('ratings averageRating')
    .populate({
      path: 'ratings',
      populate: {
        path: 'givenBy',
        select: 'firstName lastName profilePicture'
      },
      options: {
        sort: { date: -1 },
        skip: (page - 1) * limit,
        limit: limit
      }
    })
    .lean();

    if (!reviews) {
      return res.status(404).json({ message: 'Reviews not found' });
    }

    // Get total count for pagination
    const totalCount = reviews.ratings.length;

    res.json({
      reviews: reviews.ratings,
      averageRating: reviews.averageRating,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Designer's Completed Projects
const getDesignerProjects = async (req, res) => {
  try {
    const { designerId } = req.params;
    const { page = 1, limit = 6 } = req.query;

    const profile = await ProfessionalProfile.findOne({ 
      user: designerId 
    })
    .select('projects')
    .populate({
      path: 'projects',
      match: { status: 'completed' },
      select: 'title description completedAt images clientReview budget',
      options: {
        sort: { completedAt: -1 },
        skip: (page - 1) * limit,
        limit: limit
      }
    })
    .lean();

    if (!profile) {
      return res.status(404).json({ message: 'Projects not found' });
    }

    // Get total count for pagination
    const totalCount = await ProfessionalProfile.findOne({ 
      user: designerId 
    })
    .populate({
      path: 'projects',
      match: { status: 'completed' }
    })
    .then(prof => prof.projects.length);

    res.json({
      projects: profile.projects,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDesignerProfile,
  getDesignerPortfolio,
  getDesignerReviews,
  getDesignerProjects
};