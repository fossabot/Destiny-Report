export default json => {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (e) {
    return undefined;
  }
};
