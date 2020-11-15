import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from './layouts/Admin';
import RTLLayout from "./layouts/RTL";
import AuthLayout from "./layouts/Auth.js";
import { useSelect } from './helper';
import Login from './views/pages/examples/Login';
function App() {
    const { is_logging , token} = useSelect(state => state.authReducer);


    return (
        <div className="App">
            {is_logging ? (
                <>
                <>
                    <BrowserRouter>
                        <Switch>
                        <Route path="/" render={(props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<AdminLayout> & Readonly<any> & Readonly<{ children?: React.ReactNode; }>) => <AdminLayout {...props} />} />
                        <Route path="/rtl" render={(props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<RTLLayout> & Readonly<any> & Readonly<{ children?: React.ReactNode; }>) => <RTLLayout {...props} />} />
                        <Route path="/auth" render={(props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<AuthLayout> & Readonly<any> & Readonly<{ children?: React.ReactNode; }>) => <AuthLayout {...props} />} />
                        {/* <Route path="/" render={props => <IndexView {...props} />} /> */}
                        <Redirect from="*" to="/" />
                        </Switch>
                    </BrowserRouter>
		</>
                </>
                ) : (
                    <Login />
            )}

        </div>
    );
}

export default App;