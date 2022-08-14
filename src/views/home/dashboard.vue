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
    weekStr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    week: 0,
    day1Str: '',
    day7Str: '',
    studyDay: {}
})

const colors = [
    { color: '#A5D6A7', percentage: 30 },
    { color: '#81C784', percentage: 60 },
    { color: '#4CAF50', percentage: 90 }
]

const pageData = reactive({
    queueCards: [],
    loading: false,
    newNum: 0,
    oldNum: 0
})

const dayboard = reactive({
    cycleday: [0, 0, 0, 0, 0, 0, 0, 0],
    cycleElse: 0,
    shouldNum: 0,
    studyNum: 0
})
const getShouldCards = () => {
    pageData.loading = true
    pageData.newNum = 0
    pageData.oldNum = 0
    pageData.queueCards = []
    dayboard.shouldNum = 0
    dayboard.cycleday = [0, 0, 0, 0, 0, 0, 0, 0]
    let timestamp = Date.now()
    // timestamp += 30 * 60 * 1000 // 查询后续半小时以内需要学习的卡片
    // console.log(timestamp)
    let querydata = {
        '[]': {
            'StudyQueue': {
                '@role': 'OWNER',
                // 'should_time{}': '<=' + timestamp,
                '@order': 'id'
            },
            // 'Card': {
            //     'id@': '/StudyQueue/card_id'
            // },
            'count': 0
        },
        '@datasource': 'hikari'
    }
    api.post('get', querydata).then(res => {

        // console.log(res)
        if (res.ok === true) {
            if (res['[]']) {
                let allQueueCards = res['[]']
                for (var i = 0; i < allQueueCards.length; i++) {
                    if (allQueueCards[i].StudyQueue.should_time <= timestamp) {
                        pageData.queueCards[pageData.queueCards.length] = allQueueCards[i]
                    }
                    switch (allQueueCards[i].StudyQueue.study_cycle) {
                        case 0:
                            dayboard.cycleday[0]++
                            break
                        case 1:
                            dayboard.cycleday[1]++
                            break
                        case 2:
                            dayboard.cycleday[2]++
                            break
                        case 3:
                            dayboard.cycleday[3]++
                            break
                        case 4:
                            dayboard.cycleday[4]++
                            break
                        case 5:
                            dayboard.cycleday[5]++
                            break
                        case 6:
                            dayboard.cycleday[6]++
                            break
                        case 7:
                            dayboard.cycleday[7]++
                            break
                        default:
                            dayboard.cycleElse++
                            break
                    }
                    // 计算今天的应该学习总量
                    dayboard.shouldNum = dayboard.cycleday[0] * 4 + dayboard.cycleday[1] * 3 + dayboard.cycleday[2] * 2 + dayboard.cycleday[3] + dayboard.cycleday[4] + dayboard.cycleday[5] + dayboard.cycleday[6] + dayboard.cycleday[7] + dayboard.cycleElse
                }
                initWeekData()

                // pageData.queueCards = res['[]']
                // console.log(pageData.queueCards)
                queueStore.setQueues(pageData.queueCards)
                for (var j = 0; j < pageData.queueCards.length; j++) {
                    if (pageData.queueCards[j].StudyQueue.study_type == 0)
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
    // console.log('whatDay', whatDay, weekboard.week)
    whatDay = whatDay != 0 ? whatDay : 7
    // 星期一到星期天，如果以星期天开头 循环0-6
    for (let i = 1; i < 8; i++) {
        let dayIdx = i - whatDay + weekboard.week
        console.log('dayIdx', dayIdx)
        let weeekRes = getWeek(dayIdx).split('|')
        data.push(weeekRes[0])
        weekboard.weekStr[i - 1] = weeekRes[1]
        if (dayIdx == 0) {
            queueStore.setToday(weeekRes[0])
            weekboard.weekStr[i - 1] = '<font color=red>' + weeekRes[1] + '</font>'

            // 查询已经学了多少张卡片
            api.post('get', {
                '[]': {
                    'StudyRecord': {
                        '@role': 'OWNER',
                        'study_day': weeekRes[0]
                    },
                    'query': 1
                },
                'total@': '/[]/total',
                '@datasource': 'hikari'
            }).then(res => {
                if (res.ok === true) {
                    dayboard.studyNum = res.total

                    let querydata = {
                        'StudyDay': {
                            '@role': 'OWNER',
                            'day': weeekRes[0]
                        },
                        '@datasource': 'hikari'
                    }
                    api.post('get', querydata).then(res => {

                        if (res.ok === true) {
                            if (!res.StudyDay) {
                                api.post('post', {
                                    'StudyDay': {
                                        '@role': 'OWNER',
                                        'day': weeekRes[0],
                                        'should_num': dayboard.shouldNum + dayboard.studyNum,
                                        'study_num': dayboard.studyNum
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
                                api.post('put', {
                                    'StudyDay': {
                                        'id': weekboard.studyDay.id,
                                        'should_num': dayboard.shouldNum + dayboard.studyNum,
                                        'study_num': dayboard.studyNum
                                    },
                                    '@datasource': 'hikari',
                                    'tag': 'StudyDay'
                                }).then(res => {
                                    if (res.ok === true) {
                                        //
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

    let weekName = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六')
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
    return tYear + '.' + tMonth + '.' + tDate + '|' + week
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

getShouldCards()

const goStudy = () => {

    router.push({ path: '/study' })
}

</script>

<template>
    <el-row>
        <el-col :sm="2" :md="4" :lg="6" />
        <el-col :sm="20" :md="16" :lg="12">
            <el-button-group>
                <el-button type="default" :icon="ArrowLeft" @click="handleGetPrevWeek" />
                <el-button type="default" :style="{'width':'400px','font-size':'18px'}" disabled>{{ weekboard.day1Str }} ～ {{ weekboard.day7Str }}</el-button>
                <el-button type="default" @click="handleGetNextvWeek">
                    <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
            </el-button-group>
        </el-col>
        <el-col :sm="2" :md="4" :lg="6" />
    </el-row>
    <el-row>
        <el-col :sm="2" :md="4" :lg="6" />
        <el-col :sm="20" :md="16" :lg="12">
            <div class="demo-progress">
                <el-progress v-for="i in 7" :key="i" type="circle" width="65" :percentage="weekboard.dayPercentage[i-1]" :color="colors">
                    <span class="percentage-label" v-html="weekboard.weekStr[i-1]" />
                </el-progress>
                <!-- <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[1]" :color="colors">
                    <span class="percentage-label">{{ weekboard.weekStr[1] }}</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[2]" :color="colors">
                    <span class="percentage-label">{{ weekboard.weekStr[2] }}</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[3]" :color="colors">
                    <span class="percentage-label">{{ weekboard.weekStr[3] }}</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[4]" :color="colors">
                    <span class="percentage-label">{{ weekboard.weekStr[4] }}</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[5]" :color="colors">
                    <span class="percentage-label">{{ weekboard.weekStr[5] }}</span>
                </el-progress>
                <el-progress type="circle" width="65" :percentage="weekboard.dayPercentage[6]" :color="colors">
                    <span class="percentage-label">{{ weekboard.weekStr[6] }}</span>
                </el-progress> -->
            </div>
        </el-col>
        <el-col :sm="2" :md="4" :lg="6" />
    </el-row>
    <el-row>
        <el-col :sm="2" :md="4" :lg="6" />
        <el-col :sm="20" :md="16" :lg="12">
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
        <el-col :sm="2" :md="4" :lg="6" />
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
    margin-right: 5px;
    margin-left: 5px;
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
