<template>
    <div class="header">
        <div class="header-textarea">
            <el-input type="textarea" :rows="4" placeholder="请输入内容~" v-model="form.content">
            </el-input>
        </div>

        <div class="header-tool">
            <div class="time-end">
                <el-date-picker v-model="form.timeEnd" type="datetime" placeholder="计划结束时间" format="YYYY/MM/DD HH:mm:ss"
                    value-format="YYYY-MM-DD hh:mm:ss" />
            </div>
            <div class="header-tool-btn">
                <div class="header-tool-btn-item" @click="clear()">清空</div>
                <div class="header-tool-btn-item" @click="sava()">提交</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, Ref, ref } from 'vue'
import { RemarkForm, RemarkItemVo } from "../interface/remark"
import { ElMessage } from 'element-plus'
import { getNowDate } from "../utlis/moment"


const emit = defineEmits<{
    (e: 'submitRemark', data: RemarkItemVo, callback: Function): void
    (e: 'cleartableData'): void
}>()

let form = reactive<RemarkForm>({
    content: "",
    timeEnd: getNowDate(2)
})

// 保存
let sava = (): void => {


    let { content, timeEnd } = form

    if (content.trim() == "" || timeEnd.trim() == "") {
        ElMessage.error('请填写完整后发布！')
        return
    }

    let data: RemarkItemVo = {
        date: getNowDate(),
        state: 0,
        ...form
    }
    emit("submitRemark", data, (value: boolean) => {
        if (value) {
            form.content = ""
            form.timeEnd = getNowDate()
        }
    })
}

// 清空记录
let clear = (): void => {
    emit("cleartableData")
}


</script>
<style lang='less' scoped>
.header {
    position: relative;
}

.header-textarea {

    flex: none;
    min-height: 80px;
    border-bottom: 1px dashed #d7dae2;
    box-sizing: border-box;

    :deep(.el-textarea) {
        border: none;
        height: 100%;

        .el-textarea__inner {
            min-height: 80px !important;
            max-height: 150px !important;
            height: 100%;
            box-shadow: none;
        }
    }
}

.header-tool {
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d7dae2;

    .time-end {
        width: 180px;

        :deep(.el-date-editor) {
            width: 100%;
        }
    }

    .header-tool-btn {
        display: flex;

        .header-tool-btn-item {
            cursor: pointer;
            width: 80px;
            height: 25px;
            line-height: 25px;
            background: rgb(163, 163, 163);
            text-align: center;
            margin-right: 15px;
            color: rgb(255, 255, 255);
            transition: all 0.25s;
            border-radius: 3px;

            &:hover {
                box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3) inset;
            }

            &:last-child {
                margin-right: 0px;
                background: rgb(0, 170, 238);
            }
        }
    }
}
</style>