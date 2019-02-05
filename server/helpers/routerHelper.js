const express = require('express')
const router = express.Router()
const verifyToken = require('../helpers/verifyToken')
const userController = require('../controllers/userControllers')
const pizzaController = require('../controllers/pizzaControllers')
const employeeController = require('../controllers/employeeControllers')

router.get('/', pizzaController.getProducts)
router.get('/main', verifyToken, pizzaController.getProducts)
router.get('/cook', verifyToken, employeeController.getOrdersQueue)
router.put('/cook', verifyToken, employeeController.putCookRequests)
router.post('/cook', verifyToken, employeeController.postCookRequests)
router.post('/cook/history', verifyToken, employeeController.getCookedOrdersHistory)
router.delete('/cook', verifyToken, employeeController.deleteOrderFromQueue)
router.post('/registration', userController.register)
router.post('/login', userController.login)
router.post('/main', verifyToken, userController.saveOrderData)
router.post('/main/history', verifyToken, userController.getOrdersHistory)


module.exports = router
