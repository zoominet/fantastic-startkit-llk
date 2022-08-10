// import api from '@/api'

const useStudyQueueStore = defineStore(
    // 唯一ID
    'studyqueue',
    {
        state: () => ({
            queue: [],
            idx: 0
        }),
        getters: {
            queueCount: state => {
                return state.queue.length
            }
        },
        actions: {
            setQueues(q) {
                this.queue = q
                this.idx = 0
            },
            getQueues() {
                return this.queue
            },
            getCardId() {
                let i = this.idx
                if (i < this.queue.length) {
                    this.idx++
                    return this.queue[i].StudyQueue.card_id
                } else
                    return 0
            }
        }
    }
)

export default useStudyQueueStore
