<template>
  <div class="wrapper" :class="{ 'mobile-view': isMobileView }">
    <div class="home">
      <HomeHeader />
      <banner></banner>
      <div class="box">
        <div class="wx" @click="copyWx">
          <img src="@/assets/img/wxicon.png" class="wxicon" />
          <span>{{ wxNumber }}</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories, getCategoriesAll } from '@/services/modules/home'
import banner from '@/components/banner.vue'
import { ElMessage } from 'element-plus'
import HomeHeader from '@/components/HomeHeader.vue'

const categoryList = ref([])
const categoryTags = ref([])
const router = useRouter()
const wxNumber = ref('111111') // 设置默认的微信号
const isMobileView = ref(false)

const fetchCategories = async () => {
  const res = await getCategories()
  categoryList.value = res?.data
}

const fetchCategoriesAll = async () => {
  const res = await getCategoriesAll()
  categoryTags.value = res?.data
  console.log('分类列表', categoryTags.value)
}

const navigateToAudioList = (id) => {
  router.push({ path: `/audiolist`, query: { id } })
}

const navigateToDetailTag = (categoryId, type, tagId) => {
  router.push({ path: `/detail-tag`, query: { categoryId, type, tagId } })
}

const copyWx = async () => {
  try {
    await navigator.clipboard.writeText(wxNumber.value)
    ElMessage.success('微信号复制成功！')
  } catch (err) {
    console.error('无法复制到剪贴板:', err)
  }
}

const checkMobileView = () => {
  const isMobile = window.innerWidth <= 768 || window.innerWidth < window.innerHeight
  isMobileView.value = isMobile
}

onMounted(() => {
  fetchCategories()
  fetchCategoriesAll()
  checkMobileView()
  window.addEventListener('resize', checkMobileView)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobileView)
})
</script>

<style scoped>
.wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#fadb18, #f28b0e);
}

.wrapper.mobile-view {
  background-color: #fff;
}

.home {
  /* background-color: #f7f6fb; */
  /* background: linear-gradient(#fadb18, #f28b0e); */
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh);
  box-sizing: border-box;
  padding-bottom: 20px;
  width: 430px;
  margin: 0 auto;
  background-color: #fff;
  /* margin-top: 20px; */
  box-sizing: border-box;
}
.box {
  padding: 0 30px;
  flex: 1;
  /* display: flex; */
  /* justify-content: center; */
}
.cover-box {
  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
  flex-wrap: nowrap;
  padding: 0 5px;
  width: 330px;
  margin: 0 auto;
}
.image-box {
  overflow: hidden;
  border-radius: 7.5px;
  height: 135px;
  /* width: 42%; */
  width: 135px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* margin-right: 40px; */
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
  margin-top: 2vh;
  background-color: #fff;
  text-align: center;
  line-height: 33px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.tag-container {
  width: 310px;
  margin: 0 auto;
  margin-top: 1.2vh;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  /* justify-content: center; */
}
.wx {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  /* padding: 1.4vh 0; */
  padding-bottom: 1.2vh;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
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

.tip {
  font-size: 12px;
  color: #888;
}
.bar-box {
  /* margin-right: 40px; */
}
</style>
