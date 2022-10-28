<template>
    <div class="home">
        <Header @submitRemark="submitRemark" @cleartableData="cleartableData"></Header>
        <Content :tableDataSort="tableDataSort" @changeState="changeState"></Content>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { reactive, watch } from "vue";
import Header from "../components/Header.vue"
import Content from "../components/Content.vue"
import { RemarkItemVo, ChangeStateVo } from "../interface/remark"
import { getNowDate } from "../utlis/moment"

let tableData: Array<RemarkItemVo> = reactive(localStorage.getItem("RemarkData") ? JSON.parse(localStorage.getItem("RemarkData") || "[]") : []);


// 按状态排序
let tableDataSort = computed<RemarkItemVo[]>(() => {
    return tableData.sort((a, b) => {
        return a.state - b.state
    })
})

// 提交内容
let submitRemark = (remark: RemarkItemVo, callback: Function) => {
    tableData.push(remark)
    callback(true)
}

// 改变状态
let changeState = (data: ChangeStateVo): void => {
    tableDataSort.value[data.key].state = data.state
    tableDataSort.value[data.key].date = getNowDate()
}


// 监听 RemarkData 变化 ，储存 => localStorage
watch(tableDataSort.value, (value) => {
    localStorage.setItem("RemarkData", JSON.stringify(value))
})


// 清空列表
let cleartableData = () => {
    tableData.splice(0)
}

</script>
<style lang="less" scoped>
.home {
    position: relative;
    width: 600px;
    height: 820px;
    background: #fff;
    margin: 50px auto 0 auto;
    border: 1px solid #d7dae2;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 6px 8px 5px 1px rgb(190, 190, 190);
    display: flex;
    flex-direction: column;
}
</style>