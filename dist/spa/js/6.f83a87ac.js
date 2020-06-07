(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{af1b:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart"},[a("div",{staticStyle:{width:"cacl(90% - 100px)",height:"500px"},attrs:{id:"chart-cuc-cu"}}),a("div",{staticStyle:{width:"cacl(90% - 100px)",height:"500px"},attrs:{id:"chart-cuc-rec"}}),a("q-select",{staticStyle:{"max-width":"200px",margin:"6px"},attrs:{label:"Standard",filled:"",options:t.columns},model:{value:t.chart,callback:function(e){t.chart=e},expression:"chart"}}),a("div",{staticStyle:{width:"cacl(90% - 100px)",height:"500px"},attrs:{id:"chart"}})],1)},c=[],n=(a("6b54"),a("06db"),a("28a5"),a("20d6"),a("c5f6"),a("7f7f"),a("3eba")),r=a.n(n),l=(a("ef97"),a("627c"),a("007d"),a("95a8"),{data:function(){return{name:"App",components:{},chart:"fec_fe",indices:{date:{name:"日期",alias:"日期",decimal:0,width:88,writable:!0},shift:{name:"班次",alias:"班次",decimal:0,width:70,writable:!0},duration:{name:"时长",alias:"时长",decimal:2,width:70,writable:!0,target:0,unit:"h"},oph:{name:"台时量",alias:"台时量",decimal:2,width:70,writable:!1,target:187.5,unit:"t/h"},raw_mc:{name:"原矿水份",alias:"水份",decimal:1,width:50,writable:!0,target:0,unit:"%"},raw_qty_wet:{name:"原矿湿矿量",alias:"湿量",decimal:0,width:70,writable:!0,target:0,unit:"t"},raw_qty:{name:"原矿产量",alias:"处理量",decimal:2,width:80,writable:!1,target:0,unit:"t"},raw_cu:{name:"原矿铜品位",alias:"原矿含铜",decimal:3,width:70,writable:!0,target:0,unit:"%"},raw_fe:{name:"原矿铁品位",alias:"原矿含铁",decimal:2,width:70,writable:!0,target:0,unit:"%"},raw_qty_metal_cu:{name:"原矿铜金属量",alias:"原矿铜含量",decimal:2,width:70,writable:!1,target:0,unit:"t",hide:!0},cuc_qty:{name:"铜精矿产量",alias:"铜精数量",decimal:2,width:70,writable:!1,target:0,unit:"t"},cuc_qty_metal:{name:"铜精矿金属量",alias:"铜精含量",decimal:2,width:70,writable:!1,target:0,unit:"t"},cuc_cu:{name:"铜精矿品位",alias:"铜精品位",decimal:2,width:70,writable:!0,target:20,unit:"%"},cuc_rec:{name:"铜精矿回收率",alias:"铜回收率",decimal:2,width:70,writable:!1,target:92.5,unit:"%"},cuc_fe:{name:"铜精矿铁品位",alias:"铜精含铁",decimal:2,width:70,writable:!0,target:0,unit:"%"},cuc_deh_cu:{name:"铜精矿脱水品位",alias:"铜过滤品位",decimal:2,width:70,writable:!0,target:20,unit:"%"},cuc_deh_mc:{name:"铜精矿脱水水份",alias:"铜过滤水份",decimal:1,width:60,writable:!0,target:12,unit:"%"},cut_cu:{name:"铜尾矿品位",alias:"铜尾品位",decimal:3,width:70,writable:!0,target:.059,unit:"%"},cut_fe:{name:"铜尾矿铁品位",alias:"铁原品位",decimal:2,width:70,writable:!1,target:0,unit:"%",hide:!0},fec_qty:{name:"铁精矿产量",alias:"铁精数量",decimal:2,width:70,writable:!1,target:0,unit:"t"},fec_qty_metal:{name:"铁精矿金属量",alias:"铁精含量",decimal:2,width:70,writable:!1,target:0,unit:"t"},fec_fe:{name:"铁精矿品位",alias:"铁精品位",decimal:2,width:70,writable:!0,target:64,unit:"%"},fec_rec:{name:"铁精矿回收率",alias:"铁回收率",decimal:2,width:70,writable:!1,target:0,unit:"%"},fec_deh_fe:{name:"铁精矿脱水品位",alias:"铁过滤品位",decimal:2,width:70,writable:!0,target:0,unit:"%"},fec_deh_mc:{name:"铁精矿脱水水份",alias:"铁过滤水份",decimal:1,width:60,writable:!0,target:0,unit:"%"},fet_fe:{name:"铁尾矿品位",alias:"铁尾品位",decimal:2,width:70,writable:!0,target:0,unit:"%"},fet_mfe:{name:"铁尾矿磁性铁品位",alias:"磁性铁",decimal:3,width:70,writable:!0,target:.7,unit:"%"},fet_nfe:{name:"铁尾矿非磁性铁品位",alias:"非磁性铁",decimal:2,width:70,writable:!0,unit:"%"},fet_cu:{name:"铁尾矿铜品位",alias:"铁尾含铜",decimal:3,width:70,writable:!0,target:0,unit:"%"}},json:[],columns:[],total:{}}},created:function(){for(var t in this.indices)this.columns.push({name:t,label:this.indices[t].name,field:t,align:"left",sortable:!0,decimal:this.indices[t].decimal,format:function(t){var e=Number(t).toFixed(this.decimal),a=String(t).indexOf(".")+1,i=String(t).length-a;return isNaN(e)||0==e?t:i>=0?Number(t).toFixed(this.decimal):void 0}})},mounted:function(){var t=this;console.time("fetch"),fetch("https://test.hopuc.com/indices/api/api.php").then((function(t){return t.json()})).then((function(e){e.success&&(t.json=e.data,t.totalData("json"),t.echarts()),console.timeEnd("fetch")})),console.log(r.a)},methods:{echarts:function(){var t=this,e=r.a.init(document.getElementById("chart-cuc-cu"));e.setOption({title:{text:"铜精矿品位"},tooltip:{},xAxis:{data:this.json.map((function(t){if("总计"!==t.date)return t.date+t.shift}))},yAxis:{scale:!0},series:[{name:"品位",type:"line",color:["#e93"],data:this.json.map((function(t){if("总计"!==t.date)return t.cuc_cu})),markLine:{symbol:"none",label:{position:"end",formatter:"{b}:{c}"},data:[{silent:!0,lineStyle:{type:"solid",color:"#39e"},name:"目标值",yAxis:20},{silent:!0,lineStyle:{type:"solid",color:"#c33"},name:"完成值",yAxis:this.total.cuc_cu}]}}]});var a=r.a.init(document.getElementById("chart-cuc-rec"));a.setOption({title:{text:"铜精矿回收率"},tooltip:{},xAxis:{data:this.json.map((function(t){if("总计"!==t.date)return t.date+t.shift}))},yAxis:{scale:!0},series:[{name:"回收率",type:"line",color:["#e93"],data:this.json.map((function(t){if("总计"!==t.date)return t.cuc_rec.toFixed(2)})),markLine:{symbol:"none",label:{position:"end",formatter:"{b}:{c}"},data:[{silent:!0,lineStyle:{type:"solid",color:"#39e"},name:"目标值",yAxis:92.5},{silent:!0,lineStyle:{type:"solid",color:"#c33"},name:"完成值",yAxis:this.total.cuc_rec}]}}]});var i=r.a.init(document.getElementById("chart"));i.setOption({title:{},tooltip:{},xAxis:{data:this.json.map((function(t){if("总计"!==t.date)return t.date+t.shift}))},yAxis:{scale:!0},series:[{name:this.indices[this.chart].name,type:"line",color:["#e93"],data:this.json.map((function(e){if("总计"!==e.date&&e[t.chart])return Number(e[t.chart]).toFixed(t.indices[t.chart].decimal)})),markLine:{symbol:"none",label:{position:"end",formatter:"{b}:{c}"},data:[{silent:!0,lineStyle:{type:"solid",color:"#39e"},name:"目标值",yAxis:this.indices[this.chart].target},{silent:!0,lineStyle:{type:"solid",color:"#c33"},name:"完成值",yAxis:Number(this.total[this.chart]).toFixed(this.indices[this.chart].decimal)?Number(this.total[this.chart]).toFixed(this.indices[this.chart].decimal):""}]}}]})},totalData:function(t){console.time("totalData");var e,a=this.json.findIndex((function(t){return"总计"==t.date}));a>0&&this.json.splice(a,1),"select"==t?e=this.selected:"json"==t&&(e=this.json);var i=e.reduce((function(t,e){if(null!=e.duration)return t+(Number(e.duration.toString().split(":")[0])+Number(e.duration.toString().split(":")[1]/60))}),0),c=e.reduce((function(t,e){return t+e.raw_qty}),0),n=e.reduce((function(t,e){return t+Number(e.raw_qty_wet)}),0),r=100*(1-c/n),l=c/i,u=e.reduce((function(t,e){return t+e.raw_qty_metal_cu}),0),d=100*u/c,s=e.reduce((function(t,e){return t+e.raw_qty_metal_fe}),0),o=100*s/c,m=e.reduce((function(t,e){return t+e.cuc_qty}),0),f=e.reduce((function(t,e){return t+e.cuc_qty_metal}),0),h=e.reduce((function(t,e){return t+e.cuc_fe/100*e.cuc_qty}),0),_=100*f/m,w=100*h/m,y=e.reduce((function(t,e){return t+e.cut_qty}),0),b=e.reduce((function(t,e){return t+e.cut_qty_metal}),0),p=e.reduce((function(t,e){return t+e.cut_qty_metal_fe}),0),g=100*b/y,q=100*p/y,x=100*f/u,j=e.reduce((function(t,e){return t+e.fec_qty}),0),v=e.reduce((function(t,e){return t+e.fec_qty_metal}),0),S=100*v/j,A=e.reduce((function(t,e){return t+(e.cut_qty*e.cut_fe/100-e.fec_qty_metal)/(e.fet_fe/100)}),0),N=e.reduce((function(t,e){return t+(e.fet_mfe?(e.cut_qty*e.cut_fe/100-e.fec_qty_metal)/(e.fet_fe/100):0)}),0),k=e.reduce((function(t,e){return t+(e.cut_qty*e.cut_fe/100-e.fec_qty_metal)}),0),E=e.reduce((function(t,e){return t+e.fet_cu/100*(e.cut_qty*e.cut_fe/100-e.fec_qty_metal)/(e.fet_fe/100)}),0),F=e.reduce((function(t,e){return t+e.fet_mfe/100*(e.cut_qty*e.cut_fe/100-e.fec_qty_metal)/(e.fet_fe/100)}),0),O=e.reduce((function(t,e){return t+e.fet_nfe/100*(e.cut_qty*e.cut_fe/100-e.fec_qty_metal)/(e.fet_fe/100)}),0),D=100*k/A,I=100*E/A,B=100*F/N,L=100*O/N,J=100*v/p,C="总计";this.total={id:"total",date:C,duration:i,oph:l,raw_cu:d,raw_fe:o,raw_mc:r,raw_qty_wet:n,raw_qty:c,raw_qty_metal_cu:u,cuc_cu:_,cuc_rec:x,cuc_qty:m,cuc_qty_metal:f,cuc_fe:w,cut_cu:g,cut_fe:q,fec_fe:S,fec_rec:J,fec_qty:j,fec_qty_metal:v,fet_fe:D,fet_cu:I,fet_mfe:B,fet_nfe:L},this.json.push(this.total),console.timeEnd("totalData")}}}),u=l,d=a("2877"),s=a("ddd8"),o=a("eebe"),m=a.n(o),f=Object(d["a"])(u,i,c,!1,null,null,null);e["default"]=f.exports;m()(f,"components",{QSelect:s["a"]})}}]);