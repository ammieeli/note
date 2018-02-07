ReactDOM.render(
    第一个参数：组件，
    第二个参数：挂载点，
    第三个参数：回调函数，挂载完成
）

用之前要在js文档里引入插件
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
     <div>
           你好
     </div>,
     document.getElementById('root'),
     function(){
           console.log('完成')
     }
);

在js里写css
box.style.cssText='width:100px;height:100px;background: red;'

文件关联，用什么引用什么
import {xx,a as b} from './es6_import/import2';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


