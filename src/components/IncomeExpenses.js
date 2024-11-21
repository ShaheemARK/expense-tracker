import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext)
  const amounts = transactions.map((transaction) => transaction.amount)

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((sum, item) => (sum += item), 0)
    .toFixed(2)
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((sum, item) => (sum += Math.abs(item)), 0)
    .toFixed(2)

  return (
    <div className="inc-exp-container">
      <div>
        <h4>INCOME</h4>
        <p className="money plus">${income}</p>
      </div>
      <div>
        <h4>EXPENSE</h4>
        <p className="money minus">${expense}</p>
      </div>
    </div>
  )
}