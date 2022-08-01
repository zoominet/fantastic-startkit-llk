<script setup>
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

import { Search } from '@element-plus/icons-vue'

</script>

<template>
    <div class="common-layout">
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
                        <RouterLink to="/home/dashboard"><el-icon><CirclePlusFilled /></el-icon></RouterLink>
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
                        <RouterLink to="/home/dashboard"><el-icon><Setting /></el-icon></RouterLink>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header height="60px">
                    <el-row :style="{'margin-top':'1px;'}">
                        <el-col :span="9" :offset="6">
                            <el-input
                                v-model="input3"
                                placeholder="搜索卡片"
                                class="input-with-select"
                            >
                                <template #append>
                                    <el-button :icon="Search" />
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main><RouterView /></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss">
.el-row {
    margin: 10px;
    text-align: center;
    // font-size: 30px;
}
.left-link {
    font-size: 30px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.el-main {
    background-color: rgb(245 240 240);
}
</style>
