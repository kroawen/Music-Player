<template>
  <div class="progress-bar" ref="progressBar" @click="setProcess">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="processTouchstart" @touchmove.prevent="processTouchmove" @touchend.prevent="processTouchend">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { prefixStyle } from 'common/js/dom'
  const progressBtnWidth = 16
  const transform = prefixStyle('transform')
  export default {
    name: 'process',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      processTouchstart (e) {
        this.touch.initiate = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      processTouchmove (e) {
        if (!this.touch.initiate) return
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(
          this.$refs.progressBar.clientWidth - progressBtnWidth,
          Math.max(0, this.touch.left + deltaX)
        )
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[
          transform
        ] = `translate3d(${offsetWidth}px, 0, 0)`
      },
      processTouchend (e) {
        this.touch.initiate = false
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      setProcess (e) {
        let offsetWidth = e.offsetX
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[
          transform
        ] = `translate3d(${offsetWidth}px,0,0)`
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      }
    },
    watch: {
      percent (newpercent) {
        if (newpercent > 0 && !this.touch.initiate) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newpercent * barWidth
          this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style[
            transform
          ] = `translate3d(${offsetWidth}px, 0, 0)`
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~common/less/const.less';
  .progress-bar {
    height: 30px;

    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);

      .progress {
        position: absolute;
        height: 100%;
        background: #000;
      }

      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;

        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid @color-text;
          border-radius: 50%;
          background: #000;
        }
      }
    }
  }
</style>
