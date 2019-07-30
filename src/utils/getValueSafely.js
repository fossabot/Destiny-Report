export default (fn, defaultVal) => {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
};
