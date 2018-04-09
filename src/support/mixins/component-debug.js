export default (enable = false) => {
  function log (type, ...args) {
    if (enable) {
      console[type](this.$_id, ...args, Date.now(), this.$el)
    }
  }

  return {
    created () {
      // this.$_id = `${this.$options.name}-${this.$hashids.encode(Date.now())}`
      this.$_id = `${this.$options.name}-${Date.now()}`
    },
    methods: {
      log (...args) {
        log.call(this, 'log', ...args)
      },
      warn (...args) {
        log.call(this, 'warn', ...args)
      }
    }
  }
}
