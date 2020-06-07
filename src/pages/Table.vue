<template>
  <div>

    <q-dialog v-model="addDialog">
      <q-card class="" style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">添加指标</div>
        </q-card-section>

        <q-card-section class="">
          <q-input filled v-model="addDate" :rules="['']" label="日期" class="col">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date minimal v-model="addDate" mask="MM-DD" today-btn @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <q-input v-model="date" dense filled type="date" /> -->
          <!-- <q-input id="copy" dense v-model="addDate" /> -->
          <!-- <q-input id="copy" filled v-model="addShift" label="班次" class="col"/> -->
          <q-select filled v-model="addShift" :options="options" label="班次" class="col" />
        </q-card-section>
        <q-card-section>
          <q-input id="copy" type="textarea" filled v-model="addText" autofocus @keyup.enter="prompt=false" label="指标" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="添加" @click="add()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="copyDialog">
      <q-card class="" style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">复制指标</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input id="copy" type="textarea" dense v-model="totalText" autofocus @keyup.enter="prompt=false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="复制" @click="copy()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-table
      class="my-sticky-header-table"
      title="Indices"
      :data="json"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
      :table-style="tableFullscreen?'max-height: 100vh':'max-height: calc(100vh - 164px)'"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :hide-bottom="true"
      :loading="loading"
    >
      <template v-slot:top="props">
        <!-- <img
          style="height: 40px; width: 40px"
          src="https://test.hopuc.com/video/img/logo-purple.svg"
        > -->

        <!-- <q-space /> -->

        <q-select
          v-model="visibleColumns"
          multiple
          dense
          options-dense
          filled
          display-value="显示内容"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 120px"
        />

        <q-space />

        <!-- <q-icon class="q-ml-xs" name="unfold_more" /> -->
        <!-- <q-icon name="download" /> -->
        <q-btn
          dense
          flat
          round
          color=""
          icon="add"
          @click="openAdd()"
          class="q-ml-md"
        />

        <q-btn
          dense
          flat
          round
          color=""
          @click="openCopy()"
          class="q-ml-md"
        >
          <q-icon size="19px" name="content_copy" />
          <!-- <div>Label</div> -->
        </q-btn>

        <q-btn
          dense
          flat
          round
          color=""
          @click="tocsv(1,'车间指标统计表.csv')"
          class="q-ml-md"
        >
          <q-icon size="21px" name="save_alt" />
          <!-- <div>Label</div> -->
        </q-btn>

        <q-btn
          dense
          flat
          round
          color=""
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="tableFullscreen = !props.inFullscreen;props.toggleFullscreen()"
          class="q-ml-md"
        />
      </template>

      <!-- <template v-slot:header="props">
          <q-th v-if="selection=='multiple'" auto-width>
            <q-checkbox
              color="secondary"
              v-if="props.multipleSelect"
              v-model="props.selected"
              indeterminate-value="some"
            />
          </q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props" style="min-width: 130px">
            <span v-if="!col.sortby" >{{ col.label }}</span>
            <q-btn v-else size="xs" dense flat class="no-padding no-wrap"
            @click="tableSortBy(col.name, $route.query.order_by)">
              {{ col.label }}
              <q-icon v-if="$route.query.order_by === col.name" class="q-ml-xs" name="arrow_upward" color="primary" />
              <q-icon v-else-if="$route.query.order_by === '-' + col.name" class="q-ml-xs" name="arrow_downward" color="primary" />
              <q-icon v-else-if="col.sortby" class="q-ml-xs" name="unfold_more" />
            </q-btn>
          </q-th>
      </template> -->

      <!-- <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox
              color=""
              v-model="props.selected"
              indeterminate-value="some"
            />
          </q-td>

          <q-td v-for="column of columns" :key="column.name" :props="props">
            {{ props.row[column.name] }}
            <q-popup-edit v-if="column.writable" v-model="props.row[column.name]" title="Update data" buttons>
              <q-input type="number" v-model="props.row[column.name]" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template> -->
      <!-- <template v-slot:bottom="props"> -->
        <!-- <q-tr>
          <q-td colspan="100%">
            <q-checkbox
              toggle-indeterminate
              v-model="checkAll"
              label="全选"
              @input="clickAllSelect"
              class="vbot-check-all"
            >
            </q-checkbox>
          </q-td>
        </q-tr> -->
        <!-- <q-tr :props="props">
          <q-td>
            <q-checkbox
              color=""
              v-model="props.selected"
              indeterminate-value="some"
            />
          </q-td>

          <q-td v-for="column of columns" :key="column.name" :props="props">
            {{ props.row[column.name] }}
            <q-popup-edit v-if="column.writable" v-model="props.row[column.name]" title="Update data" buttons>
              <q-input type="number" v-model="props.row[column.name]" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr> -->
      <!-- </template> -->

    </q-table>

  </div>

