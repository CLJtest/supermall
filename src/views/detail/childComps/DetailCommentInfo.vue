<!--  -->
<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <!-- 标题处 -->
    <div class="info-heard">
      <span class="head-title">用户评价</span>
      <span class="head-more">更多</span>
    </div>
    <!-- 评论用户信息处 -->
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <!-- 评论详细内容处 -->
    <div class="info-detail">
      <!-- 评论的文字 -->
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <!-- 评论的日期 时间-->
        <span class="data">{{ commentInfo.created }}</span>
        <!-- 评论的样式 -->
        <span>{{ commentInfo.style }}</span>
      </div>
    </div>

    <!-- 评论的图片 -->
    <div class="info-imgs">
      <img :src="item" v-for="item in commentInfo.images" :key="item" alt="" />
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    components: {
      formatDate,
    },
  },
  data() {
    return {};
  },
};
</script>

<style  scoped>
.comment-info {
  padding: 5px 12px;
  /* margin: 0 10px; */
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-heard {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.head-title {
  float: left;
  font-size: 15px;
}
.head-more {
  float: right;
  font-size: 13px;
  margin-right: 10px;
}
.info-user {
  padding: 10px 5px 5px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
  /* 上0 左右5 下15 */
  /* padding: 0 5px 5px 5px; */
  padding: 0 5px 5px;
}
.info-detail p {
  font-size: 13px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .data {
  margin-right: 8px;
}
.info-imgs {
  margin-top: 5px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-left: 5px;
}
</style>
