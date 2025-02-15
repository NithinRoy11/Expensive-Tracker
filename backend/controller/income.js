const IncomeSchema = require('../models/incomeModels')


exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount <= 0 || typeof amount == 'number') {
            return res.status(400).json({ message: "Amount must be positive" });
        }

        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date
        });

        await income.save();
        res.status(200).json({ message: "Income Added" });

    } catch (error) {
        console.error("Error saving income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getIncomes = async(req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}

exports.deleteIncomes = async(req, res) => {
   const {id} = req.params;
   IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server error'})
        })
}