const { Router } = require('express');
const propertyRoutes = require('./property.route');

const router = Router();

router.use('/properties', propertyRoutes);


module.exports = router;
