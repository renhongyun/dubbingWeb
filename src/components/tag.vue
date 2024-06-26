<template>
  <div class="wrapper">
    <div class="sort">{{ sort }}:</div>
    <div class="tags-container">
      <div
        v-for="tag in localTagList"
        :key="tag.id"
        :class="['tags', { selected: tag.selected }]"
        @click="() => onTagClick(tag.id, sort)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
  tagList: Array,
  sort: String
})

const emit = defineEmits(['tagClick'])
const localTagList = ref([...props.tagList])

watch(
  () => props.tagList,
  (newTagList) => {
    localTagList.value = [...newTagList]
  }
)

const onTagClick = (id, sort) => {
  localTagList.value = localTagList.value.map((tag) => {
    if (tag.id === id) {
      tag.selected = !tag.selected
    } else if (tag.selected) {
      tag.selected = false
    }
    return tag
  })

  emit('tagClick', {
    id,
    sort,
    selected: localTagList.value.find((tag) => tag.id === id).selected
  })
}
</script>

<style scoped>
.wrapper {
  display: flex;
  color: #fff;
  width: 90%;
  margin: 0 auto;
}
.sort {
  flex-shrink: 0;
  position: relative;
  top: 2px;
  right: 3px;
}
.tags {
  display: flex;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 10px;
  border: 1.5px solid #fff;
  padding: 1px 9px;
  margin-right: 5px;
  margin-bottom: 8px;
  flex-shrink: 0;
  cursor: pointer;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
}
.selected {
  background-color: #fff;
  color: #ffcc00;
  cursor: pointer;
}
</style>
