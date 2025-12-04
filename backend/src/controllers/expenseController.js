import Expense from "../models/Expense.js";

// ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    const newExpense = new Expense({
      userId: req.user,
      amount,
      category,
      description,
    });

    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL EXPENSES OF USER
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await Expense.findOneAndDelete({ _id: id, userId: req.user });

    res.json({ msg: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
