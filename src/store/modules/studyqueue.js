// import api from '@/api'

const useStudyQueueStore = defineStore(
    // 唯一ID
    'studyqueue',
    {
        state: () => ({
            queue: [],
            idx: -1,
            today: ''
        }),
        getters: {
            queueCount: state => {
                return state.queue.length
            }
        },
        actions: {
            setQueues(q) {
                this.queue = q
                this.idx = -1
            },
            getQueues() {
                return this.queue
            },
            addQueue(sq) {
                this.queue[this.queue.length] = { 'StudyQueue': sq }
            },
            getCardId() {
                let i = ++this.idx
                if (i < this.queue.length) {
                    return this.queue[i].StudyQueue.card_id
                } else
                    return 0
            },
            getStudyQueue() {
                return this.queue[this.idx].StudyQueue
            },
            setToday(t) {
                this.today = t
            },
            getToday() {
                return this.today
            }

        }
    }
)

export default useStudyQueueStore
