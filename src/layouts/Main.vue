<template>
  <q-layout view="hHh Lpr lff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn flat round icon="menu" @click="drawer=!drawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img style="width: 26px" src="https://test.hopuc.com/video/img/logo.svg">
          </q-avatar> -->
          Indices
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="表格" />
        <q-route-tab to="/chart" label="图表" />
      </q-tabs>
    </q-header>

    <!-- <q-drawer show-if-above v-model="left" side="left" bordered>

    </q-drawer> -->

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="240"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit" style="max-width: 350px">

        <q-list bordered padding>

        <q-item-label header>设置</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>简称</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="blue" v-model="alias" val="battery" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section side >
            <q-select
              v-model="month"
              filled
              dense
              options-dense
              label="显示月份"
              :options="monthOptions"
              style="min-width: 200px"
            >
              <template v-if="month" v-slot:append>
                <q-icon name="cancel" @click.stop="month = null" class="cursor-pointer" size="18px" />
              </template>
            </q-select>
          </q-item-section>
        </q-item>

        <!-- <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Friend request</q-item-label>
            <q-item-label caption>Allow notification</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle color="green" v-model="notif2" val="friend" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Picture uploaded</q-item-label>
            <q-item-label caption>Allow notification when uploading images</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle color="red" v-model="notif3" val="picture" />
          </q-item-section>
        </q-item> -->

        </q-list>

        <q-list v-for="(menuItem, index) in menuList" tag="label" :key="index">
          <q-item clickable :active="menuItem.label===''" v-ripple>
            <!-- <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section> -->
            <q-item-section>
              {{menuItem.label}}
            </q-item-section>
            <!-- <q-item-section side top>
              <q-toggle color="red" v-model="notif3" val="picture" />
            </q-item-section> -->
          </q-item>
         <q-separator v-if="menuItem.separator" />
        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view :indices="indices" :showData="show" :columns="columns" :total="total" />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      alias: true,
      notif1: true,
      notif2: true,
      notif3: false,
      menuList: [
        {
          icon: 'delete',
          label: 'Trash',
          separator: false
        },
        {
          icon: 'settings',
          label: 'Settings',
          separator: false
        },
        {
          icon: 'info',
          iconColor: 'primary',
          label: 'About',
          separator: false
        }
      ],
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
      show: [],
      columns:[],
      total: {},
      indicesData: [],
      month: null,
      monthOptions: [],
      monthData: [],
    }
  },
  watch:{
    month:function(n){
      // this.selected = []
      if(n){
        this.show = this.monthData[n.value-1]
      }else{
        this.show = this.allData
      }
      this.totalData('show')
    },
  },
  created:function(){
    fetch('https://test.hopuc.com/indices/api/api.php')
    .then(rec => rec.json())
    .then(rec => {
    	if(rec.success){
    		console.log(rec.data)
    		this.indicesData = rec.data
        this.getData()
      }else{
        console.log('云端数据获取失败')
      }
    })

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
  methods:{
    getData: function(){
      console.time('fetch')
      var [...arr] = this.indicesData
      this.allData = arr
      console.time('for')
      for(var i = 1; i <= 12; i++){
         var value = this.allData.filter((v) => {
           let month = i
           let days = (m) => new Date(2020,m,0).getDate()
           var date = v.date
           if(v.date.indexOf('月') != -1){
             date = v.date.replace("月","-").replace("日","")
           }
           var currentMonth = date.split('-')[0]
           var currentDay = date.split('-')[1]
           var check = (currentMonth == month && (currentDay != days(month) && currentDay != days(month)-1)) || (currentMonth == month-1 && (currentDay == days(month-1) || currentDay == days(month-1)-1))
           return check && v.raw_qty_wet > 0 && v.date !== '总计'
         })
         this.monthOptions.push({label:i+'月',value:i})
         this.monthData.push(value)
       }

       // console.log(JSON.stringify(this.monthData[5]))

        this.show = this.allData
        // this.show = this.monthData[4]
        this.show.forEach((v,i) =>{
          this.calculateData(i)
        })
        this.totalData('show')
        console.timeEnd('for')

      	this.loading = false
      	console.timeEnd('fetch')
    },
    calculateData: function(i) {
    	// this.show.forEach((v,i) =>{
    		// console.log(this.show[i]);
    	// })
    	// console.time(i)

    	this.show[i].id = this.show[i].date.replace("月","-").replace("日","-") + (this.show[i].shift=='早班'?0:1);
    	//原矿干量
      this.show[i].raw_qty = this.show[i].raw_qty_wet * (1 - this.show[i].raw_mc / 100);
    	//台时量
    	this.show[i].oph = this.show[i].duration!=null?this.show[i].raw_qty / (Number(this.show[i].duration.toString().split(':')[0]) + Number(this.show[i].duration.toString().split(':')[1]/60)):0;

    	//原矿铜金属量
    	this.show[i].raw_qty_metal_cu = this.show[i].raw_qty * (this.show[i].raw_cu / 100);
    	//原矿铁金属量
    	this.show[i].raw_qty_metal_fe = this.show[i].raw_qty * (this.show[i].raw_fe / 100);

    	//铜回收率
    	this.show[i].cuc_rec = 100 * this.show[i].cuc_cu * (this.show[i].raw_cu - this.show[i].cut_cu) / (this.show[i].raw_cu * (this.show[i].cuc_cu - this.show[i].cut_cu));
    	//铜精矿金属量
    	this.show[i].cuc_qty_metal = this.show[i].cuc_rec * this.show[i].raw_qty_metal_cu / 100;
    	//铜精矿产量
    	this.show[i].cuc_qty = this.show[i].cuc_qty_metal / (this.show[i].cuc_cu / 100);


    	//铜尾矿金属量
    	this.show[i].cut_qty_metal = this.show[i].raw_qty_metal_cu - (this.show[i].cuc_qty * this.show[i].cuc_cu / 100);
    	//铜尾矿产量
    	this.show[i].cut_qty = (this.show[i].cut_qty_metal / (this.show[i].cut_cu/100))
    	//铜尾矿铁金属量
    	this.show[i].cut_qty_metal_fe = this.show[i].raw_qty_metal_fe - (this.show[i].cuc_qty * this.show[i].cuc_fe / 100);
    	//铜尾矿铁品位
    	this.show[i].cut_fe = 100 * this.show[i].cut_qty_metal_fe / this.show[i].cut_qty;
    	// console.log(this.show[i].cut_qty_metal_fe , this.show[i].cut_qty)

    	//铁回收率
    	this.show[i].fec_rec = 100 * this.show[i].fec_fe * (this.show[i].cut_fe - this.show[i].fet_fe) / (this.show[i].cut_fe * (this.show[i].fec_fe - this.show[i].fet_fe));
    	//铁精矿金属量
    	this.show[i].fec_qty_metal = this.show[i].fec_rec * this.show[i].cut_qty_metal_fe / 100;
    	//铁精矿产量
    	this.show[i].fec_qty = this.show[i].fec_qty_metal / (this.show[i].fec_fe / 100)
    	// console.timeEnd(i)
    },
    totalData: function(e) {
      // console.log(e)
    	console.time('totalData')
      // var index = this.show.findIndex(v => v.date == '总计')
      // // console.log(index)
      // if(index>0){
      // 	this.show.splice(index, 1)
      // }
      this.show = this.show.filter((v) => {
        // console.log(v.id)
        return v.id !== 'total'
      })
    	var arr
    	if(e=='select'){
    		[...arr] = this.selected
    		// arr = this.selected
        arr = arr.filter((v) => {
          // console.log(v.id)
          return v.id !== 'total'
        })
    	}else if(e=='show'){
    		arr = this.show
    	}
      if(arr.length==0){
        console.timeEnd('totalData')
        return false
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
    	// let shift = this.selectedData.length? this.selectedData.length + '条数据' : this.show.length + '条数据'
    	// let shift = this.selected.length? this.selected.length + '条数据' : this.show.length + '条数据'
      let shift = arr.length + '条数据'

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

    	console.log('this.total',this.total)
    	this.show.push(this.total)
    	console.timeEnd('totalData')
    },
  }
}
</script>
