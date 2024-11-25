import { createContext, useReducer, useEffect } from 'react'
import appReducer from './AppReducer'

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions))
  }, [state.transactions])

  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    })
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
