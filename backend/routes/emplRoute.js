const express = require('express');
const router = express.Router();

const  employee_controller = require('../controller/emplController')

router.get('/', employee_controller.employee_list);
 router.get('/:id', employee_controller.employee_detail);
 router.post('/add',employee_controller.employee_create);
 
 router.put('/:id', employee_controller.employee_edit);
 router.delete('/:id', employee_controller.employee_delete);
  
  
 //export this router to use in our index.js
 module.exports = router;