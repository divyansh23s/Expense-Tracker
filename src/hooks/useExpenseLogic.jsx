import { useState } from "react";
import { calculateBalances } from "../utils/calculation";


export const useExpenseLogic = () => {
    const [ people, setPeople ] = useState([]);
    const [ expenses, setExpenses ] = useState([]);

    const addPerson = (person) => {
        setPeople([...people, person]);
    };

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
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
        addExpense,
        settleUp
    };
}
