export default req => {
  if (req) {
    return `${req.headers["x-forwarded-proto"]}://${
      req.headers["x-forwarded-host"]
    }`;
  } else {
    return window.location.origin;
  }
};
