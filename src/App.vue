<template>
<div id="app">
  <el-row :gutter="40">
    <el-col :span="12"  >
      <h1>呼吸</h1>
      <ve-line :extend="chartExtend" :data="breathData"></ve-line>
    </el-col>
     <el-col :span="12">
       <h1>头部姿势</h1>
       <el-row>
         <el-col :span="12" >
           <ve-pie  :extend="chartExtend" :data="headData" style="/*border-top-right-radius: 0;border-bottom-right-radius: 0*/" ></ve-pie>
         </el-col>
         <el-col :span="12" >
           <!--<ve-waterfall  :extend="chartExtend" :data="headTimeData" style="border-bottom-left-radius: 0;border-top-left-radius: 0"></ve-waterfall>-->
           <h1>当前姿势</h1>
           <h1 style="font-size: 100px;">{{headData.pose}}</h1>
         </el-col>
       </el-row>
     </el-col>
   </el-row>
  <el-row :gutter="40">
    <el-col>
      <img src="./assets/bull.png"/>
    </el-col>
  </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <h1>身体姿势</h1>
        <el-row>
          <el-col :span="12">
            <ve-pie  :extend="chartExtend" :data="bodyData" style="/*border-top-right-radius: 0;border-bottom-right-radius: 0*/"></ve-pie>
          </el-col>
          <el-col :span="12">
            <!--<ve-waterfall  :extend="chartExtend" :data="timeData" style="border-bottom-left-radius: 0;border-top-left-radius: 0"></ve-waterfall>-->
            <h1>当前姿势</h1>
            <h1 style="font-size: 100px;">{{bodyData.pose}}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <h1>运动量</h1>
            <ve-line  :extend="chartExtend" :data="activityData"></ve-line>
      </el-col>
    </el-row>
  <el-row>
    <el-col :span="16" :offset="4">
      <h1>实时数据</h1>
          <el-table :data="tableData" :header-cell-style="{background:'#2e2f3f'}" :cell-style="{background:'#2e2f3f'}" >
        <el-table-column prop="x" label="X" ></el-table-column>
        <el-table-column prop="y" label="Y"></el-table-column>
        <el-table-column prop="z" label="Z"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeWaterfall from 'v-charts/lib/waterfall.common'

// 批量初始化数组对象
function fillList (listParam, size, value) {
  for (let i = 0; i < size; i++) {
    listParam.push(value)
  }
}
// 循环刷新数组对象
function refreshList (listParam, size, jsonData) {
  if (listParam.length >= size) {
    listParam.shift()
  }
  listParam.push(jsonData)
}

