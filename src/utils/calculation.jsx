export const calculateBalances = (people, expenses) => {
  const balances = {};
 
  // Initialize balances for all people
  people.forEach((person) => {
    balances[person] = 0;
  });

  // Calculate balances based on expenses
  expenses.forEach(expense => {
    const amount = expense.amount;
    const paidBy = expense.paidBy;
    const numberOfPeople = people.length;
    
    // The person who paid gets credit for the full amount
    if (paidBy && balances.hasOwnProperty(paidBy)) {
      balances[paidBy] += amount;
    }

    // Split the expense equally among all people (including the payer)
    const amountPerPerson = amount / numberOfPeople;
    
    people.forEach(person => {
      if (balances.hasOwnProperty(person)) {
        balances[person] -= amountPerPerson;
      }
    });
  });

  // Round to 2 decimal places to avoid floating point precision issues
  Object.keys(balances).forEach(person => {
    balances[person] = Math.round(balances[person] * 100) / 100;
  });

  return balances;
}
