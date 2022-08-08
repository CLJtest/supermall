<!--  -->
<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <!-- 这里是遍历出一个表格出来 先v-for循环paramInfo.sizes里有几个table数组就创建几个表格
    然后tr是行 去遍历table每个数组里面有几个数组 有几个就是几行 比如table第一个数组是Array7 就会创建7行
    然后是td列 去遍历tr这个数组里面每个数组里有几个数据 几个数据就创建几列
     -->
    <table
      v-for="(table, index) in paramInfo.sizes"
      :key="index"
      class="info-sizes"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr v-for="(info, indek) in paramInfo.infos" :key="indek">
        <td class="info-param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <!-- 判断有没有值 没有值不用渲染这个东西 -->
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style  scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table {
  width: 100%;
  /* 表示表格的两边框合并为一条。 */
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  width: 80px;
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.param-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
</style>
