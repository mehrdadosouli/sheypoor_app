import { getPostPoblished } from "../services/getPostPublished";

const setCookieCity = (city, id) => {
  document.cookie = `city=${JSON.stringify([{ city, id }])}; pathg=/`;
};

const getCookieCity = () => {
  let cookie = document.cookie.split("; ");
  let result = null;
  cookie.forEach((item) => {
    if (item.indexOf("city=") == 0) {
      result = JSON.parse(item.substring(5));
    }
  });
  return result;
};

const relaitiveTimePost = (postedTime) => {
  const currentTime = new Date();
  const createdTime = new Date(postedTime);
  const timeDeference = currentTime - createdTime;
  const hourse = Math.floor(timeDeference / (60 * 60 * 1000));
  let txt = "";
  if (hourse < 24) {
    return (txt = `${hourse} ساعت پیش`);
  } else {
    return (txt = `${hourse} روز پیش`);
  }
};

const filterInputSearch = (product, search) => {
  if (search) {
    const resultFilterSearch = product?.filter((item) =>
      item.title.includes(search)
    );
    return resultFilterSearch;
  } else {
    return product;
  }
};

const filterQuryParams = (currentQuery, newQuery) => {
  if (newQuery.search == "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.category == "همه") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  return {
    ...currentQuery,
    ...newQuery,
  };
};

const filteringByPrice = (data, priceLess, priceMore) => {
  if (priceLess == "default") {
    if (priceMore == "default") {
      return data;
    } else {
      let result = data?.filter((item) => item.price <= priceMore);
      return result;
    }
  } else {
    if (priceMore == "default") {
      let result = data?.filter((item) => item.price >= priceLess);
      return result;
    } else {
      let result = data?.filter(
        (item) => item.price >= priceLess && item.price <= priceMore
      );
      return result;
    }
  }
};

const filterSideBar = (filterState, allProducts) => {
  let resultModelFilter = allProducts.filter((i) =>
    i.dynamicFields.some((item) => {
      if (item.slug == "model" && filterState.model != "پیش فرض") {
        return item.data <= filterState.model;
      }
      if (item.slug == "model" && filterState.model == "پیش فرض") {
        return allProducts;
      }
    })
  );

  if (filterState.operation) {
    resultModelFilter = resultModelFilter.filter((i) =>
      i.dynamicFields.some((item) => {
        if (item.slug == "operation" && filterState.operation != "پیش فرض") {
          return item.data == filterState.operation;
        }
        if (item.slug == "operation" && filterState.operation == "پیش فرض") {
          return resultModelFilter;
        }
      })
    );
  }
  return resultModelFilter
};
export {
  setCookieCity,
  getCookieCity,
  relaitiveTimePost,
  filterInputSearch,
  filterQuryParams,
  filteringByPrice,
  filterSideBar,
};
