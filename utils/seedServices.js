const Service = require('../models/Service');

const seedServices = async () => {
  try {
    const existingServices = await Service.countDocuments();
    if (existingServices > 0) {
      console.log('Services already seeded');
      return;
    }

    const services = [
      {
        name: 'Performance Tuning',
        description: 'Engine optimization and performance enhancement',
        price: 599,
        category: 'Performance',
        icon: 'Zap',
      },
      {
        name: 'Custom Exhaust',
        description: 'High-performance custom exhaust system',
        price: 899,
        category: 'Performance',
        icon: 'Zap',
      },
      {
        name: 'Turbo Installation',
        description: 'Professional turbocharger installation and tuning',
        price: 2499,
        category: 'Performance',
        icon: 'Zap',
      },
      {
        name: 'Suspension Upgrade',
        description: 'Complete suspension system upgrade',
        price: 1299,
        category: 'Handling',
        icon: 'Settings',
      },
      {
        name: 'Body Kit',
        description: 'Custom aerodynamic body kit installation',
        price: 1799,
        category: 'Appearance',
        icon: 'Palette',
      },
      {
        name: 'Wheel Package',
        description: 'Premium wheel and tire package',
        price: 1999,
        category: 'Appearance',
        icon: 'Circle',
      },
    ];

    await Service.insertMany(services);
    console.log('Sample services seeded successfully');
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

module.exports = seedServices;