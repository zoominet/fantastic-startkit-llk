<script setup>
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

import { Search } from '@element-plus/icons-vue'

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
</script>

<template>
    <el-container>
        <el-aside width="100px" :class="{'left-link':'1'}">
            <el-row>
                <el-col :span="24">
                    <el-image style="width: 80px; height: 80px;" :src="url" :fit="fit" />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" :style="{height:'50px'}" />
            </el-row>
            <el-row>
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
            </el-row>
        </el-aside>
        <el-container>
            <el-header height="60px">
                <el-row :style="{'margin-top':'1px;'}">
                    <el-col :span="6" :offset="9">
                        <el-input
                            v-model="homeVar.gSearchValue"
                            placeholder="搜索卡片"
                            class="input-with-select"
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
    background-color: #ecf0f1;
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

</style>
