<script setup>
const url =
    'https://linkard.oss-cn-beijing.aliyuncs.com/img/401660148927_.pic.jpg'

import {
    Flag,
    CirclePlusFilled,
    Tools,
    Search, Menu
} from '@element-plus/icons-vue'

const router = useRouter()
// const route = useRoute()

const mainHeight = () => {
    return (window.innerHeight - 60) + 'px'
}

const homeVar = reactive({
    gSearchValue: ''
})

const searchAction = () => {
    router.push({ path: '/home/search-result' })
}
const profileItemMargin = () => {
    return (window.innerHeight - 500) + 'px'
}

</script>

<template>
    <el-container>
        <el-aside width="100px" :class="{'left-link':'1'}">
            <el-row>
                <el-col :span="24">
                    <el-image style="width: 60px; height: 60px;" :src="url" :fit="fit" />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" :style="{height:'50px'}" />
            </el-row>

            <el-menu
                default-active="1"
                mode="vertical"
                router="true"
                :collapse="false"
            >
                <el-menu-item index="1" route="/home/dashboard">
                    <el-icon><Flag /></el-icon>
                    <template #title>学习</template>
                </el-menu-item>
                <el-menu-item index="2" route="/home/newcard">
                    <el-icon><CirclePlusFilled /></el-icon>
                    <template #title>创建</template>
                </el-menu-item>
                <el-menu-item index="3" route="/home/mycard">
                    <el-icon><Menu /></el-icon>
                    <template #title>浏览</template>
                </el-menu-item>
                <el-menu-item index="4" route="/home/profile" :style="{'margin-top':profileItemMargin()}">
                    <el-icon><Tools /></el-icon>
                    <template #title>设置</template>
                </el-menu-item>
            </el-menu>

            <!-- <el-row>
                <el-col :span="24">
                    <RouterLink to="/home/newcard"><el-icon><CirclePlusFilled /></el-icon></RouterLink>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" :style="{height:'50px'}" />
            </el-row>
            <el-row>
                <el-col :span="24">
                    <RouterLink to="/home/dashboard">首页</RouterLink>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <RouterLink to="/home/mycard">卡片</RouterLink>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" :style="{height:'50px'}" />
            </el-row>
            <el-row>
                <el-col :span="24">
                    <RouterLink to="/home/profile"><el-icon><Setting /></el-icon></RouterLink>
                </el-col>
            </el-row> -->
        </el-aside>
        <el-container>
            <el-header height="60px">
                <el-row :style="{'margin-top':'1px;'}">
                    <el-col :span="6" :offset="9">
                        <el-input
                            v-model="homeVar.gSearchValue"
                            placeholder="搜索卡片"
                            class="input-with-select"
                            @keydown.enter="searchAction"
                        >
                            <template #append>
                                <el-button :icon="Search" @click="searchAction" />
                            </template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-header>
            <el-main :style="{height: mainHeight()}"><RouterView /></el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss">
body {
    background-color: #fff;
}
.el-row {
    margin: 10px;
    text-align: center;
    // font-size: 30px;
}
.el-col {
    border-radius: 4px;
}
.left-link {
    font-size: 25px;
}
.el-aside {
    background-color: #fafafa;
    border-right: 1px solid #d9dfe8;
    margin-top: -8px;
    margin-left: -8px;
    margin-bottom: -16px;
}
.el-header {
    border-bottom: 1px solid #d9dfe8;
    margin-top: -8px;
    margin-right: -8px;
}
.el-main {
    margin-bottom: -16px;
    margin-right: -8px;
    overflow: hidden;

    --el-main-padding: 0;
}
.el-menu {
    --el-menu-bg-color: #fafafa;
    --el-menu-hover-bg-color: var(--el-color-primary-light-9);
}
.el-menu-item {
    // width: 200px;
    // min-height: 400px;
    font-size: 18px;
    margin-top: 30px;
}
</style>
