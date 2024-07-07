const setCookieCity = (city,id) => {
  document.cookie = `city=${JSON.stringify([{city,id}])}; pathg=/`;
};
const getCookieCity = () => {
  let cookie = document.cookie.split("; ");
  let result = null;
  cookie.forEach((item) => {
    if (item.indexOf("city=") == 0) {
        result=JSON.parse(item.substring(5))
    }
});
    return result
};

export { setCookieCity, getCookieCity };
