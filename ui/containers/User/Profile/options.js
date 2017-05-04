export default {
  header: {
    MAX_HEIGHT: 260,
    MIN_HEIGHT: 60,
    get SCROLL_DISTANCE(){
      return this.MAX_HEIGHT - this.MIN_HEIGHT
    }
  },
  avatar: {
    size: 120,
    get halfSize(){
      return this.size / 2
    }
  },
}