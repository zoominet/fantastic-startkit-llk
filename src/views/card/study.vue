<script setup name="CardNewcard">
// const { proxy } = getCurrentInstance()
const router = useRouter()
// const route = useRoute()

import { ArrowLeft } from '@element-plus/icons-vue'

const goBack = () => {
    router.go(-1)
}
</script>

<template>
    <el-page-header :icon="ArrowLeft" title="" content="学习" @back="goBack" />
</template>

<style lang="scss" scoped>
// scss
</style>
