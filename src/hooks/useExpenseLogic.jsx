import { useState } from "react";
import { calculateBalances } from "../utils/calculation";



export const useExpenseLogic = () => {
    const [ people, setPeople ] = useState([]);
    const [ expenses, setExpenses ] = useState([]);

    const addPerson = (person) => {
        setPeople([...people, person]);
    };

    const updatePerson = (oldName, newName) => {
        if (!newName.trim() || people.includes(newName.trim())) {
            return false;
        }

        const updatedPeople = people.map(person => 
            person === oldName ? newName.trim() : person
        );
        setPeople(updatedPeople);

        // Update expenses that reference this person
        const updatedExpenses = expenses.map(expense => ({
            ...expense,
            paidBy: expense.paidBy === oldName ? newName.trim() : expense.paidBy
        }));
        setExpenses(updatedExpenses);
        
        return true;
    };

    const deletePerson = (personName) => {
        // Check if person has any unpaid expenses
        const hasExpenses = expenses.some(expense => expense.paidBy === personName);
        if (hasExpenses) {
            return { success: false, error: "Cannot delete person with outstanding expenses" };
        }

        const updatedPeople = people.filter(person => person !== personName);
        setPeople(updatedPeople);
        return { success: true };
    };

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const updateExpense = (expenseId, updatedExpense) => {
        const updatedExpenses = expenses.map(expense => 
            expense.id === expenseId ? { ...expense, ...updatedExpense } : expense
        );
        setExpenses(updatedExpenses);
    };

    const deleteExpense = (expenseId) => {
        const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
        setExpenses(updatedExpenses);
    };

    const settleUp = () => {
        setExpenses([]);
    };

    const balances = calculateBalances(people, expenses);

    return {
        people,
        expenses,
        balances,
        addPerson,
        updatePerson,
        deletePerson,
        addExpense,
        updateExpense,
        deleteExpense,
        settleUp
    };
}
