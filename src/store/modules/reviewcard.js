// import api from '@/api'

const useReviewCardStore = defineStore(
    // 唯一ID
    'reviewcard',
    {
        state: () => ({
            cards: []
        }),
        getters: {
            cardsCount: state => {
                return state.cards.length
            }
        },
        actions: {
            setCards(cds) {
                this.cards = cds
            },
            getCard(idx) {
                return this.cards[idx]
            },
            prevButton(idx) {
                return idx > 0
            },
            nextButton(idx) {
                return idx < this.cards.length - 1
            }
        }
    }
)

export default useReviewCardStore
