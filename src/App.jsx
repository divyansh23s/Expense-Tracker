
import PeopleList from "./components/PeopleList"
import ExpenseForm from "./components/ExpenseForm"
import SharedExpensesList from "./components/SharedExpensesList"
import BalancesSummary from "./components/BalancesSummary"
import { useExpenseLogic } from "./hooks/useExpenseLogic"
import { AppLogo } from "./components/UI/Icons"
function App() {

  const { people, expenses, balances, addPerson, updatePerson, deletePerson, addExpense, updateExpense, deleteExpense, settleUp } = useExpenseLogic()

  return (

    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-center gap-4 mb-10">
        <AppLogo className="w-12 h-12" />
        <h1 className="text-4xl font-bold text-slate-800">
          Split Expenses
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">


        <PeopleList people={people} onAddPerson={addPerson} onUpdatePerson={updatePerson} onDeletePerson={deletePerson} />
        <div>
          <SharedExpensesList expenses={expenses} people={people} onUpdateExpense={updateExpense} onDeleteExpense={deleteExpense} />
          <ExpenseForm people={people} onAddExpense={addExpense} />
        </div>
      </div>


      <BalancesSummary balances={balances} onSettleUp={settleUp} />
    </div>
  );
}

export default App
