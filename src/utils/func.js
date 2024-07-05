const setCookieCity = (city) => {
  document.cookie = `city=${city}; pathg=/`;
};
const getCookieCity = () => {
  let cookie = document.cookie.split("; ");
  let result = null;
  cookie.forEach((item) => {
    if (item.indexOf("city=") == 0) {
        result=item.substring(5)
    }
});
    return result
};

export { setCookieCity, getCookieCity };
