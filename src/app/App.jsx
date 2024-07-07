import React from "react";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from "./store";
import AuthRoutes from "../processes/auth/AuthRoutes";
import Logo from "../shared/ui/Logo";
import styles from '../shared/styles/common.module.css';


function App() {
  return (
    <Provider store={store}>
        <div className={styles.App}>
            <header className={styles.header}>
                <Logo className={styles.logo} />
            </header>
            <main>
                <AuthRoutes />
            </main>
        </div>
    </Provider>
  );
}

export default App;
