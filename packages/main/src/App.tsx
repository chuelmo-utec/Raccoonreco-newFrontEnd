import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "./components/preloader";
import { PrivateRoute } from "./PrivateRoute";

// Classic Pages
const SignIn = lazy(() => import("./pages/signin"));

const ErrorNotFound = lazy(() => import("./pages/error-404"));
const Error500 = lazy(() => import("./pages/error-500"));
const Error503 = lazy(() => import("./pages/error-503"));
const Error505 = lazy(() => import("./pages/error-505"));

// Classic Plus Pages

const Home = lazy(() => import("./pages/classic-plus/Home"));

const Partners = lazy(() => import("./pages/classic-plus/Partners"));
const CreatePartner = lazy(() => import("./pages/classic-plus/CreatePartner"));

const Users = lazy(() => import("./pages/classic-plus/Users"));
const CreateUser = lazy(() => import("./pages/classic-plus/CreateUser"));

const ClassicPlusProfileView = lazy(
    () => import("./pages/classic-plus/profile-view")
);

const App = () => {
    return (
        <>
            <Router>
                <Suspense fallback={<Preloader />}>
                    <Routes>
                        {/* Classic Routes */}

                        {/* Dashboard Routes */}
                        <Route path="/" element={<SignIn />} />
                        <Route
                            path="/home"
                            element={
                                <PrivateRoute
                                    component={Home}
                                    roles={["Admin"]}
                                />
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <PrivateRoute
                                    component={Users}
                                    roles={["Admin"]}
                                />
                            }
                        />
                        <Route
                            path="/partners"
                            element={
                                <PrivateRoute
                                    component={Partners}
                                    roles={["Admin"]}
                                />
                            }
                        />
                        <Route
                            path="/partners/create"
                            element={
                                <PrivateRoute
                                    component={CreatePartner}
                                    roles={["Admin"]}
                                />
                            }
                        />
                        <Route
                            path="/users/create"
                            element={
                                <PrivateRoute
                                    component={CreateUser}
                                    roles={["Admin"]}
                                />
                            }
                        />

                        {/* Authentication Routes */}
                        <Route path="/signin" element={<SignIn />} />

                        {/* Error Routes */}
                        <Route path="/error-500" element={<Error500 />} />
                        <Route path="/error-503" element={<Error503 />} />
                        <Route path="/error-505" element={<Error505 />} />

                        {/* Classic Plus Routes */}

                        {/* Error Routes */}

                        {/* User Routes */}
                        <Route
                            path="/classic-plus/profile-view"
                            element={<ClassicPlusProfileView />}
                        />

                        {/* 404 Page Route */}
                        <Route path="*" element={<ErrorNotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
};

export default App;
