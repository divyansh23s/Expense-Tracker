export default function ExpenseItem({ expense }) {
  return (
    <li>
      {expense.description} - ${expense.amount} (Paid by {expense.paidBy})
    </li>
  );
}
