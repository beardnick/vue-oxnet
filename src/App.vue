<template>
<div id="app">
   <el-row :gutter="40">
    <el-col :span="12"  >
      <h1>呼吸</h1>
      <ve-line :extend="chartExtend" :data="breathData" ></ve-line>
    </el-col>
     <el-col :span="12">
       <h1>头部姿势</h1>
       <el-row>
         <el-col :span="12">
           <ve-pie  :extend="chartExtend" :data="headData" ></ve-pie>
         </el-col>
         <el-col :span="12">
           <ve-waterfall  :extend="chartExtend" :data="timeData"></ve-waterfall>
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
            <ve-pie  :extend="chartExtend" :data="headData" ></ve-pie>
          </el-col>
          <el-col :span="12">
            <ve-waterfall  :extend="chartExtend" :data="timeData"></ve-waterfall>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <h1>运动量</h1>
            <ve-line  :extend="chartExtend" :data="breathData"></ve-line>
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
import graph from './components/chart'
export default {
  name: 'App',
  data: function () {
    return {
      breathData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
          {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
          {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
          {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
          {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
          {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
        ]
      },
      headData: {
        columns: ['日期', '访问用户'],
        rows: [
          {'日期': '1/1', '访问用户': 1393},
          {'日期': '1/2', '访问用户': 3530},
          {'日期': '1/3', '访问用户': 2923},
          {'日期': '1/4', '访问用户': 1723},
          {'日期': '1/5', '访问用户': 3792},
          {'日期': '1/6', '访问用户': 4593}
        ]
      },
      timeData: {
        columns: ['活动', '时间'],
        rows: [
          {'活动': '吃饭', '时间': 4},
          {'活动': '睡觉', '时间': 10},
          {'活动': '打豆豆', '时间': 5}
        ]
      },
      tableData: [
        {x: '231', y: '383', z: '21'},
        {x: '231', y: '383', z: '21'},
        {x: '231', y: '383', z: '21'},
        {x: '231', y: '383', z: '21'},
        {x: '231', y: '383', z: '21'},
        {x: '231', y: '383', z: '21'}
      ],
      chartExtend: {
        legend: {
          textStyle: {color: '#ccc'}
        }
      }
    }
  },
  components: {
    graph,
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
