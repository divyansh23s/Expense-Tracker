
import { useState } from "react";
import { EditIcon, DeleteIcon, SaveIcon, CancelIcon } from "./UI/Icons";

export default function ExpenseItem({ expense, people, onUpdateExpense, onDeleteExpense }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(expense.title);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());
  const [editPaidBy, setEditPaidBy] = useState(expense.paidBy);
  const [error, setError] = useState("");

  function handleEdit() {
    setIsEditing(true);
    setError("");
  }

  function handleSave() {
    if (!editTitle.trim()) {
      setError("Title is required");
      return;
    }

    const amount = Number(editAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Valid amount is required");
      return;
    }

    onUpdateExpense(expense.id, {
      title: editTitle.trim(),
      amount: amount,
      paidBy: editPaidBy
    });

    setIsEditing(false);
    setError("");
  }

  function handleCancel() {
    setIsEditing(false);
    setEditTitle(expense.title);
    setEditAmount(expense.amount.toString());
    setEditPaidBy(expense.paidBy);
    setError("");
  }

  function handleDelete() {
    if (window.confirm(`Are you sure you want to delete "${expense.title}"?`)) {
      onDeleteExpense(expense.id);
    }
  }

  if (isEditing) {
    return (
      <li className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Title"
          />
          
          <input
            type="number"
            step="0.01"
            value={editAmount}
            onChange={e => setEditAmount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Amount"
          />
          
          <select
            value={editPaidBy}
            onChange={e => setEditPaidBy(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            {people.map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <SaveIcon className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <CancelIcon className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg border hover:bg-gray-50">
      <div className="flex-1">
        <h4 className="font-medium text-slate-800">{expense.title}</h4>
        <p className="text-sm text-slate-600">
          ${expense.amount.toFixed(2)} • Paid by {expense.paidBy}
        </p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          title="Edit expense"
        >
          <EditIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          title="Delete expense"
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}
