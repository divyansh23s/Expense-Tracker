

import { useState, useEffect } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { ExpenseIcon } from "./UI/Icons";

export default function ExpenseForm({ people, onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [errors, setErrors] = useState({});

  // Update paidBy when people array changes
  useEffect(() => {
    if (people.length > 0 && !paidBy) {
      setPaidBy(people[0]);
    }
  }, [people, paidBy]);

  function validateForm() {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Valid amount is required";
    }
    
    if (!paidBy || !people.includes(paidBy)) {
      newErrors.paidBy = "Please select a person who paid";
    }
    
    if (people.length === 0) {
      newErrors.general = "Please add at least one person first";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function submitHandler(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    

    onAddExpense({ 
      id: Date.now().toString(),
      title: title.trim(), 
      amount: Number(amount), 
      paidBy 
    });
    
    // Reset form
    setTitle("");
    setAmount("");
    if (people.length > 0) {
      setPaidBy(people[0]);
    }
    setErrors({});
  }


  if (people.length === 0) {
    return (
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <ExpenseIcon className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Add Expense</h3>
        </div>
        <div className="text-center py-8 text-slate-500">
          <p>Please add people first before creating expenses.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <ExpenseIcon className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Add Expense</h3>
      </div>

      <form onSubmit={submitHandler} className="space-y-3">
        <div>
          <input
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.title ? 'border-red-500' : ''
            }`}
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.amount ? 'border-red-500' : ''
            }`}
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <select
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.paidBy ? 'border-red-500' : ''
            }`}
            value={paidBy}
            onChange={e => setPaidBy(e.target.value)}
          >
            <option value="">Select who paid</option>
            {people.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.paidBy && (
            <p className="text-red-500 text-sm mt-1">{errors.paidBy}</p>
          )}
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}

        <Button 
          type="submit"
          disabled={people.length === 0}
          className="w-full"
        >
          Add Expense
        </Button>
      </form>
    </Card>
  );
}
