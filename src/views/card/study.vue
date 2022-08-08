<script setup>
// const { proxy } = getCurrentInstance()
const router = useRouter()
// const route = useRoute()

import { ArrowLeft } from '@element-plus/icons-vue'
import moment from 'moment'

const goBack = () => {
    router.go(-1)
}

const lookAnswer = ref(false)
const timeCounter = reactive({
    beginTime: moment().format('X'),
    endTime: 0,
    strTime: '',
    timer: null
})

const contentHeight = () => {
    return (window.innerHeight - 215) + 'px'
}
const lookAnswerAction = () => {
    lookAnswer.value = true
}
// const firstCardDisplay = () => {
//     lookAnswer.value = false
//     timeCounter.beginTime = moment().format('X')
// }
const labelAndNext = mLabel => {
    console.log(mLabel)
    lookAnswer.value = false

    timeCounter.endTime = moment().format('X')
    sessionDuration(false)

    timeCounter.beginTime = moment().format('X')
    sessionDuration(true)
}

document.onkeydown = function() {
    let key = window.event.keyCode
    if (lookAnswer.value == false) {
        if (key == 32 || key == 13) {
            lookAnswerAction()
        } else {
            // nothing
        }
    } else {
        if (key == 32 || key == 13 || key == 51) {
            labelAndNext(3)
        } else if (key == 49) {
            labelAndNext(1)
        } else if (key == 50) {
            labelAndNext(2)
        } else {
            // nothing
        }
    }
}

const sessionDuration = isBegin => {
    if (timeCounter.timer)
        clearInterval(timeCounter.timer)
    if (isBegin == true) {
        timeCounter.timer = setInterval(() => {
            let date = moment().format('X') - timeCounter.beginTime
            timeCounter.strTime = formateSeconds(date)
            // console.log(timeCounter.strTime)
        }, 1000)
    } else {
        let date = timeCounter.endTime - timeCounter.beginTime
        timeCounter.strTime = formateSeconds(date)
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
</script>

<template>
    <el-page-header :icon="ArrowLeft" title="" content=" " @back="goBack" />
    <el-row>
        <el-col :span="24">
            <div class="demo-progress">
                <el-progress
                    :text-inside="true"
                    :stroke-width="5"
                    :percentage="10"
                    status="info"
                >
                    <span />
                </el-progress>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="11" :offset="1" :style="{height:contentHeight()}" class="front-card">
            <el-scrollbar :style="{height:contentHeight()}">
                <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
            </el-scrollbar>
        </el-col>
        <el-col :span="11" class="back-card">
            <el-scrollbar :style="{height:contentHeight()}">
                <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
            </el-scrollbar>
        </el-col>
    </el-row>
    <el-row :style="{'background-color':'#FAFAFA','margin-right':'-5px','margin-left':'-5px'}">
        <el-col :span="16 " :offset="4" :style="{height:'60px'}">
            <el-button v-show="!lookAnswer" type="primary" round @click="lookAnswerAction">显 示 背 面</el-button>

            <div v-show="lookAnswer">
                <el-button type="danger" round @click="labelAndNext(1)">困难</el-button>
                <el-button type="warning" round @click="labelAndNext(2)">良好</el-button>
                <el-button type="success" round @click="labelAndNext(3)">简单</el-button>
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
.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 100%;
}
.DocSearch-Button-Key {
    align-items: center;
    background: rgb(125 125 125 / 10%);
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
    width: 30px;
    height: 26px;
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
    background: linear-gradient(#e1f5fe, #ffebee);
    border: 1px dashed;
    box-shadow: --el-box-shadow-dark;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
}
.front-card {
    border: 1px solid;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 30px;
}
</style>
