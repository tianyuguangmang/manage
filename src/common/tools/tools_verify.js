/**
 * @file: tools_verify.
 * @intro: 常用验证工具类.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/9 13:45.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

export default new class Verify {
  constructor() {
  }

  //验证url是否正确，true/false
  isUrl(url) {
    return (/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/i).test(url)
  }

  //验证手机号码是否正确， true/false
  isTel(tel) {
    return (/^1[3|4|5|8][0-9]\d{4,8}$/).test(tel)
  }

  //判断是否是object对象
  isObject(value) {
    return !!value && Object.prototype.toString.call(value) === '[object Object]';
  }

  //判断是否是数组
  isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
  //判断是否是正整数，小数点后两位
  isPrice(value) {
    return /^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value);
  }
  objectEquals(object1, object2) {
      //For the first loop, we only check for types
      for (let propName in object1) {
          //Check for inherited methods and properties - like .equals itself
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
          //Return false if the return value is different
          if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
              return false;
          }
          //Check instance type
          else if (typeof object1[propName] != typeof object2[propName]) {
              //Different types => not equal
              return false;
          }
      }
      //Now a deeper check using other objects property names
      for( let propName in object2) {
          //We must check instances anyway, there may be a property that only exists in object2
              //I wonder, if remembering the checked values from the first loop would be faster or not 
          if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
              return false;
          }
          else if (typeof object1[propName] != typeof object2[propName]) {
              return false;
          }
          //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
          if(!object1.hasOwnProperty(propName)) {
            continue;
          }

          //Now the detail check and recursion

          //This returns the script back to the array comparing
          /**REQUIRES Array.equals**/
          if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
                    // recurse into the nested arrays
            if (!object1[propName].equals(object2[propName])){
              return false;
            }
          }
          else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
                    // recurse into another objects
                    //console.log("Recursing to compare ", object1[propName],"with",object2[propName], " both named \""+propName+"\"");
            if (!object1[propName].equals(object2[propName])) {
              return false;
            }
          }
          //Normal value comparison for strings and numbers
          else if(object1[propName] != object2[propName]) {
            return false;
          }
      }
      //If everything passed, let's say YES
      return true;
  }
  // 只比较 object1里的存在的key的value, object1里的key在object2里必存
  compareObject(object1, object2){
    for (let propName in object1) {
      if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
          return false;
      }
      else if (typeof object1[propName] != typeof object2[propName]) {
          return false;
      }
      if (object1[propName]!= object2[propName]){
        return false;
      }
    }
    return true;
  }
}
