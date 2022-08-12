<script setup>
// const { proxy } = getCurrentInstance()
const router = useRouter()
// const route = useRoute()
import api from '@/api'
import { ElMessage } from 'element-plus'

import { ArrowLeft } from '@element-plus/icons-vue'
import moment from 'moment'

import useStudyQueueStore from '@/store/modules/studyqueue'
const queueStore = useStudyQueueStore()

const goBack = () => {
    router.go(-1)
}

const pageData = reactive({
    studyQ: queueStore.getQueues(),
    frontContent: '',
    backContent: '',
    loading: false,
    lookAnswer: false,
    studyCompleted: false,
    studyPercentage: 0,
    studyCount: 0,
    backColor: 'linear-gradient(#B3E5FC, #E8F5E9)'
})

const queueCount = computed(() => queueStore.queueCount)

// console.log(queueStore.queueCount())

const timeCounter = reactive({
    beginTime: moment().format('X'),
    endTime: 0,
    seconds: 0,
    strTime: '',
    timer: null
})

const contentHeight = () => {
    return (window.innerHeight - 215) + 'px'
}

const lookQuestionAction = () => {
    pageData.loading = true
    pageData.lookAnswer = false
    pageData.backColor = 'linear-gradient(#B3E5FC, #E8F5E9)'

    let cardid = queueStore.getCardId()
    // console.log('b', cardid)

    if (cardid != 0) {
        let querydata = {
            'Card': {
                'id': cardid
            },
            '@datasource': 'hikari'
        }
        api.post('get', querydata).then(res => {
            if (res.ok === true) {
                pageData.frontContent = res['Card'].front_content
                pageData.backContent = res['Card'].back_content
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
    } else {
        ElMessage({
            type: 'success',
            showClose: true,
            message: '已经完成本次学习！'
        })
        pageData.frontContent = ''
        pageData.backContent = ''
        pageData.loading = false
        pageData.studyCompleted = true
    }
}

const lookAnswerAction = () => {
    pageData.lookAnswer = true
    pageData.backColor = ''

}

const getCurrentDatetime = () => {
    const date = new Date(+new Date() + 8 * 3600 * 1000)
    const str = date.toISOString().slice(0, 19).replace('T', ' ')
    // console.log('ctime', str)
    return str
}

const labelAndNextAction = mLabel => {
    // console.log(mLabel)
    pageData.loading = true
    pageData.lookAnswer = false
    timeCounter.endTime = moment().format('X')
    sessionDuration(false)

    let currentSQueue = queueStore.getStudyQueue()
    let currentTime = Date.now()
    let shouldTime = currentTime + 5 * 60 * 1000
    if (mLabel == 1 || mLabel == 2) {
        queueStore.addQueue(currentSQueue)
    }

    // 设置学习标签
    let querydata = {
        'StudyQueue': {
            'id': currentSQueue.id,
            'should_time': shouldTime,
            'study_first_time': getCurrentDatetime(),
            'update_time': getCurrentDatetime(),
            'update_by': currentSQueue.userId,
            'study_type': 1,
            'study_cycle': 1
        },
        'tag': 'StudyQueue',
        '@datasource': 'hikari'
    }
    // 8轮复习
    if (currentSQueue.study_type == 1) {
        switch (currentSQueue.study_cycle) {
            case 1:
                shouldTime = currentTime + 25 * 60 * 1000 // 30分钟
                break
            case 2:
                shouldTime = currentTime + 9.5 * 60 * 60 * 1000 // 10小时
                break
            case 3:
                shouldTime = currentTime + 14 * 60 * 60 * 1000 // 1天
                break
            case 4:
                shouldTime = currentTime + 38 * 60 * 60 * 1000 // 2天
                break
            case 5:
                shouldTime = currentTime + 86 * 60 * 60 * 1000 // 4天
                break
            case 6:
                shouldTime = currentTime + 158 * 60 * 60 * 1000 // 7天
                break
            case 7:
                shouldTime = currentTime + 350 * 60 * 60 * 1000 // 15天
                break
            default:
                shouldTime = currentTime + 30 * 24 * 60 * 60 * 1000 // 1个月
                break
        }

        querydata = {
            'StudyQueue': {
                'id': currentSQueue.id,
                'should_time': shouldTime,
                'study_last_time': getCurrentDatetime(),
                'update_time': getCurrentDatetime(),
                'update_by': currentSQueue.userId,
                'study_cycle': currentSQueue.study_cycle + 1
            },
            'tag': 'StudyQueue',
            '@datasource': 'hikari'
        }
    }
    api.post('put', querydata).then(res => {
        if (res.ok === true) {
            let recorddata = {
                'StudyRecord': {
                    'queue_id': currentSQueue.id,
                    'study_time': getCurrentDatetime(),
                    'create_time': getCurrentDatetime(),
                    'create_by': currentSQueue.userId,
                    'key_score': mLabel,
                    'seconds': timeCounter.seconds,
                    'study_cycle': currentSQueue.study_type == 1 ? currentSQueue.study_cycle + 1 : 1,
                    '@role': 'OWNER'
                },
                'tag': 'StudyRecord',
                '@datasource': 'hikari'
            }
            api.post('post', recorddata).then(res => {
                if (res.ok === true) {
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

    pageData.studyCount++
    // console.log('studyCount', pageData.studyCount)
    // console.log('queueCount', queueCount.value)

    pageData.studyPercentage = 100 * pageData.studyCount / queueCount.value
    // console.log('studyPercentage', pageData.studyPercentage)

    lookQuestionAction()
    timeCounter.beginTime = moment().format('X')
    sessionDuration(true)
}

document.onkeydown = function() {
    let key = window.event.keyCode
    if (pageData.studyCompleted == false && pageData.loading == false) {
        if (pageData.lookAnswer == false) {
            if (key == 32 || key == 13) {
                lookAnswerAction()
            } else {
            // nothing
            }
        } else {
            if (key == 32 || key == 13 || key == 51) {
                labelAndNextAction(3)
            } else if (key == 49) {
                labelAndNextAction(1)
            } else if (key == 50) {
                labelAndNextAction(2)
            } else {
            // nothing
            }
        }
    }
}

const sessionDuration = isBegin => {
    if (timeCounter.timer)
        clearInterval(timeCounter.timer)
    if (isBegin == true) {
        timeCounter.timer = setInterval(() => {
            let date = moment().format('X') - timeCounter.beginTime
            // timeCounter.strTime = formateSeconds(date)
            // console.log(timeCounter.strTime)
        }, 1000)
    } else {
        let date = timeCounter.endTime - timeCounter.beginTime
        if (date > 60)
            date = 60
        timeCounter.seconds = date
        // timeCounter.strTime = formateSeconds(date)
    }
}
// 将秒转化为时分秒
const formateSeconds = endTime => {
    let secondTime = parseInt(endTime) // 将传入的秒的值转化为Number
    let min = 0 // 初始化分
    let h = 0 // 初始化小时
    let result = ''
    if (secondTime > 60) {
        // 如果秒数大于60，将秒数转换成整数
        min = parseInt(secondTime / 60) // 获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60) // 获取秒数，秒数取佘，得到整数秒数
        if (min > 60) {
            // 如果分钟大于60，将分钟转换成小时
            h = parseInt(min / 60) // 获取小时，获取分钟除以60，得到整数小时
            min = parseInt(min % 60) // 获取小时后取佘的分，获取分钟除以60取佘的分
        }
    }
    if (h.toString().padStart(2, '0') == '00') {
        result = `${min.toString().padStart(2, '0')}:${secondTime
            .toString()
            .padStart(2, '0')}`
    } else {
        result = `${h.toString().padStart(2, '0')}:${min
            .toString()
            .padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
    }
    return result
}

sessionDuration(true)

lookQuestionAction()
</script>

<template>
    <el-page-header :icon="ArrowLeft" title="" content=" " @back="goBack" />
    <el-row>
        <el-col :span="24">
            <div class="study-progress">
                <el-progress
                    :text-inside="true"
                    :stroke-width="5"
                    :percentage="pageData.studyPercentage"
                    status="info"
                >
                    <span />
                </el-progress>
            </div>
        </el-col>
    </el-row>
    <el-row v-loading="pageData.loading">
        <el-col :span="11" :offset="1" :style="{height:contentHeight()}" class="front-card">
            <el-scrollbar :style="{height:contentHeight(),'padding-left':'10px','padding-right':'10px'}">
                <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
                <p />
                {{ pageData.frontContent }}
            </el-scrollbar>
        </el-col>
        <el-col :span="11" class="back-card" :style="{'background':pageData.backColor}">
            <el-scrollbar :style="{height:contentHeight(),'padding-left':'20px','padding-right':'10px'}">
                <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
                <div v-show="pageData.lookAnswer" :style="{'text-align':'left'}">
                    <div v-html="pageData.backContent" />
                </div>
            </el-scrollbar>
        </el-col>
    </el-row>
    <el-row v-show="!pageData.studyCompleted" :style="{'background-color':'#FAFAFA','margin-right':'-5px','margin-left':'-5px'}">
        <el-col :span="16 " :offset="4" :style="{height:'60px'}">
            <el-button v-show="!pageData.lookAnswer" type="primary" round @click="lookAnswerAction">显 示 背 面 &nbsp;&nbsp;<kbd class="Space-Button-Key">space</kbd></el-button>

            <div v-show="pageData.lookAnswer">
                <el-button type="danger" round @click="labelAndNextAction(1)">困难 &nbsp;&nbsp;<kbd class="Num-Button-Key">1</kbd></el-button>
                <el-button type="warning" round @click="labelAndNextAction(2)">良好 &nbsp;&nbsp;<kbd class="Num-Button-Key">2</kbd></el-button>
                <el-button type="success" round @click="labelAndNextAction(3)">简单 &nbsp;&nbsp;<kbd class="Num-Button-Key">3</kbd></el-button>
            </div>
            <!-- <div
            ><kbd class="DocSearch-Button-Key">1</kbd></div> -->
            <!-- <kbd class="DocSearch-Button-Key">⌘</kbd>
            <kbd class="DocSearch-Button-Key">1</kbd>
            <kbd class="DocSearch-Button-Key">2</kbd>
            <kbd class="DocSearch-Button-Key">3</kbd> or <kbd class="DocSearch-Button-Key">Ctrl</kbd> -->
        </el-col>
        <el-col :span="2">
            {{ timeCounter.strTime }}
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
// scss
.el-row {
    margin: 10px;
    text-align: center;
    // font-size: 30px;
}
.el-col {
    border-radius: 4px;
    margin-top: 20px;
}
.study-progress .el-progress--line {
    margin-bottom: 15px;
    width: 100%;
}
.Num-Button-Key {
    align-items: center;
    // background: rgb(125 125 125 / 10%);
    background-color: #e8e8f1;
    border-radius: 3px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgb(30 35 90 / 40%);
    color: #909399;
    display: flex;
    justify-content: center;
    margin-right: 0.4em;
    position: relative;
    // padding: 0 0 2px;
    border: 0;
    // top: -1px;
    width: 25px;
    height: 20px;
}
.Space-Button-Key {
    align-items: center;
    // background: rgb(125 125 125 / 10%);
    background-color: #e8e8f1;
    border-radius: 3px;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgb(30 35 90 / 40%);
    color: #909399;
    display: flex;
    justify-content: center;
    margin-right: 0.4em;
    position: relative;
    // padding: 0 0 2px;
    border: 0;
    // top: -1px;
    width: 80px;
    height: 20px;
}
.back-card {
    // background:
    //     linear-gradient(
    //         blue 33.3%,
    //         red 33.3%,
    //         red 66.6%,
    //         green 66.6%
    //     );
    // background-color: #e1f5fe;
    // background: linear-gradient(#e1f5fe, #ffebee);
    border: 1px solid;
    box-shadow: --el-box-shadow-dark;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
    background-size: cover;
    background-attachment: fixed;
}
.front-card {
    border: 1px solid;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 30px;
}
div p {
    text-align: center;
}
</style>
