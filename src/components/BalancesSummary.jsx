
import Card from "./UI/Card";
import { BalanceIcon } from "./UI/Icons";


export default function BalancesSummary({ balances, onSettleUp }) {
  const balanceEntries = Object.entries(balances);
  const hasBalances = balanceEntries.length > 0;

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BalanceIcon className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Balances</h3>
      </div>

      {balanceEntries.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p className="text-lg mb-2">No balances yet</p>
          <p className="text-sm">Add some expenses to see balance calculations</p>
        </div>
      ) : (
        <ul className="space-y-2 mb-6">
          {balanceEntries.map(([person, amount]) => (
            <li
              key={person}
              className="flex justify-between items-center py-2"
            >
              <span className="font-medium text-slate-700">{person}</span>
              <span className={`font-medium ${
                amount < 0 ? "text-red-500" : amount > 0 ? "text-green-600" : "text-slate-500"
              }`}>
                {amount < 0 ? "-" : amount > 0 ? "+" : ""}${Math.abs(amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {hasBalances && (

        <button onClick={onSettleUp} className="w-full flex items-center justify-center gap-2 bg-primary text-black px-5 py-3 rounded-xl hover:bg-emerald-700 transition-colors">
          <span>💳</span>
          Settle Up
        </button>
      )}
    </Card>
  );
}
