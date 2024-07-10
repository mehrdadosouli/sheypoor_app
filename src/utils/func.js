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

const relaitiveTimePost=(postedTime)=>{
  const currentTime=new Date()
  const createdTime=new Date(postedTime)
  const timeDeference=currentTime - createdTime
  const hourse=Math.floor(timeDeference / (60 * 60 * 1000))
  let txt=''
  if(hourse < 24){
    return txt=`${hourse} ساعت پیش`
  }else{
    return txt=`${hourse} روز پیش`
  }
}


export { setCookieCity, getCookieCity, relaitiveTimePost };
