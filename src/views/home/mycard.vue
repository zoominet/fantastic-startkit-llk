<script setup name="HomeMycard">
// const { proxy } = getCurrentInstance()
const router = useRouter()
// const route = useRoute()

import { Plus } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const formInline = reactive({
    user: '',
    region: ''
})
const newSetForm = reactive({
    setname: '',
    isDisplay: false
})

const showNewSetForm = () => {
    newSetForm.isDisplay = !newSetForm.isDisplay
}

const scrollerHeight = left => {
    if (left)
        return (window.innerHeight - 80) + 'px'
    else
        return (window.innerHeight - 142) + 'px'
}
const goNewCard = () => {
    router.push({ path: '/home/newcard' })
}
</script>

<template>
    <el-row>
        <el-col :span="6" :style="{height:scrollerHeight(true)}">
            <el-scrollbar>
                <el-row>
                    <el-col>
                        <el-button type="primary" size="large" :icon="Plus" round @click="showNewSetForm">新建卡片组</el-button>
                    </el-col>
                </el-row>
                <el-row v-show="newSetForm.isDisplay">
                    <el-col>
                        <el-form :inline="true" size="mini" :model="newSetForm">
                            <el-form-item label="">
                                <el-input v-model="newSetForm.setname" :class="{'setname':1}" placeholder="输入卡片组名称" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">新增</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-card>
                            <div class="card-header">
                                <span>默认组</span>
                                <el-button class="button" text><el-icon><MoreFilled /></el-icon></el-button>
                            </div>
                            <div :inline="true" class="set-item"><el-icon><CopyDocument /></el-icon> 13 张</div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row v-for="i in 10" :key="i">
                    <el-col>
                        <el-card>
                            <div class="card-header">
                                <span>小学英语</span>
                                <el-button class="button" text><el-icon><MoreFilled /></el-icon></el-button>
                            </div>
                            <div :inline="true" class="set-item"><el-icon><CopyDocument /></el-icon> 13 张</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </el-col>
        <el-col :span="18">
            <el-row>
                <el-col>
                    <el-form :inline="true" size="mini" :model="formInline">
                        <el-form-item label="Approved by">
                            <el-input v-model="formInline.user" placeholder="Approved by" />
                        </el-form-item>
                        <el-form-item label="Activity zone">
                            <el-select v-model="formInline.region" placeholder="Activity zone">
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="onSubmit">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row :style="{'margin-top':'18px'}">
                <el-col>
                    <el-scrollbar :style="{height:scrollerHeight(false)}">
                        <el-space direction="horizontal" alignment="start">
                            <el-space wrap>
                                <el-card class="new-card" :style="{boxShadow: `var(--el-box-shadow-light)`}" @click="goNewCard">
                                    <div class="new-item">
                                        <p />
                                        <el-icon class="new-button"><Plus /></el-icon>
                                        <p>新卡片</p>
                                    </div>
                                </el-card>
                                <el-card v-for="i in 100" :key="i" class="box-card">
                                    <div v-for="o in 1" :key="o" class="card-item">
                                        {{ '中文中文文' + o }}
                                    </div>
                                </el-card>
                            </el-space>
                        </el-space>
                    </el-scrollbar>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}
.set-item {
    font-size: 16px;
    margin-top: 10px;
    text-align: left;
}
.card-item {
    font-size: 14px;
    // margin-top: 10px;
    text-align: left;
}
.box-card {
    width: 130px;
    height: 160px;
}
.new-card {
    width: 130px;
    height: 160px;
    background-color: #f9fbe7;
}
.setname {
    width: 150px;
}
.el-form--inline .el-form-item {
    margin-right: 15px;
    margin-bottom: 0;
}
.new-item {
    text-align: center;
}
.new-button {
    font-size: 26px;
}
</style>
