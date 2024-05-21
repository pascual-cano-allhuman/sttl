"use client";

import { NotLoggedInTemplate } from "templates/notLoggedIn";
import { useAppContext } from "./AppContext";

const Home = () => {
	const { auth } = useAppContext();
	if (!auth || auth.isLoggedIn) return null;
	return <NotLoggedInTemplate onSignUpClick={auth?.signUp} onSignInClick={auth?.login} />;
};

export default Home;
