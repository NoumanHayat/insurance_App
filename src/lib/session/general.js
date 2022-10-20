import moment from 'moment';

export const createInterval = (callback, interval) => {
    const subscription = setInterval(callback, interval);
    return subscription;
}

export const getTimeElapsedSince = (startingPoint) => {
    return moment(new Date()) - moment(startingPoint);
}

export const createAuthExpirationTimeout = (callback, expiresIn) => {
    const expireAuthTimer = setTimeout(callback, expiresIn);
    return expireAuthTimer;
}

export const getTimeLeftUntil = (finishPoint) => {
    return moment(finishPoint) - moment(new Date());
}

	/** These are the screens at no risk of having the authentication expire */
export	const evergreenScreens = [
		"FirstLaunch",
		"Features",
		"SignIn",
		"VerificationOptions",
		"SplashSecondary"
	]