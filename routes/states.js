const express = require('express');
const { get } = require('express/lib/response');
const router = express.Router();
const stateController = require('../controllers/stateController');
const verify = require('../middleware/verify');

router.route('/')
  .get(stateController.getStateData)
  .post(stateController.createState);

router.route('/:state')
  .get(verify, stateController.getState);

router.route('/:state/capital')
  .get(verify, stateController.getStateCapital);

  router.route('/:state/nickname')
  .get(verify, stateController.getStateNickName);

  router.route('/:state/population')
  .get(verify, stateController.getStatePop);

  router.route('/:state/admission')
  .get(verify, stateController.getStateAdmission);


router.route('/mongo')
  .get(stateController.getMongoStates);

router.route('/:state/funfact')
  .get(verify, stateController.getFunfact)
  // .post(verify, stateController.createFunFact);

module.exports = router;