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

import useStudyQueueStore from '@/store/modules/studyqueue'
const queueStore = useStudyQueueStore()

// const route = useRoute()

import {
    ArrowLeft,
    ArrowRight,
    Refresh
} from '@element-plus/icons-vue'
import { reactive } from 'vue'

const weekboard = reactive({
    dayPercentage: [0, 0, 0, 0, 0, 0, 0],
    week: 0,
    day1Str: '',
    day7Str: '',
    studyDay: {}
})

const colors = [
    { color: '#E8F5E9', percentage: 10 },
    { color: '#C8E6C9', percentage: 20 },
    { color: '#A5D6A7', percentage: 40 },
    { color: '#81C784', percentage: 60 },
    { color: '#4CAF50', percentage: 80 }
]
// 点击上一周
const handleGetPrevWeek = () => {
    // console.log('上')
    weekboard.week -= 7
    initWeekData()
}
// 点击下一周
const handleGetNextvWeek = () => {
    // console.log('下')
    weekboard.week += 7
    initWeekData()
}
const getWeekData = () => {
    let data = []
    let today = new Date()
    // 获取今天星期几
    let whatDay = today.getDay()
    // whatDay = whatDay != 0 ? whatDay : 7;
    // 星期一到星期天，如果以星期天开头 循环0-6
    for (let i = 1; i < 8; i++) {
        let dayIdx = i - whatDay + weekboard.week
        // console.log('dayIdx', dayIdx)
        data.push(getWeek(dayIdx))
        if (dayIdx == 0) {
            queueStore.setToday(getWeek(dayIdx))
            let querydata = {
                'StudyDay': {
                    '@role': 'OWNER',
                    'day': getWeek(dayIdx)
                },
                '@datasource': 'hikari'
            }
            api.post('get', querydata).then(res => {
                if (res.ok === true) {
                    if (!res.StudyDay) {
                        api.post('post', {
                            'StudyDay': {
                                '@role': 'OWNER',
                                'day': getWeek(dayIdx)
                            },
                            '@datasource': 'hikari',
                            'tag': 'StudyDay'
                        }).then(res => {
                            if (res.ok === true) {
                                weekboard.studyDay = { id: res.id }
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
                    } else {
                        weekboard.studyDay = res.StudyDay
                        // console.log(weekboard.studyDay)
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
    }
    return data
}
const getWeek = day => {

    let weekName = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
    // 一天的毫秒数
    let oneday = 1000 * 60 * 60 * 24
    // 获取当前时间
    let today = new Date()
    let target_msec = today.getTime() + oneday * day
    today.setTime(target_msec)
    let tYear = today.getFullYear()
    let tMonth = today.getMonth() + 1
    let tDate = today.getDate()
    tMonth = (tMonth.toString().length == 1) ? '0' + tMonth : tMonth
    tDate = (tDate.toString().length == 1) ? '0' + tDate : tDate
    let week = weekName[today.getDay()]
    return tYear + '.' + tMonth + '.' + tDate
}

const initWeekData = () => {
    const currWeek = getWeekData()
    weekboard.day1Str = currWeek[0]
    weekboard.day7Str = currWeek[6]

    api.post('get', {
        '[]': {
            'StudyDay': {
                '@role': 'OWNER',
                'day{}': currWeek,
                '@order': 'day'
            },
            '@datasource': 'hikari'
        }
    }).then(res => {
        if (res.ok === true) {
            // console.log(res)
            let weekDatas = res['[]']
            // console.log(weekDatas)
            for (var i = 0; i < currWeek.length; i++) {
                weekboard.dayPercentage[i] =  0
                if (weekDatas) {
                    for (var j = 0; j < weekDatas.length; j++) {
                        if (weekDatas[j].StudyDay.day == currWeek[i]) {
                            let p = 100 * weekDatas[j].StudyDay.study_num / weekDatas[j].StudyDay.should_num
                            // console.log('p', p)
                            weekboard.dayPercentage[i] =  p
                            continue
                        }
                    }
                }
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
initWeekData()

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
    pageData.newNum = 0
    pageData.oldNum = 0
    let timestamp = Date.now()
    // timestamp += 30 * 60 * 1000 // 查询后续半小时以内需要学习的卡片
    // console.log(timestamp)
    let querydata = {
        '[]': {
            'StudyQueue': {
                '@role': 'OWNER',
                'should_time{}': '<=' + timestamp,
                '@order': 'study_type,id'
            },
            // 'Card': {
            //     'id@': '/StudyQueue/card_id'
            // },
            'count': 0
        },
        '@datasource': 'hikari'
    }
    api.post('get', querydata).then(res => {
        if (res.ok === true) {
            pageData.queueCards = res['[]']
            // console.log(pageData.queueCards)
            if (pageData.queueCards) {
                queueStore.setQueues(pageData.queueCards)
                for (var i = 0; i < pageData.queueCards.length; i++) {
                    if (pageData.queueCards[i].StudyQueue.study_type == 0)
                        pageData.newNum++
                    else
                        pageData.oldNum++
                }
            }
            pageData.loading = false
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
                <el-button type="default" :icon="ArrowLeft" @click="handleGetPrevWeek" />
                <el-button type="default" :style="{'width':'400px','font-size':'18px'}" disabled>{{ weekboard.day1Str }} ～ {{ weekboard.day7Str }}</el-button>
                <el-button type="default" @click="handleGetNextvWeek">
                    <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
            </el-button-group>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12" :offset="6">
            <div class="demo-progress">
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[0]" :color="colors">
                    <span class="percentage-label">周一</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[1]" :color="colors">
                    <span class="percentage-label">周二</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[2]" :color="colors">
                    <span class="percentage-label">周三</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[3]" :color="colors">
                    <span class="percentage-label">周四</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[4]" :color="colors">
                    <span class="percentage-label">周五</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[5]" :color="colors">
                    <span class="percentage-label">周六</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[6]" :color="colors">
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
                        <el-button size="mini" :icon="Refresh" circle @click="getShouldCards" />
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
                    <el-button v-show="pageData.newNum+pageData.oldNum>0" type="primary" size="large" round @click="goStudy">开 始 学 习</el-button>
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
