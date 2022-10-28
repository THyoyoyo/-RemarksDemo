<template>
  <div class="content">
    <div class="remark">
      <div class="remark-item" v-for="(item, key) in tableDataSort " :key="key">
        <div class="remark-item-content">{{ item.content }}</div>
        <div class="remark-item-other">
          <div class="remark-item-other-date">
            <p v-if="item.state == 0"> 添加时间：{{ item.date }}</p>
            <p v-if="item.state == 1"> 开始时间：{{ item.date }}</p>
            <p v-if="item.state == 2"> 完成时间：{{ item.date }}</p>
            <p v-if="item.state != 3"> 截止时间：{{ item.timeEnd }}</p>
          </div>
          <div class="remark-item-other-state">
            <p v-if="item.state == 0">等待开始</p>
            <p v-if="item.state == 1">进行中 </p>
            <p v-if="item.state == 2">已完成 </p>
            <p v-if="item.state == 3">已放弃 </p>
          </div>
          <div class="remark-item-other-btn" v-if="item.state != 2 && item.state != 3">
            <div class="remark-item-other-btn-item"  @click="setState({state:3,key })">放弃</div>
            <div class="remark-item-other-btn-item btn-start" v-if="item.state == 0" @click="setState({state:1,key })">开始</div>
            <div class="remark-item-other-btn-item btn-succeed" v-if="item.state == 1" @click="setState({state:2,key })">完成</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { reactive, toRefs, ref } from "vue";
import { RemarkItemVo, ChangeStateVo } from "../interface/remark"

const props = defineProps<{
  tableDataSort: Array<RemarkItemVo>
}>()

const emit = defineEmits<{
  (e: "changeState", data: ChangeStateVo): void
}>()


let setState = (val: ChangeStateVo) => {
  emit("changeState", val)
}
</script>
<style lang='less' scoped>
.content {
  flex: 1;
  overflow-y: scroll;
  margin-top: 10px;

  .remark {
    margin: 10px 0;
    padding: 10px;

    .remark-item {
      padding: 10px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      margin-top: 15px;

      &:first-child {
        margin-top: 0;
      }

      .remark-item-content {}

      .remark-item-other {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;

        .remark-item-other-date {
          flex: none;
          width: 180px;
          color: #b9b9b9;
          font-size: 12px;

        }

        .remark-item-other-state {
          width: 80px;
          text-align: center;
        }

        .remark-item-other-btn {

          display: flex;
          justify-content: flex-end;

          .remark-item-other-btn-item {
            cursor: pointer;
            width: 80px;
            height: 25px;
            line-height: 25px;
            background: rgb(163, 163, 163);
            text-align: center;
            margin-right: 15px;
            color: #fff;
            transition: all 0.25s;
            border-radius: 3px;

            &:hover {
              box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3) inset;
            }

            &:last-child {
              margin-right: 0px;
            }
          }

          .btn-start {
            background: rgb(72, 190, 36);
          }

          .btn-succeed {
            background: rgb(212, 195, 39);
          }
        }
      }
    }
  }
}
</style>