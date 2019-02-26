export const getSafe = (fn, defaultVal) => {
	try {
		return fn();
	} catch (e) {
		return defaultVal;
	}
};
