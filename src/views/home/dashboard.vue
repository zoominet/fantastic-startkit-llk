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
import api from '@/api'
import { ElMessage } from 'element-plus'

// const route = useRoute()

import {
    ArrowLeft,
    ArrowRight,
    Delete,
    Edit,
    Share
} from '@element-plus/icons-vue'
import { reactive } from 'vue'

const percentage = reactive({
    day1: 0,
    day2: 0,
    day3: 0,
    day4: 0,
    day5: 0,
    day6: 0,
    day7: 0
})

const colors = [
    { color: '#90CAF9', percentage: 10 },
    { color: '#64B5F6', percentage: 20 },
    { color: '#42A5F5', percentage: 40 },
    { color: '#2196F3', percentage: 60 },
    { color: '#1976D2', percentage: 80 }
]

const goStudy = () => {

    router.push({ path: '/study' })
}

const pageData = reactive({
    queueCards: [],
    loading: false,
    newNum: 0,
    oldNum: 0
})

const getShouldCards = () => {
    pageData.loading = true
    let timestamp = Date.now()
    // console.log(timestamp)
    let querydata = {
        '[]': {
            'StudyQueue': {
                '@role': 'OWNER',
                'should_time{}': '<=' + timestamp
            },
            'Card': {
                'id@': '/StudyQueue/card_id'
            },
            'count': 0
        },
        '@datasource': 'hikari'
    }
    api.post('get', querydata).then(res => {
        if (res.ok === true) {
            pageData.queueCards = res['[]']
            // console.log(pageData.queueCards)
            pageData.loading = false

            for (var i = 0; i < pageData.queueCards.length; i++) {
                if (pageData.queueCards[i].StudyQueue.study_type == 0)
                    pageData.newNum++
                else
                    pageData.oldNum++
            }

        } else {
            ElMessage({
                type: 'error',
                showClose: true,
                message: res.msg
            })
        }

    }).catch(error => {
        ElMessage({
            type: 'error',
            showClose: true,
            message: error
        })
    })
}
getShouldCards()
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
                <el-progress type="circle" width="65" :percentage="percentage.day1" :color="colors">
                    <span class="percentage-label">周一</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="percentage.day2" :color="colors">
                    <span class="percentage-label">周二</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="percentage.day3" :color="colors">
                    <span class="percentage-label">周三</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="percentage.day4" :color="colors">
                    <span class="percentage-label">周四</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="percentage.day5" :color="colors">
                    <span class="percentage-label">周五</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="percentage.day6" :color="colors">
                    <span class="percentage-label">周六</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="percentage.day7" :color="colors">
                    <span class="percentage-label">周日</span>
                </el-progress>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-card v-loading="pageData.loading" shadow="always">
                <template #header>
                    <div class="card-header">
                        <span>本次学习任务</span>
                        <!-- <el-button class="button" text>Operation button</el-button> -->
                    </div>
                </template>
                <div class="study-item">
                    新卡片：{{ pageData.newNum }}
                </div>
                <div class="study-item">
                    复习卡片：{{ pageData.oldNum }}
                </div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="study-button">
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
.el-card {
    text-align: left;
}
.study-item {
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 14px;
}
.study-button {
    text-align: center;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
}
</style>
