var express = require('express');
var router = express.Router();
var examinee_controller = require('../controllers/examineeController.js');

router.get('/', examinee_controller.examineeindex);
router.get('/getjob', examinee_controller.examinee_getjobs_get);
router.get('/getexam', examinee_controller.examinee_getexam_get);
router.post('/register', examinee_controller.examinee_create_post);
router.post('/login', examinee_controller.examinee_login_post);
router.post('/update', examinee_controller.examinee_update_put);
router.post('/delete', examinee_controller.examinee_delete_post);
router.post('/submitexam/:id', examinee_controller.examinee_submit_post);
router.post('/submitessay/:id', examinee_controller.examinee_submitessay_post);
router.post('/finished/:id', examinee_controller.examinee_finished_exam);
router.get('/score/:id', examinee_controller.getscore);
router.get('/essay/:id', examinee_controller.getEssay);



module.exports = router;