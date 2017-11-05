### 　forEach
forEach是ES5中操作数组的一种方法，主要功能是遍历数组。

forEach方法中的function回调有三个参数：第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身。

    var arr = [1,2,3,4];
    var sum=0;
    arr.forEach(function(value,index,array){
        array[index] == value;    //结果为true
        sum+=value;  
        });
    console.log(sum);   