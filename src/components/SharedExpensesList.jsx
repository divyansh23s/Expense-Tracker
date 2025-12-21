
import Card from "./UI/Card";
import { EmptyIcon, ExpenseIcon } from "./UI/Icons";

export default function SharedExpensesList({ expenses }) {
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
          {expenses.map((exp, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-2 last:border-b-0"
            >
              <span className="text-slate-700 font-medium">{exp.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  {exp.paidBy}
                </span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  ${exp.amount.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
