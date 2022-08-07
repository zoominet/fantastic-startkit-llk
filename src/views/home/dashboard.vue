<route>
{
    meta: {
        layout: 'home'
    }
}
</route>

<script setup name="dashboard">
// const { proxy } = getCurrentInstance()
const router = useRouter()
// const route = useRoute()

import {
    ArrowLeft,
    ArrowRight,
    Delete,
    Edit,
    Share
} from '@element-plus/icons-vue'

let percentage_monday = ref(30)

const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 }
]

const goStudy = () => {

    router.push({ path: '/study' })
}
</script>

<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-button-group>
                <el-button type="default" :icon="ArrowLeft" />
                <el-button type="default" :style="{'width':'400px','font-size':'18px'}" disabled>2022.08.01 ～ 2022.08.07</el-button>
                <el-button type="default">
                    <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
            </el-button-group>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12" :offset="6">
            <div class="demo-progress">
                <el-progress type="dashboard" width="65" :percentage="percentage_monday" :color="colors" status="success" />
                <el-progress type="circle" width="65" :percentage="25" status="info" />
                <el-progress type="circle" width="65" :percentage="100" status="success" />
                <el-progress type="circle" width="65" :percentage="100" status="success" />
                <el-progress type="circle" width="65" :percentage="100" status="success" />
                <el-progress type="dashboard" width="65" :percentage="70" status="error" />
                <el-progress type="circle" width="65" :percentage="50" status="exception" />
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-card class="box-card">
                <div class="text item">
                    本次学习卡片：
                </div>
                <div class="text item">
                    <el-button type="primary" size="large" round @click="goStudy">开 始 学 习</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
// scss
.el-col {
    margin-top: 50px;
}
.demo-progress .el-progress--line {
    margin-bottom: 15px;
}
.demo-progress .el-progress--circle {
    margin-right: 8px;
    margin-left: 8px;
}
</style>