</template>

<script>
	// import HelloWorld from './components/HelloWorld.vue'
	// import json from '202005.json'

	export default {
		name: 'App',
		components: {
			// HelloWorld
		},
		data() {
			return {
				// index: 'table',
				loading: true,
				// activeIndex: 'table',
				// isCollapse: true,
				// permission: 2,
				alias: false,
				// panel: false,
				// fixed: true,
				// edit: null,
				// drawer: false,
				copyDialog: false,
				addDialog: false,
        tableFullscreen: false,
				chart: 'fec_fe',
				type: {
					raw: '原矿',
					cuc: '铜精矿',
					cut: '铜尾矿',
					fec: '铁精矿',
					fet: '铁尾矿'
				},
				name: {
					cu: '铜品位',
					fe: '铁品位',
					qty: '处理量',
					mc: '水份',
				},
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
				/* options: [{
					value: '早班',
					label: '早班'
				}, {
					value: '白班',
					label: '白班'
				}], */
        options: ['早班', '白班'],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now()
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date())
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date()
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date)
						}
					}],
				},
        menuList: [{
          icon: 'inbox',
          label: 'Inbox',
          separator: true
        },
        {
          icon: 'send',
          label: 'Outbox',
          separator: false
        }],
        columns: [],
        visibleColumns: ['date', 'shift', 'raw_qty', 'raw_cu', 'cuc_cu', 'cut_cu', 'cuc_rec', 'cuc_qty_metal', 'fec_fe', 'fec_qty', 'fet_mfe'],
        selected: [],
				allData: [],
				json: [],
        pagination: {
          rowsPerPage: 0
        },
				// selectedData: [],
				total: {},
				totalText: '',
				addText: '',
				addDate: '',
				addShift: '',
			}
		},
		computed:{

		},
		watch:{
			// json:{
			// handler() {
			// 	// this.calculateData()
			// 	// console.log(newName)
			// 	// console.log(oldName)
			// 	// console.log('json changed')
			// },
			// deep: true,
			// immediate: true,
			// },
			/* index:function(){
				if(this.index=='table'){
					this.notice('table','已打开操作面板！')
				}else if(this.index=='chart'){
					this.echarts()
					this.echartsSelect()
					this.notice('chart','chart')
				}
			}, */
			/* alias:function (){
				if(this.alias){
					localStorage.setItem('alias', 'true')
					this.notice('打开成功','已打开简称模式')
				}else{
					localStorage.setItem('alias', 'false')
					this.notice('关闭成功','已关闭简称模式')
				}
			},
			panel:function(){
				if(this.panel){
					// this.panel = false
					localStorage.setItem('panel', 'true')
					this.notice('打开成功','已打开操作面板')
				}else{
					// this.panel = true
					localStorage.setItem('panel', 'false')
					this.notice('关闭成功','已关闭操作面板')
				}
			},
			fixed:function(){
				if(this.fixed){
					localStorage.setItem('fixed', 'true')
					this.notice('打开成功','已固定表格日期')
				}else{
					localStorage.setItem('fixed', 'false')
					this.notice('关闭成功','已取消固定表格日期')
				}
			},
			chart:function(){
				this.echartsSelect()
			}, */
      selected:function(){
        this.totalData('select')
      	// this.echartsSelect()
      },
		},
		created: function() {

			/* if(localStorage.getItem('alias')=='true'){
				this.alias = true
			}
			if(localStorage.getItem('panel')=='true'){
				this.panel = true
			}
			if(localStorage.getItem('fixed')=='true'){
				this.fixed = true
			} */

      // console.log(this.$q.lang)

      for(var i in this.indices){
        // this.columns[i] =
        // console.log(i,this.indices[i])
        this.columns.push({
            name: i,
            label: this.indices[i].name,
            field: i,
            align: 'left',
            // required: true,
            sortable: true,
            decimal: this.indices[i].decimal,
            writable: this.indices[i].writable,
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

      // console.log(JSON.stringify(this.columns))
      // console.log(this.columns)

			/* Object.keys(this.indices).forEach((v) =>{
				console.log(`this.$set(this.total,'${v}',${v})`)
			}) */
			// this.json = require('202005.json');
		},
		mounted:function() {
			console.time('fetch')
			fetch('https://test.hopuc.com/indices/api/api.php')
			.then(rec => rec.json())
			.then(rec => {
				if(rec.success){
					// console.log(rec);
					// console.time(1)
					console.log(rec.data)
					this.allData = rec.data
					/* let json = this.allData.filter((v) => {
						// console.log(v.raw_qty_wet,i)
						let month = 5
						let days = (m) => new Date(2020,m,0).getDate()
						var date = v.date
						if(v.date.indexOf('月') != -1){
							date = v.date.replace("月","-").replace("日","")
						}
						var currentMonth = date.split('-')[0]
						var currentDay = date.split('-')[1]
						// check = (v.date.split('-')[0] == month && v.date.split('-')[1] != days(month) || (v.date.split('-')[1] != days(month)-1) && (v.date.split('-')[0] == month-1 && v.date.split('-')[1] == days(month-1)) || v.date.split('-')[1] == days(month-1)-1)

						var check = (currentMonth == month && (currentDay != days(month) && currentDay != days(month)-1)) || (currentMonth == month-1 && (currentDay == days(month-1) || currentDay == days(month-1)-1))
						// console.log(days(month-1),days(month-1)-1)
						// console.log(currentMonth,currentDay)
						return check && v.raw_qty_wet > 0 && v.date !== '总计'
					})
					console.log(json); */
					this.json = this.allData
					console.time('for')
					this.json.forEach((v,i) =>{
						this.calculateData(i)
					})
					this.totalData('json')
					//this.echarts()
					//this.echartsSelect()
					// console.timeEnd(1)
					console.timeEnd('for')
				}else{
					this.notice('获取失败','云端数据获取失败')
				}
				this.loading = false
				console.timeEnd('fetch')
			})
		},
		/* filters:{
			rounding: function(value, decimal){
				let num = Number(value).toFixed(decimal);
				var x = String(value).indexOf('.') + 1; //小数点的位置
				var y = String(value).length - x; //小数的位数
				if(isNaN(num) || num == 0){
					return value;
				}else if(y >= 0){
					return Number(value).toFixed(decimal);
				}
			}
		}, */
		methods: {
      getSelectedString: function(){
        // setTimeout(()=>{this.totalData('select')},8000)
        // this.totalData('select')
        // console.log('aa')
        //return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.json.length}`
      },
			echarts:function(){
				let cuc_cu = this.$echarts.init(document.getElementById('chart-cuc-cu'))
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

				let cuc_rec = this.$echarts.init(document.getElementById('chart-cuc-rec'))
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

			},
			echartsSelect:function(){
				let chart = this.$echarts.init(document.getElementById('chart'))
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
			calculateData: function(i) {
				// this.json.forEach((v,i) =>{
					// console.log(this.json[i]);
				// })
				// console.time(i)

				this.json[i].id = this.json[i].date.replace("月","-").replace("日","-") + (this.json[i].shift=='早班'?0:1);
				//原矿干量
        this.json[i].raw_qty = this.json[i].raw_qty_wet * (1 - this.json[i].raw_mc / 100);
				//台时量
				this.json[i].oph = this.json[i].duration!=null?this.json[i].raw_qty / (Number(this.json[i].duration.toString().split(':')[0]) + Number(this.json[i].duration.toString().split(':')[1]/60)):0;

				//原矿铜金属量
				this.json[i].raw_qty_metal_cu = this.json[i].raw_qty * (this.json[i].raw_cu / 100);
				//原矿铁金属量
				this.json[i].raw_qty_metal_fe = this.json[i].raw_qty * (this.json[i].raw_fe / 100);

				//铜回收率
				this.json[i].cuc_rec = 100 * this.json[i].cuc_cu * (this.json[i].raw_cu - this.json[i].cut_cu) / (this.json[i].raw_cu * (this.json[i].cuc_cu - this.json[i].cut_cu));
				//铜精矿金属量
				this.json[i].cuc_qty_metal = this.json[i].cuc_rec * this.json[i].raw_qty_metal_cu / 100;
				//铜精矿产量
				this.json[i].cuc_qty = this.json[i].cuc_qty_metal / (this.json[i].cuc_cu / 100);


				//铜尾矿金属量
				this.json[i].cut_qty_metal = this.json[i].raw_qty_metal_cu - (this.json[i].cuc_qty * this.json[i].cuc_cu / 100);
				//铜尾矿产量
				this.json[i].cut_qty = (this.json[i].cut_qty_metal / (this.json[i].cut_cu/100))
				//铜尾矿铁金属量
				this.json[i].cut_qty_metal_fe = this.json[i].raw_qty_metal_fe - (this.json[i].cuc_qty * this.json[i].cuc_fe / 100);
				//铜尾矿铁品位
				this.json[i].cut_fe = 100 * this.json[i].cut_qty_metal_fe / this.json[i].cut_qty;
				// console.log(this.json[i].cut_qty_metal_fe , this.json[i].cut_qty)

				//铁回收率
				this.json[i].fec_rec = 100 * this.json[i].fec_fe * (this.json[i].cut_fe - this.json[i].fet_fe) / (this.json[i].cut_fe * (this.json[i].fec_fe - this.json[i].fet_fe));
				//铁精矿金属量
				this.json[i].fec_qty_metal = this.json[i].fec_rec * this.json[i].cut_qty_metal_fe / 100;
				//铁精矿产量
				this.json[i].fec_qty = this.json[i].fec_qty_metal / (this.json[i].fec_fe / 100)
				// console.timeEnd(i)
			},
			totalData: function(e) {
				console.time('totalData')
        let index = this.json.findIndex(v => v.date == '总计')
        // console.log(index)
        if(index>0){
        	this.json.splice(index, 1)
        }
				var arr
				if(e=='select'){
					// [...arr] = this.selected
					arr = this.selected
          let index = arr.findIndex(v => v.date == '总计')
          if(index>0){
            arr.splice(index, 1)
          }
				}else if(e=='json'){
					arr = this.json
				}

				//时长
				let duration = arr.reduce((total, v) => {
					// console.log(total , v.raw_qty)
					if(v.duration!=null){
						return total + (Number(v.duration.toString().split(':')[0]) + Number(v.duration.toString().split(':')[1]/60))
					}
				}, 0)

				//原矿产量
				let raw_qty = arr.reduce((total, v) => {
					// console.log(total , v.raw_qty)
					return total + v.raw_qty
				}, 0)

				//原矿湿量
				let raw_qty_wet = arr.reduce((total, v) => {
					// console.log(total , v.raw_qty_wet)
					return total + Number(v.raw_qty_wet)
				}, 0)

				//原矿水份
				let raw_mc = 100*(1-(raw_qty/raw_qty_wet))

				//台时量
				let oph = raw_qty/duration

				//原矿铜金属量
				let raw_qty_metal_cu = arr.reduce((total, v) => {
					return total + v.raw_qty_metal_cu
				}, 0)

				//原矿铜品位
				let raw_cu = 100*raw_qty_metal_cu/raw_qty

				//原矿铁金属量
				let raw_qty_metal_fe = arr.reduce((total, v) => {
					return total + v.raw_qty_metal_fe
				}, 0)

				//原矿铁品位
				let raw_fe = 100*raw_qty_metal_fe/raw_qty

				//铜精矿产量
				let cuc_qty = arr.reduce((total, v) => {
					return total + v.cuc_qty
				}, 0)

				//铜精矿金属量
				let cuc_qty_metal = arr.reduce((total, v) => {
					return total + v.cuc_qty_metal
				}, 0)

				//铜精矿铁金属量
				let cuc_qty_metal_fe = arr.reduce((total, v) => {
					return total + (v.cuc_fe/100)*v.cuc_qty
				}, 0)

				//铜精矿品位
				let cuc_cu = 100*cuc_qty_metal/cuc_qty

				//铜精矿铁品位
				let cuc_fe = 100*cuc_qty_metal_fe/cuc_qty

				//铜尾矿产量
				let cut_qty = arr.reduce((total, v) => {
					// console.log(v.raw_qty,v.raw_cu,v.cuc_qty_metal,v.cut_cu)
					return total + v.cut_qty
				}, 0)

				//铜尾矿金属量
				let cut_qty_metal = arr.reduce((total, v) => {
					return total + v.cut_qty_metal
				}, 0)

				//铜尾矿铁金属量
				let cut_qty_metal_fe = arr.reduce((total, v) => {
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
				let fec_qty = arr.reduce((total, v) => {
					return total + v.fec_qty
				}, 0)

				//铁精矿金属量
				let fec_qty_metal = arr.reduce((total, v) => {
					return total + v.fec_qty_metal
				}, 0)

				//铁精矿品位
				let fec_fe = 100*fec_qty_metal/fec_qty

				//铁尾矿产量
				let fet_qty = arr.reduce((total, v) => {
					return total + (v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
				}, 0)

				//铁尾矿金属量(含磁性铁数据累加)
				let fet_qty_mfe = arr.reduce((total, v) => {
					// console.log(v.fet_mfe?1:0)
					return total + (v.fet_mfe?(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100):0)
				}, 0)

				//铁尾矿金属量
				let fet_qty_metal = arr.reduce((total, v) => {
					return total + (v.cut_qty*v.cut_fe/100-v.fec_qty_metal)
				}, 0)

				//铁尾矿铜金属量
				let fet_qty_metal_cu = arr.reduce((total, v) => {
					return total + (v.fet_cu/100)*(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
					// return total + (v.cut_qty*v.cut_fe/100-v.fec_qty_metal)
				}, 0)

				//铁尾矿磁性铁金属量
				let fet_qty_metal_mfe = arr.reduce((total, v) => {
					return total + (v.fet_mfe/100)*(v.cut_qty*v.cut_fe/100-v.fec_qty_metal)/(v.fet_fe/100)
				}, 0)

				//铁尾矿非磁性铁金属量
				let fet_qty_metal_nfe = arr.reduce((total, v) => {
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
				let shift = this.selected.length? this.selected.length + '条数据' : this.json.length + '条数据'

				this.total = {
          id:'total',
					date,
					shift,
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
			/* tableName:function(k,v){
				if(this.type[k.split('_')[0]]){
					if(this.alias&&v.alias){
						return v.alias
					}else{
						return this.type[k.split('_')[0]] + '' + v.name
					}
				}else{
					if(this.alias&&v.alias){
						return v.alias
					}else{
						return v.name
					}
				}
			}, */
			/* tableName:function(e){
				if(this.type[e.split('_')[0]]){
					if(this.alias&&this.indices[e].alias){
						return this.indices[e].alias
					}else{
						return this.type[e.split('_')[0]] + '' + this.indices[e].name
					}
				}else{
					if(this.alias&&this.indices[e].alias){
						return this.indices[e].alias
					}else{
						return this.indices[e].name
					}
				}
			}, */
			deleteRow: function(index, rows) {
				rows.splice(index, 1)
				this.edit = null
			},
			/* editRow: function (index) {
				if(this.edit == index){
					this.edit = null
				}else{
					this.edit = index
				}
			}, */
			addRow: function() {
				var date = new Date();
				date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
				var d = date.toJSON().substr(5, 5).replace(/[T]/g)
				var h = date.toJSON().substr(11, 2).replace(/[T]/g, ' ')
				var shift
				if(h > 7 && h < 18){
					shift = '早班'
				}else{
					shift = '白班'
				}
				this.json.splice(-1,0,{date:d,shift})
				this.editRow(this.json.length-2)
				this.scrollBottom()
				this.index = 'table'
				this.panel = true
				this.drawer = false
				// this.notice('添加成功','请滚动至表格最下方输入相应的数据！')
			},
			add: function() {
				let value = this.addText.trim().split("\t");
				let key = ["raw_cu", "cuc_cu", "cut_cu", "raw_fe", "cuc_fe", "fec_fe", "fet_fe", "fet_cu", "fet_mfe", "fet_nfe", "fec_deh_fe", "cuc_deh_cu", "cuc_deh_mc", "fec_deh_mc", "raw_qty_wet", "raw_mc", "duration"]

				let obj = {
					date: this.addDate,
					shift: this.addShift
				}
				key.map((v, i) => {
					console.log(v,i);
					obj[v] = value[i];
				});
				// console.log(key,value,obj)
				// console.log(key)
				// console.log(obj)

				this.json.splice(-1,0,obj)
				// this.editRow(this.json.length-2)
				// this.scrollBottom()
				this.index = 'table'
				// this.panel = true
				this.addDialog = false
				this.calculateData()
				this.totalData()
				this.save()
			},
			openAdd:function(){
				this.drawer = false
				this.addDialog = true
				// this.calculateData()
				var date = new Date();
				date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
				this.addDate = date.toJSON().substr(5, 5).replace(/[T]/g, ' ')
        // this.addDate = date.toJSON().substr(0, 10).replace(/[T]/g, ' ')
				var h = date.toJSON().substr(11, 2).replace(/[T]/g, ' ')
				if(h > 7 && h < 18){
					this.addShift = '早班'
				}else{
					this.addShift = '白班'
				}
			},
			save: function(){
				fetch('https://test.hopuc.com/indices/api/api.php', {
					method: 'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: "data="+JSON.stringify(this.json)
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					this.notice('保存成功','数据已保存成功！')
				})
			},
			openCopy: function(){
				// return JSON.stringify(this.total)
				var date = ''
				if(this.selected.length == 2 && this.selected[0].date == this.selected[1].date){
					date = this.selected[0].date
				}
				var cuc_deh_cu = this.selected.reduce((total, v) => {
					console.log(total , v.cuc_deh_cu)
					return total + Number(v.cuc_deh_cu/this.selected.length)
				}, 0)
				var fec_deh_fe = this.selected.reduce((total, v) => {
					console.log(total , v.fec_deh_fe)
					return total + Number(v.fec_deh_fe/this.selected.length)
				}, 0)

				var text = `${date}生产指标：
台时量${Number(this.total.oph).toFixed(2)}；处理量${Number(this.total.raw_qty).toFixed(2)}；原矿品位${Number(this.total.raw_cu).toFixed(3)}；铜精矿${Number(this.total.cuc_cu).toFixed(2)}；矿山铜${Number(this.total.cuc_qty_metal).toFixed(2)}；铜尾矿${Number(this.total.cut_cu).toFixed(3)}；铜回收率${Number(this.total.cuc_rec).toFixed(2)}；铁精矿${Number(this.total.fec_fe).toFixed(2)}；过滤铁${Number(fec_deh_fe).toFixed(2)}；过滤铜${Number(cuc_deh_cu).toFixed(2)}`
				this.totalText = text
				this.copyDialog = true
			},
			copy: function() {
				var node = document.getElementById('copy')
				node.select()
				document.execCommand('Copy')
				this.notice('复制成功','已复制到剪贴板')
			},
			tocsv: function(id, fileName){
				var line
				if(id == 1){
					let arr = ['date','shift','raw_qty','oph','raw_cu','cuc_cu','cuc_deh_cu','cut_cu','cuc_rec','cut_fe','fec_fe','fec_deh_fe','fet_mfe','fet_nfe','fec_rec']
					/* let name = arr.map((v)=>{
						return this.indices[v].name
					}) */
					line = '序号,日期,班次,处理量,台时量,铜原矿品位,铜精矿品位,铜过滤品位,铜尾矿品位,选铜回收率,铁原矿品位,铁精矿品位,铁过滤品位,铁尾磁性铁,非磁性铁,选铁回收率\r\n'
					this.json.forEach((v,i) => {
						// line += `${i+1},${v.date},${v.shift},${v.raw_qty},${v.oph},${v.raw_cu},${v.cuc_cu},${v.cuc_deh_cu},${v.cut_cu},${v.cuc_rec},${v.cut_fe},${v.fec_fe},${v.fec_deh_fe},${v.fet_mfe},${v.fec_rec},${v.fet_nfe}\r\n`
						line += `${i+1},`
						arr.forEach((name)=>{
							line += this.indices[name].decimal?Number(v[name]).toFixed(this.indices[name].decimal)+',':v[name]+',',
							console.log(v.decimal)
						})
						line += '\r\n'
					})
				}
				if(id == 2){
					let arr = ['date','shift','raw_qty','oph','raw_cu','cuc_cu','cuc_deh_cu','cut_cu','cuc_rec','cut_fe','fec_fe','fec_deh_fe','fet_mfe','fet_nfe','fec_rec']
					let name = arr.map((v)=>{
						return this.indices[v].name
					})
					line = name.join(',')+'\r\n'
					console.log(line)
					this.json.forEach((v) => {
						// line += '\r\n'
						arr.forEach((name)=>{
							line += this.indices[name].decimal?Number(v[name]).toFixed(this.indices[name].decimal)+',':v[name]+',',
							console.log(v.decimal)
						})
						line += '\r\n'
					})
				}
				console.log(line)
				var a = document.createElement('a');
				a.href = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(line);
				a.download = fileName;
				a.click();
			},
			scrollBottom: function () {
				let timer = setInterval(() => {
					let table = this.$refs.table.bodyWrapper
					let tableHeight = table.scrollHeight - table.clientHeight
					let ispeed = Math.floor(tableHeight / 6)
					table.scrollTop = table.scrollTop + ispeed
					// console.log(tableHeight ,table.scrollTop, table.scrollHeight , table.clientHeight,table.scrollTop + 1 >= table.scrollHeight)
					if (table.scrollTop + 1 >= tableHeight) {
						clearInterval(timer);
					}
				},30)
				// console.log(main.scrollTop);
			},
			drawerSelect: function(key, keyPath) {
				if(key.startsWith('2020')){
					this.loading = true
					let url = 'data/'+key+'.json'
					console.log(url)
					fetch(url)
					.then(rec => rec.json())
					.then(rec => {
						let json = rec.filter((v) => {
							// console.log(v.raw_qty_wet,i)
							return v.raw_qty_wet > 0
						})
						// this.json = rec
						this.json = json
						this.json.forEach((v,i) =>{
							this.calculateData(i)
						})
						this.totalData('json')
						// this.echarts()
						// this.echartsSelect()
						this.drawer = false
						this.loading = false
					})
				}
				console.log(key, keyPath)
			},
			/* handleSelect: function(key, keyPath) {
				if(key=='table'){
					this.index = 'table'
					this.notice('表格','已打开表格')
				}else if(key=='chart'){
					this.index = 'chart'
					setTimeout(() => {
						this.echarts()
						this.echartsSelect()
					},200)
					this.notice('图表','已打开图表')
				}
				console.log(key, keyPath)
			}, */
			/* notice: function(title, message) {
				this.$notify({
					title,
					message,
					type: 'success'
				});
			}, */
			/* message: function(index, rows) {
				this.$confirm('是否删除该数据?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					rows.splice(index, 1)
					this.edit = null
					this.$notify({
						title: '删除成功',
						type: 'success',
						message: '该条数据删除成功'
					});
				}).catch(() => {
					this.$notify({
						title: '取消删除',
						type: 'info',
						message: '您已取消删除'
					});
				});
			}, */
			/* selectionChange: function(val) {
				this.selectedData = val;
				this.totalData('select')
			}, */
		}
	}
</script>

<style>

  /* @media screen and (max-width: 900px){
  	::-webkit-scrollbar {
  		display: none;
  	}
  }

	::-webkit-scrollbar {
		width: 12px;
		height: 12px;
	}

	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 4px rgba(0,0,0,.1);
	}

	::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background: rgba(0, 0, 0, .2);
		box-shadow: inset 0 0 3px rgba(0,0,0,.2);
	} */

	/* * {
		outline: 0;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		font-family: "Microsoft YaHei", "Arial", "SimHei", sans-serif;
	}

	html,
	body {
		width: 100%;
		margin: 0;
		background: rgb(250,250,250);
	}

	a {
		text-decoration: none;
		cursor: pointer;
	} */

  .my-sticky-header-table thead tr th{
    position: sticky;
    z-index: 1;
  }
  .my-sticky-header-table .q-table__middle{
      max-height: 200px
  }
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    /* bg color is important for th; just specify one */
    background-color: rgb(250,250,250);
  }
  thead tr:first-child th{
    top: 0
  }
    /* this is when the loading indicator appears */
  .my-sticky-header-table .q-table--loading thead tr:last-child th{
    /* height of all previous header rows */
    top: 48px
   }

</style>
