import { createContext, useContext, useReducer, useMemo } from 'react';

// Define initialState outside of the component
const initialState = { alerts: [] };

const AlertContext = createContext();

function reducer(state, newAlert) {
  let currentAlerts = state.alerts;

  if (newAlert.action === 'close') {
    return { alerts: currentAlerts ? currentAlerts : [] };
  }

  if (newAlert?.action === 'remove') {
    currentAlerts = currentAlerts.filter(a => a.id !== newAlert.id);
    return { alerts: currentAlerts ? currentAlerts : [] };
  } else if (newAlert.action === 'push') {
    let duplicateIndex = currentAlerts.findIndex(a => a.for === newAlert.alert.for);
    if (duplicateIndex >= 0) {
      currentAlerts[duplicateIndex].id = newAlert.alert.id;
      return { alerts: currentAlerts ? currentAlerts : [] };
    } else {
      currentAlerts.push(newAlert.alert);
      return { alerts: currentAlerts ? currentAlerts : [] };
    }
  }
}

export function AlertWrapper({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize the dispatch function
  const changeAlertState = useMemo(() => dispatch, []);

  function closeAlert(id) {
    dispatch({ type: 'REMOVE_ALERT', payload: id });
  }

  return (
    <AlertContext.Provider value={{ alerts: state.alerts, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function UseAlertContext() {
  return useContext(AlertContext);
}
