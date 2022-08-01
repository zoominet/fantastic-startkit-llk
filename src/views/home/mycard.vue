<script setup name="HomeMycard">
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()

import { Plus } from '@element-plus/icons-vue'

const formInline = reactive({
    user: '',
    region: ''
})
</script>

<template>
    <el-row>
        <el-col :span="6">
            <el-row>
                <el-col>
                    <el-button type="primary" size="large" :icon="Plus" round>新建卡片集</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :style="{height:'10px'}" />
            </el-row>
            <el-scrollbar height="600px">
                <el-row>
                    <el-col>
                        <el-card>
                            <div class="card-header">
                                <span>未分组</span>
                                <el-button class="button" text><el-icon><MoreFilled /></el-icon></el-button>
                            </div>
                            <div class="text item">卡片数量</div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-card>
                            <div class="card-header">
                                <span>小学英语</span>
                                <el-button class="button" text><el-icon><MoreFilled /></el-icon></el-button>
                            </div>
                            <div class="text item">卡片数量</div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-scrollbar>
        </el-col>
        <el-col :span="18">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
                    <el-button type="primary" @click="onSubmit">过滤</el-button>
                </el-form-item>
            </el-form>
            <el-space direction="vertical" alignment="start" :size="20">
                <el-space wrap :size="size">
                    <el-card v-for="i in 10" :key="i" class="box-card">
                        <div v-for="o in 1" :key="o" class="item">
                            {{ 'List item ' + o }}
                        </div>
                    </el-card>
                </el-space>
            </el-space>
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
.item {
    font-size: 14px;
    margin-top: 15px;
    text-align: left;
}
.box-card {
    width: 120px;
}
</style>
