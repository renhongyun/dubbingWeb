<template>
  <div class="home">
    <banner></banner>
    <div class="box">
      <div class="wx">
        <img src="@/assets/img/wxicon.png" class="wxicon" />
        <span>wx:111111</span>
        <span class="tip">（长按复制）</span>
      </div>
      <div class="cover-box">
        <div
          v-for="item in categoryList"
          :key="item.id"
          class="image-box"
          @click="navigateToAudioList(item.id)"
        >
          <img :src="item.img" class="cover" />
          <div class="title">{{ item.name }}</div>
          <div class="play">
            <img src="@/assets/img/play1.png" class="play-icon" />
          </div>
        </div>
      </div>
      <div class="tag-container">
        <div v-for="category in categoryTags" :key="category.id" class="bar-box">
          <div
            v-for="tag in category.tags"
            :key="tag.id"
            class="bar"
            @click="navigateToDetailTag(category.id, tag.type, tag.id)"
          >
            {{ tag.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories, getCategoriesAll } from '@/services/modules/home'
import banner from '@/components/banner.vue'

const categoryList = ref([])
const categoryTags = ref([])
const router = useRouter()

const fetchCategories = async () => {
  const res = await getCategories()
  categoryList.value = res.data
}

const fetchCategoriesAll = async () => {
  const res = await getCategoriesAll()
  categoryTags.value = res.data
  console.log('分类列表', categoryTags.value)
}

const navigateToAudioList = (id) => {
  router.push({ path: `/audiolist`, query: { id } })
}

const navigateToDetailTag = (categoryId, type, tagId) => {
  router.push({ path: `/detail-tag`, query: { categoryId, type, tagId } })
}

onMounted(() => {
  fetchCategories()
  fetchCategoriesAll()
})
</script>

<style scoped>
.home {
  background-color: #f7f6fb;
}
.box {
  padding: 0 30px;
}
.cover-box {
  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
  flex-wrap: nowrap;
  padding: 0 5px;
}
.image-box {
  overflow: hidden;
  border-radius: 7.5px;
  height: 135px;
  /* width: 42%; */
  width: 135px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.cover {
  width: 100%;
  height: 135px;
  cursor: pointer;
}
.title {
  position: absolute;
  left: 8px;
  bottom: 8px;
  color: #fff;
  width: 42px;
  font-size: 16px;
  letter-spacing: 4px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.play {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
.play-icon {
  width: 22px;
  height: 22px;
}
.bar {
  width: 120px;
  height: 33px;
  border-radius: 7.5px;
  margin-top: 15px;
  background-color: #fff;
  text-align: center;
  line-height: 33px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.tag-container {
  margin: 0 auto;
  margin-top: 12px;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
}
.wx {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 14px 0;
}
.wxicon {
  width: 24px;
  height: 24px;
  margin-right: 9px;
}
.tip {
  font-size: 11px;
  color: #a2a2a2;
}
</style>
