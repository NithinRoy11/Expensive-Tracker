const {addIncome, getIncomes, deleteIncomes} = require('../controller/income')
const {addExpense, getExpense,deleteExpense} = require('../controller/expense')

const router = require('express').Router();



router.post('/add-incomes', addIncome)
       .get('/get-incomes', getIncomes)
       .delete('/delete-incomes/:id', deleteIncomes)
       .post('/add-expense', addExpense)
       .get('/get-expense', getExpense)
       .delete('/delete-expense/:id', deleteExpense)

module.exports=router