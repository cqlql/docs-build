<template>
  <Transition
    :name="name"
    :enter-active-class="activeClass"
    :leave-active-class="activeClass"
  >
    <slot />
  </Transition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'fade'
    },
    activeClass: {
      type: String,
      default: 'transition-active'
    }
  }
}
</script>

<style scoped>
.transition-active{
  transition: 0.3s cubic-bezier(.55,0,.1,1);
  transition-property:opacity,transform;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}
.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}

.slide-in-down-enter, .slide-in-down-leave-to {
  opacity: 0;
  transform: translate3d(0, -30px, 0);
}
/* .slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
} */
.zoom-in-enter, .zoom-out-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.zoom-in-leave-to, .zoom-out-enter {
  opacity: 0;
  transform: scale(1.2);
}
/* 100% 的写法 ios 有bug。需使用不能完全隐藏的值，改成99%即可 */
.slide-bottom-enter, .slide-bottom-leave-to {
  transform: translate3d(0, 99%, 0);
}

/* .slide2-right-leave-active,
.slide2-left-enter-active {
  z-index: 2;
}
.slide2-left-enter,
.slide2-right-leave-to {
  transform: translate3d(50%, 0, 0) scale(1.2);
  opacity: 0;
}
.slide2-left-leave-to,
.slide2-right-enter {
  transform: translate3d(-30px, 0) scale(0.8);
  opacity: 0;
}
 */
</style>
