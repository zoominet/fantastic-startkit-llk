<route>
{
    meta: {
        layout: false,
        title: '找不到页面'
    }
}
</route>

<template>
    <el-main>
        <el-empty description="404" />
        <div class="desc">抱歉，你访问的页面不存在</div>
        <el-button type="primary" @click="goBack">{{ data.countdown }} 秒后，返回首页</el-button>
    </el-main>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router'
const router = useRouter()

const data = ref({
    inter: null,
    countdown: 5
})

onBeforeRouteLeave(() => {
    clearInterval(data.value.inter)
})

onMounted(() => {
    data.value.inter = setInterval(() => {
        data.value.countdown--
        if (data.value.countdown == 0) {
            clearInterval(data.value.inter)
            goBack()
        }
    }, 1000)
})

function goBack() {
    router.push('/')
}
</script>

<style scoped>
.el-main {
    text-align: center;
}
.desc {
    margin: 30px;
}
</style>
