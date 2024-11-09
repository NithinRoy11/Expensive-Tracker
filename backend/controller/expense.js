const ExpenseSchema = require('../models/expenseModels')


exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount <= 0 || typeof amount == 'number') {
            return res.status(400).json({ message: "Amount must be positive" });
        }

        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date
        });

        await expense.save();
        res.status(200).json({ message: "Expense Added" });

    } catch (error) {
        console.error("Error saving income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getExpense = async(req, res) => {
    try {
        const expense = await ExpenseSchema.find().sort({createAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}

exports.deleteExpense = async(req, res) => {
   const {id} = req.params;
   ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server error'})
        })
}