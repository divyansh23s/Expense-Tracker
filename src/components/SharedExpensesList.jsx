import Card from "./UI/Card";
import { EmptyIcon, ExpenseIcon } from "./UI/Icons";
import ExpenseItem from "./ExpenseItem";

export default function SharedExpensesList({ expenses, people, onUpdateExpense, onDeleteExpense }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <ExpenseIcon className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Shared Expenses</h3>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <EmptyIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-lg mb-2">No expenses yet</p>
          <p className="text-sm">Add your first expense to get started</p>
        </div>
      ) : (

        <ul className="space-y-3">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              people={people}
              onUpdateExpense={onUpdateExpense}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
