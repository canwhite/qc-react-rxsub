//用现在新的写法
import {of,from} from "rxjs";
import { map } from "rxjs/operators";
import { state } from "rxsub";
//这是一个类，里边用到了Subject
const count$ = state({
    name: "count",//当作key
    defaultValue: 0,//数据初始化
    producer(next,value,action){
        let num = value;
        console.log(num);
        switch(action.type){
            case "add":
                num ++ ;
                //next传值，不要在里边做计算
                next(num)
                break;
            case "sub":
                num--;
                next(num)
                break;
        }
    }
});


const async_res$ = state({ 
    name:"async_res",
    //实际上可以根据返回数据结构置初值 initial
    initial: from(new Promise(resolve=>{})),
    producer(next,value,action){
        let params = action.params;
        let cb = action.cb;
        switch (action.type){
            case "async":
                next(
                    from(cb(params))
                )
                break;
        }
    }
}) 
//当然也可以根据pipe的状态衍生
export {
    count$,
    async_res$,
}