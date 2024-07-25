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
    const resultFilterSearch = product?.posts?.filter((item) =>
      item.title.includes(search)
    );
    return resultFilterSearch;
  } else {
    return product?.posts;
  }
};

const filterCategory = (product, category) => {
  if (category) {
    return getPostPoblished({ categoryId: category?.categoryID }).then(
      (res) => res
    );
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

const filteringByPrice = (data,filterData,priceLess,priceMore) => {
  if (priceLess == "default") {
    if (priceMore == "default") {
      return data
    }else{
      let result=filterData?.filter(item=>item.price <= priceMore)
      return result
    }
  }else{
    if(priceMore == 'default'){
      let result=filterData?.filter(item=>item.price >= priceLess)
      return result
    }else{
      let result=filterData?.filter(item=>item.price >= priceLess && item.price <= priceMore)
      return result
    }
  }
};
export {
  setCookieCity,
  getCookieCity,
  relaitiveTimePost,
  filterInputSearch,
  filterQuryParams, 
  filterCategory,
  filteringByPrice,
};
