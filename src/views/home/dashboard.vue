<route>
{
    meta: {
        layout: 'home'
    }
}
</route>

<script setup name="dashboard">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
</script>

<template>
    <el-row>
        <el-col :span="10" :offset="7">
            <div class="dashboard">
                页面内容区域dashboard
                <RouterLink to="/study">开始学习</RouterLink>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
// scss
.dashboard {
    padding-top: 50px;
}
</style>
