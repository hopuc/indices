<template>
  <div class="chart">

    <div id="chart-cuc-cu" style="width:90%;height:500px;"></div>
    <div id="chart-cuc-rec" style="width:90%;height:500px;"></div>

    <q-select
      v-model="chart"
      label="Standard"
      filled
      :options="columns"
      style="max-width: 200px;margin: 6px;"
    />

    <div id="chart" style="width:90%;height:500px;"></div>
  </div>
</template>

<script>
  // import echarts from 'echarts'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/markline.js'
  export default {
    data(){
      return{
        name: 'App',
        components: {
        	// HelloWorld
        },
        chart: 'fec_fe',
        indices: {
        	date: {
        		name: '日期',
        		alias: '日期',
        		decimal: 0,
        		width: 88,
        		writable: true,
        	},
        	shift: {
        		name: '班次',
        		alias: '班次',
        		decimal: 0,
        		width: 70,
        		writable: true,
        	},
        	duration: {
        		name: '时长',
        		alias: '时长',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: 'h',
        	},
        	oph: {
        		name: '台时量',
        		alias: '台时量',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 187.5,
        		unit: 't/h',
        	},
        	raw_mc: {
        		name: '原矿水份',
        		alias: '水份',
        		decimal: 1,
        		width: 50,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	raw_qty_wet: {
        		name: '原矿湿矿量',
        		alias: '湿量',
        		decimal: 0,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: 't',
        	},
        	raw_qty: {
        		name: '原矿产量',
        		alias: '处理量',
        		decimal: 2,
        		width: 80,
        		writable: false,
        		target: 0,
        		unit: 't',
        	},
        	raw_cu: {
        		name: '原矿铜品位',
        		alias: '原矿含铜',
        		decimal: 3,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	raw_fe: {
        		name: '原矿铁品位',
        		alias: '原矿含铁',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	raw_qty_metal_cu: {
        		name: '原矿铜金属量',
        		alias: '原矿铜含量',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: 't',
        		hide: true,
        	},
        	cuc_qty: {
        		name: '铜精矿产量',
        		alias: '铜精数量',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: 't',
        	},
        	cuc_qty_metal: {
        		name: '铜精矿金属量',
        		alias: '铜精含量',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: 't',
        	},
        	cuc_cu: {
        		name: '铜精矿品位',
        		alias: '铜精品位',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 20,
        		unit: '%',
        	},
        	cuc_rec: {
        		name: '铜精矿回收率',
        		alias: '铜回收率',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 92.5,
        		unit: '%',
        	},
        	cuc_fe: {
        		name: '铜精矿铁品位',
        		alias: '铜精含铁',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	cuc_deh_cu: {
        		name: '铜精矿脱水品位',
        		alias: '铜过滤品位',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 20,
        		unit: '%',
        	},
        	cuc_deh_mc: {
        		name: '铜精矿脱水水份',
        		alias: '铜过滤水份',
        		decimal: 1,
        		width: 60,
        		writable: true,
        		target: 12,
        		unit: '%',
        	},
        	cut_cu: {
        		name: '铜尾矿品位',
        		alias: '铜尾品位',
        		decimal: 3,
        		width: 70,
        		writable: true,
        		target: 0.059,
        		unit: '%',
        	},
        	cut_fe: {
        		name: '铜尾矿铁品位',
        		alias: '铁原品位',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: '%',
        		hide: true,
        	},
        	fec_qty: {
        		name: '铁精矿产量',
        		alias: '铁精数量',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: 't',
        	},
        	fec_qty_metal: {
        		name: '铁精矿金属量',
        		alias: '铁精含量',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: 't',
        	},
        	fec_fe: {
        		name: '铁精矿品位',
        		alias: '铁精品位',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 64,
        		unit: '%',
        	},
        	fec_rec: {
        		name: '铁精矿回收率',
        		alias: '铁回收率',
        		decimal: 2,
        		width: 70,
        		writable: false,
        		target: 0,
        		unit: '%',
        	},
        	fec_deh_fe: {
        		name: '铁精矿脱水品位',
        		alias: '铁过滤品位',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	fec_deh_mc: {
        		name: '铁精矿脱水水份',
        		alias: '铁过滤水份',
        		decimal: 1,
        		width: 60,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	fet_fe: {
        		name: '铁尾矿品位',
        		alias: '铁尾品位',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        	fet_mfe: {
        		name: '铁尾矿磁性铁品位',
        		alias: '磁性铁',
        		decimal: 3,
        		width: 70,
        		writable: true,
        		target: 0.7,
        		unit: '%',
        	},
        	fet_nfe: {
        		name: '铁尾矿非磁性铁品位',
        		alias: '非磁性铁',
        		decimal: 2,
        		width: 70,
        		writable: true,
        		unit: '%',
        	},
        	fet_cu: {
        		name: '铁尾矿铜品位',
        		alias: '铁尾含铜',
        		decimal: 3,
        		width: 70,
        		writable: true,
        		target: 0,
        		unit: '%',
        	},
        },
        json: [],
        columns:[],
        total: {},
      }
    },

    created:function(){

     for(var i in this.indices){
       // console.log(i)
       this.columns.push({
         name: i,
         label: this.indices[i].name,
         field: i,
         align: 'left',
         // required: true,
         sortable: true,
         decimal: this.indices[i].decimal,
         format: function(value) {
           let num = Number(value).toFixed(this.decimal);
           var x = String(value).indexOf('.') + 1; //小数点的位置
           var y = String(value).length - x; //小数的位数
           if(isNaN(num) || num == 0){
             return value;
           }else if(y >= 0){
             return Number(value).toFixed(this.decimal);
           }
         },
       })
     }

    },
    mounted:function(){

      console.time('fetch')
      fetch('https://test.hopuc.com/indices/api/api.php')
      .then(rec => rec.json())
      .then(rec => {
      	if(rec.success){
      		// console.log(rec.data)
      		this.json =  rec.data
      		/* this.json.forEach((v,i) =>{
      			this.calculateData(i)
      		}) */
          this.totalData('json')
          this.echarts()
      	}else{
      		// this.notice('获取失败','云端数据获取失败')
      	}
      	console.timeEnd('fetch')
      })
      console.log(echarts)

    },
    methods:{
      echarts:function(){
      	let cuc_cu = echarts.init(document.getElementById('chart-cuc-cu'))
      	cuc_cu.setOption({
      		title: { text: '铜精矿品位' },
      		tooltip: {},
      		xAxis: {
      			data: this.json.map(v => {
      				if(v.date!=='总计'){
      					return v.date + v.shift
      				}
      			})
      		},
      		yAxis: {
      			scale:true,
      		},
      		series: [{
      			name: '品位',
      			type: 'line',
      			color: ['#e93'],
      			data: this.json.map(v => {
      				if(v.date!=='总计'){
      					return v.cuc_cu
      				}
      			}),
      			markLine : {
      				symbol:"none",//去掉警戒线最后面的箭头
      				label:{
      					position:"end", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始	中点 结束
      					formatter: "{b}:{c}"
      				},
      				data : [{
      					silent: true, //鼠标悬停事件	true没有，false有
      					lineStyle:{ //警戒线的样式，虚实	颜色
      						type:"solid",
      						color:"#39e"
      					},
      					name: '目标值',
      					yAxis: 20
      				},{
      					silent: true, //鼠标悬停事件	true没有，false有
      					lineStyle:{ //警戒线的样式，虚实	颜色
      						type:"solid",
      						color:"#c33"
      					},
      					name: '完成值',
      					yAxis: this.total.cuc_cu
      				}]
      			},
      		}],
      	});

      	let cuc_rec = echarts.init(document.getElementById('chart-cuc-rec'))
      	cuc_rec.setOption({
      		title: { text: '铜精矿回收率' },
      		tooltip: {},
      		xAxis: {
      			data: this.json.map(v => {
      				if(v.date!=='总计'){
      					return v.date + v.shift
      				}
      			}),
      			/* axisLine: {
      				lineStyle: {
      					color: '#e93', // X轴及其文字颜色
      				}
      			} */
      		},
      		yAxis: {
      			scale:true,
      		},
      		series: [{
      			name: '回收率',
      			type: 'line',
      			color: ['#e93'],
      			data: this.json.map(v => {
      				if(v.date!=='总计'){
      					return v.cuc_rec.toFixed(2)
      				}
      			}),
      			markLine : {
      				symbol:"none",//去掉警戒线最后面的箭头
      				label:{
      					position:"end", //将警示值放在哪个位置，三个值“start”,"middle","end"	开始 中点 结束
      					formatter: "{b}:{c}"
      				},
      				data : [{
      					silent: true, //鼠标悬停事件	true没有，false有
      					lineStyle:{ //警戒线的样式，虚实	颜色
      						type:"solid",
      						color:"#39e"
      					},
      					name: '目标值',
      					yAxis: 92.5
      				},{
      					silent: true, //鼠标悬停事件	true没有，false有
      					lineStyle:{ //警戒线的样式，虚实	颜色
      						type:"solid",
      						color:"#c33"
      					},
      					name: '完成值',
      					yAxis: this.total.cuc_rec
      				}]
      			},
      		}],
      	});

      	let chart = echarts.init(document.getElementById('chart'))
      	chart.setOption({
      		title: {
      			// text: this.indices[this.chart].alias,
      		},
      		tooltip: {},
      		xAxis: {
      			data: this.json.map(v => {
      				if(v.date!=='总计'){
      					return v.date + v.shift
      				}
      			})
      		},
      		yAxis: {
      			scale: true,
      		},
      		series: [{
      			name: this.indices[this.chart].name,
      			type: 'line',
      			color: ['#e93'],
      			data: this.json.map(v => {
      				if(v.date!=='总计'){
      					if(v[this.chart]){
      						return Number(v[this.chart]).toFixed(this.indices[this.chart].decimal)
      					}
      				}
      			}),
      			markLine : {
      				symbol:"none",//去掉警戒线最后面的箭头
      				label:{
      					position:"end", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始	中点 结束
      					formatter: "{b}:{c}"
      				},
      				data : [{
      					silent: true, //鼠标悬停事件	true没有，false有
      					lineStyle:{ //警戒线的样式，虚实	颜色
      						type:"solid",
      						color:"#39e"
      					},
      					name: '目标值',
      					yAxis: this.indices[this.chart].target
      				},{
      					silent: true, //鼠标悬停事件	true没有，false有
      					lineStyle:{ //警戒线的样式，虚实	颜色
      						type:"solid",
      						color:"#c33"
      					},
      					name: '完成值',
      					yAxis: Number(this.total[this.chart]).toFixed(this.indices[this.chart].decimal)?Number(this.total[this.chart]).toFixed(this.indices[this.chart].decimal):''
      				}]
      			},
      		}],
      	});
      },
      totalData: function(e) {
      	console.time('totalData')
        const index = this.json.findIndex(v => v.date == '总计')
        // console.log(index)
        if(index>0){
        	this.json.splice(index, 1)
        }
      	var obj;
      	if(e=='select'){
      		obj = this.selected
      	}else if(e=='json'){
      		obj = this.json
      	}

      	//时长
      	let duration = obj.reduce((total, v) => {
      		// console.log(total , v.raw_qty)
      		if(v.duration!=null){
      			return total + (Number(v.duration.toString().split(':')[0]) + Number(v.duration.toString().split(':')[1]/60))
      		}
      	}, 0)

      	//原矿产量
      	let raw_qty = obj.reduce((total, v) => {
      		// console.log(total , v.raw_qty)
      		return total + v.raw_qty
      	}, 0)

      	//原矿湿量
      	let raw_qty_wet = obj.reduce((total, v) => {
      		// console.log(total , v.raw_qty_wet)
      		return total + Number(v.raw_qty_wet)
      	}, 0)

      	//原矿水份
      	let raw_mc = 100*(1-(raw_qty/raw_qty_wet))

      	//台时量
      	let oph = raw_qty/duration

      	//原矿铜金属量
      	let raw_qty_metal_cu = obj.reduce((total, v) => {
      		return total + v.raw_qty_metal_cu
      	}, 0)

      	//原矿铜品位
      	let raw_cu = 100*raw_qty_metal_cu/raw_qty

      	//原矿铁金属量
      	let raw_qty_metal_fe = obj.reduce((total, v) => {
      		return total + v.raw_qty_metal_fe
      	}, 0)

      	//原矿铁品位
      	let raw_fe = 100*raw_qty_metal_fe/raw_qty

      	//铜精矿产量
      	let cuc_qty = obj.reduce((total, v) => {
      		return total + v.cuc_qty
      	}, 0)

      	//铜精矿金属量
      	let cuc_qty_metal = obj.reduce((total, v) => {
      		return total + v.cuc_qty_metal
      	}, 0)

      	//铜精矿铁金属量
      	let cuc_qty_metal_fe = obj.reduce((total, v) => {
      		return total + (v.cuc_fe/100)*v.cuc_qty
      	}, 0)

      	//铜精矿品位
      	let cuc_cu = 100*cuc_qty_metal/cuc_qty

      	//铜精矿铁品位
      	let cuc_fe = 100*cuc_qty_metal_fe/cuc_qty

      	//铜尾矿产量
      	let cut_qty = obj.reduce((total, v) => {
      		// console.log(v.raw_qty,v.raw_cu,v.cuc_qty_metal,v.cut_cu)
      		return total + v.cut_qty
      	}, 0)

      	//铜尾矿金属量
      	let cut_qty_metal = obj.reduce((total, v) => {
      		return total + v.cut_qty_metal
      	}, 0)

      	//铜尾矿铁金属量
      	let cut_qty_metal_fe = obj.reduce((total, v) => {
      		return total + v.cut_qty_metal_fe
      	}, 0)

      	//铜尾矿品位
      	let cut_cu = 100*cut_qty_metal/cut_qty

      	//铜尾矿铁品位
      	let cut_fe = 100*cut_qty_metal_fe/cut_qty

      	//铜回收率
      	// let cuc_rec = 100 * cuc_cu * (raw_cu - cut_cu) / (raw_cu * (cuc_cu - cut_cu))
      	let cuc_rec = 100 * cuc_qty_metal / raw_qty_metal_cu


      	//铁精矿产量
      	let fec_qty = obj.reduce((total, v) => {
      		return total + v.fec_qty
      	}, 0)

      	//铁精矿金属量
      	let fec_qty_metal = obj.reduce((total, v) => {
      		return total + v.fec_qty_metal
      	}, 0)

      	//铁精矿品位
      	let fec_fe = 100*fec_qty_metal/fec_qty

      	//铁尾矿产量
      	let fet_qty = obj.reduce((total, v) => {
      		return total + (v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
      	}, 0)

      	//铁尾矿金属量(含磁性铁数据累加)
      	let fet_qty_mfe = obj.reduce((total, v) => {
      		// console.log(v.fet_mfe?1:0)
      		return total + (v.fet_mfe?(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100):0)
      	}, 0)

      	//铁尾矿金属量
      	let fet_qty_metal = obj.reduce((total, v) => {
      		return total + (v.cut_qty*v.cut_fe/100-v.fec_qty_metal)
      	}, 0)

      	//铁尾矿铜金属量
      	let fet_qty_metal_cu = obj.reduce((total, v) => {
      		return total + (v.fet_cu/100)*(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
      		// return total + (v.cut_qty*v.cut_fe/100-v.fec_qty_metal)
      	}, 0)

      	//铁尾矿磁性铁金属量
      	let fet_qty_metal_mfe = obj.reduce((total, v) => {
      		return total + (v.fet_mfe/100)*(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
      	}, 0)

      	//铁尾矿非磁性铁金属量
      	let fet_qty_metal_nfe = obj.reduce((total, v) => {
      		return total + (v.fet_nfe/100)*(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
      	}, 0)

      	//铁尾矿品位
      	let fet_fe = 100*fet_qty_metal/fet_qty

      	//铁尾矿铜品位
      	let fet_cu = 100*fet_qty_metal_cu/fet_qty

      	//铁尾矿磁性铁品位
      	let fet_mfe = 100*fet_qty_metal_mfe/fet_qty_mfe

      	//铁尾矿非磁性铁品位
      	let fet_nfe = 100*fet_qty_metal_nfe/fet_qty_mfe

      	//铁回收率
      	// let fec_rec = 100 * fec_fe * (cut_fe - fet_fe) / (cut_fe * (fec_fe - fet_fe))
      	let fec_rec = 100 * fec_qty_metal / cut_qty_metal_fe

      	let date = '总计'
      	// let shift = this.selectedData.length? this.selectedData.length + '条数据' : this.json.length + '条数据'
      	// let shift = this.selected.length? this.selected.length + '条数据' : this.json.length + '条数据'

      	this.total = {
          id:'total',
      		date,
      		// shift,
      		duration,
      		oph,
      		raw_cu,
      		raw_fe,
      		raw_mc,
      		raw_qty_wet,
      		raw_qty,
      		raw_qty_metal_cu,
      		cuc_cu,
      		cuc_rec,
      		cuc_qty,
      		cuc_qty_metal,
      		cuc_fe,
      		// cuc_deh_cu,
      		// cuc_deh_mc,
      		cut_cu,
      		cut_fe,
      		fec_fe,
      		fec_rec,
      		fec_qty,
      		fec_qty_metal,
      		// fec_deh_fe,
      		// fec_deh_mc,
      		fet_fe,
      		fet_cu,
      		fet_mfe,
      		fet_nfe,
      	}

      	// console.log(this.total)
      	this.json.push(this.total)
      	console.timeEnd('totalData')
      },
    }
  }

</script>

<style>
</style>
