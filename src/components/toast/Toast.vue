<template>
  <div :class="[$style.msgSimple, $style[options.position], $style[options.type]]">
    <div :class="$style.tickIcon">
      <svg viewBox="0 0 1024 1024">
        <path d="M962 237.778l-585 630-315-405 115.313-98.438 199.688 208.125 495-424.688 90 90z" fill="currentColor"></path>
      </svg>
    </div>
    <div>
      <ErrorIcon :class="$style.errorIcon"/>
      <span :class="$style.txt">{{options.text}}</span>
    </div>
  </div>
</template>

<script>
import ErrorIcon from './ErrorIcon'
export default {
  components: {
    ErrorIcon
  },
  props: {
    options: {
      type: Object,
      default () {
        return {
          type: '',
          text: '',
          position: 'bottom'
        }
      }
    }
  }
}
</script>

<style module>
.msgSimple {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px 10px 6px;
  font-size: 16px;
  line-height: 1.2;

  max-width: 86%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  border-radius: 3px;
  z-index: 100;
  /* pointer-events: none; */
}
.txt {
  vertical-align: middle;
}
.tickIcon {
  width: 55px;
  margin: 0 auto;
  display: none;
}

.center {
  bottom: auto;
  top: 50%;
  transform: translate(-50%, -50%);
}
.success {
  max-width: 120px;
  padding: 14px;
}
.success .tickIcon {
  display: block;
}

.error {
  color: #fff;
  background-color: #eb3941;
  font-size: 14px;
  text-align: left;
}

.msgSimple .errorIcon{
  display: none;
}
.error .errorIcon {
  display: inline-block;
}
</style>