function getTime () {
  var today = new Date()
  var h = today.getHours()
  var m = today.getMinutes()
  var s = today.getSeconds()
  return `${h}:${m}:${s}`
}
export default {
  name: 'App',
  data: function () {
    var i = 0
    var tableDataTemp = []
    var breathDataTemp = {columns: ['时间', '呼吸深度'], rows: []}
    var activityDataTemp = {columns: ['时间', '运动距离'], rows: []}
    var headDataTemp = {columns: ['姿势', '比例'], rows: [], pose: '未知'}
    var bodyDataTemp = {columns: ['姿势', '比例'], rows: [], pose: '未知'}
    fillList(breathDataTemp.rows, 10, {'时间': '00:00'})
    fillList(activityDataTemp.rows, 10, {'时间': '00:00'})
    headDataTemp.rows.push({'姿势': '抬头 50%', '比例': 50})
    headDataTemp.rows.push({'姿势': '低头50%', '比例': 50})
    bodyDataTemp.rows.push({'姿势': '站起', '比例': 50})
    bodyDataTemp.rows.push({'姿势': '趴下', '比例': 50})
    fillList(tableDataTemp, 10, 0)
    // 每隔一秒请求一次数据，并实时更新表格数据
    setInterval(function () {
      // 发送请求，获取数据
      window.fetch('http://123.207.19.172:8090/analysis_pers').then(res => res.json()).then(function (myJson) {
        // 收到响应后马上更新页面
        console.log(myJson)
        // 判断头部姿势
        if (myJson.head_down === '1') {
          headDataTemp.pose = '低头'
        } else if (myJson.head_down === '0') {
          headDataTemp.pose = '抬头'
        } else if (myJson.head_down === '-1') {
          headDataTemp.pose = '水平'
        } else {
          headDataTemp.pose = '未知'
        }
        // 判断身体姿势
        if (myJson.stand_up === '1') {
          bodyDataTemp.pose = '站起'
        } else if (myJson.stand_up === '0') {
          bodyDataTemp.pose = '趴下'
        } else {
          bodyDataTemp.pose = '未知'
        }
        refreshList(breathDataTemp.rows, 10, {'时间': getTime(), '呼吸深度': parseFloat(myJson.breath_a)})
        refreshList(activityDataTemp.rows, 10, {'时间': getTime(), '运动距离': parseFloat(myJson.move_distance)})
        var deviceData = myJson.data
        refreshList(tableDataTemp, 10, {x: deviceData[0][0], y: deviceData[0][1], z: deviceData[0][2]})
        refreshList(tableDataTemp, 10, {x: deviceData[1][0], y: deviceData[1][1], z: deviceData[1][2]})
        refreshList(tableDataTemp, 10, {x: deviceData[2][0], y: deviceData[2][1], z: deviceData[2][2]})
        refreshList(tableDataTemp, 10, {x: deviceData[3][0], y: deviceData[3][1], z: deviceData[3][2]})
        refreshList(tableDataTemp, 10, {x: deviceData[4][0], y: deviceData[4][1], z: deviceData[4][2]})
        bodyDataTemp.rows.pop()
        bodyDataTemp.rows.pop()
        var lieDownCnt = parseInt(myJson.lieDown)
        var standUpCnt = parseInt(myJson.standUp)
        var lieDownPercent = (Math.round(lieDownCnt / (lieDownCnt + standUpCnt) * 100) / 100).toString()
        var standUpPercent = (Math.round(standUpCnt / (lieDownCnt + standUpCnt) * 100) / 100).toString()
        bodyDataTemp.rows.push({'姿势': '趴下' + lieDownPercent + '%', '比例': lieDownCnt })
        bodyDataTemp.rows.push({'姿势': '站立 ' + standUpPercent + '%', '比例': standUpCnt})
        headDataTemp.rows.pop()
        headDataTemp.rows.pop()
        var headDownCnt = parseInt(myJson.headDown)
        var headUpCnt = parseInt(myJson.headUp)
        // var headHorizonCnt = 0
        if (headDownCnt === 0 && headUpCnt === 0) {
          // headHorizonCnt++
          headDataTemp.rows.push({'姿势': '抬头 50 %', '比例': 1})
          headDataTemp.rows.push({'姿势': '低头 50 %', '比例': 1})
        } else {
          var headDownPercent = (Math.round(headDownCnt / (headDownCnt + headUpCnt) * 100) / 100).toString()
          var headUpPercent = (Math.round(headUpCnt / (headDownCnt + headUpCnt) * 100) / 100).toString()
          // var headHorizonPercent = (Math.round(headHorizonCnt / (headDownCnt + headUpCnt) * 100) / 100).toString()
          headDataTemp.rows.push({'姿势': '抬头 ' + headUpPercent + '%', '比例': headUpCnt})
          headDataTemp.rows.push({'姿势': '低头 ' + headDownPercent + '%', '比例': headDownCnt})
          // headDataTemp.rows.push({'姿势': '水平 ' + headHorizonPercent + '%', '比例': headHorizonCnt})
        }
      })
      i = i + 1
      // refreshList(tableDataTemp, 10, {x: i.toString(), y: (i + 1).toString(), z: (i + 2).toString()})
    }, 1000)
    return {
      breathData: breathDataTemp,
      headData: headDataTemp,
      activityData: activityDataTemp,
      bodyData: bodyDataTemp,
      tableData: tableDataTemp,
      // breathData: {
      //   columns: ['时间', '呼吸深度'],
      //   rows: [
      //     {'时间': '9:11', '呼吸深度': 0.5},
      //     {'时间': '9:12', '呼吸深度': 0.4},
      //     {'时间': '9:13', '呼吸深度': 0.2},
      //     {'时间': '9:14', '呼吸深度': 0.0},
      //     {'时间': '9:15', '呼吸深度': -0.2},
      //     {'时间': '9:16', '呼吸深度': -0.4},
      //     {'时间': '9:17'}
      //   ]
      // },
      // activityData: {
      //   columns: ['时间', '运动消耗'],
      //   rows: [
      //     {'时间': '9:11', '运动消耗': 0.9},
      //     {'时间': '9:12', '运动消耗': 0.3},
      //     {'时间': '9:13', '运动消耗': 0.8},
      //     {'时间': '9:14', '运动消耗': 0.7},
      //     {'时间': '9:15', '运动消耗': 0.9},
      //     {'时间': '9:16'},
      //     {'时间': '9:17'}
      //   ]
      // },
      // headData: {
      //   columns: ['姿势', '比例'],
      //   rows: [
      //     {'姿势': '抬头', '比例': 10},
      //     {'姿势': '低头', '比例': 20}
      //   ]
      // },
      // headTimeData: {
      //   columns: ['活动', '时间'],
      //   rows: [
      //     {'活动': '低头', '时间': 4.5},
      //     {'活动': '抬头', '时间': 4.6},
      //     {'活动': '低头', '时间': 5},
      //     {'活动': '抬头', '时间': 5.7},
      //     {'活动': '低头', '时间': 6.1}
      //   ]
      // },
      // bodyData: {
      //   columns: ['姿势', '比例'],
      //   rows: [
      //     {'姿势': '站起', '比例': 10},
      //     {'姿势': '趴下', '比例': 20}
      //   ]
      // },
      // tableData: [
      // {x: '', y: '', z: ''}
      // {x: '231', y: '383', z: '21'},
      // {x: '231', y: '383', z: '21'},
      // {x: '231', y: '383', z: '21'},
      // {x: '231', y: '383', z: '21'},
      // {x: '231', y: '383', z: '21'}
      // ],
      chartExtend: {
        legend: {
          textStyle: {
            color: '#ccc'
          }
        },
        textStyle: {
          color: '#ccc'
        }
      }
    }
  },
  components: {
    VeLine,
    VePie,
    VeWaterfall
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*background: #282f3c;*/
  margin-top: 60px;
}
  .el-col {
    border-radius: 10px;
  }
  .ve-line , .ve-pie, .ve-waterfall{
    border-radius: 10px;
    background: #2e2f3f;
  }
  h1{
    color:white;
  }

  .el-table{
    width:100%;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius:10px ;
  }
</style>
