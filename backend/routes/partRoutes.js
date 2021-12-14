const { Router } = require('express');
const partController = require('../controllers/partController');

const router = Router();

router.get('/part/:category', partController.part_get);

router.post('/part', partController.part_post);

router.delete('/part/:id', partController.part_delete);


module.exports = router;