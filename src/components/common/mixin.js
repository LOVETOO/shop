
export const MixinMethods = {
    methods: {
        showToastMask (msg) {
          const toast = this.$createToast({
            txt: msg,
            type: 'txt'
          })
          toast.show()
        }
    }
}