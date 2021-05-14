
import React from "react";
//subscription这个是订阅，dispatch主要是为了走subject的next
//需要在哪个组件中使用，就在哪个组件中订阅
import { subscription, dispatch } from "rxsub"
import { count$,async_res$ } from "./store";

//sunscription接受observable返回一个HOC，这个HOC接受一个组件并返回
const Cou = subscription({
    count: count$//主要是value，key可以随意命名
  })((props) =>{
    return (
      <span>{props.count}</span>
    );
})

const AsyncData  = subscription({
    async:async_res$
})((props)=>{
    // 这里用可选链
    return (
        <span>{props.async?.data || "loading"}</span>
    );
})

function App() {
    //异步请求
    const getRequestData = (params)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve({data:"content"})
            }, 3000);
        })
    }

    function add(){
        dispatch("count",{
            type:"add"
        })
    }
    function sub(){
        dispatch("count", {
            type: "sub",
        });
    }
    function asyncPush(){
        dispatch("async_res",{
            type:"async",
            params:{a:"123"},
            cb:getRequestData//传进去一个函数变量在里边调用
        })
    }
    return (
        <div className="App">
            <div><Cou /></div>
            <button onClick={()=>add()}>+</button>
            <button onClick={()=>sub()}>-</button>

            <div><button onClick={()=>asyncPush()}> async test</button> </div>
            <div> 
                <AsyncData />
            </div>
        </div>
    );
}
export default App;
