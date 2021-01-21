<template>
  <view class="u-input__wrapper">
    <view
      class="u-input"
      :class="[
        state.focus ? 'u-input--focus' : '',
      ]"
    >
      <input
        v-model="inputValue"
        :type="type"
        class="u-input__input"
        :placeholder="placeholder"
        placeholder-class="u-input--placeholder"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
        @keyboardheightchange="handleKeyBoardHeightChange"
      >
      <span class="u-input__outline" />
      <span class="u-input__outline u-input__outline--dynamic" />
    </view>
    <span
      v-if="description"
      class="u-input__description"
    >{{ description }}</span>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  emits: [
    "input",
    "onInput",
    "focus",
    "blur",
    "confirm",
    "keyboardheightchange",
  ],
  data() {
    return {
      inputValue: "",
      state: {
        focus: false,
      },
    };
  },
  watch: {
    inputValue(val) {
      if (val !== this.value) {
        this.$emit("input", val);
      }
    },
    value(val) {
      if (val !== this.inputValue) {
        this.inputValue = val;
      }
    },
  },
  methods: {
    handleInput(e: any) {
      this.$emit("onInput", e);
    },
    handleFocus(e: any) {
      this.$emit("focus", e);
      this.state.focus = true;
    },
    handleBlur(e: any) {
      this.$emit("blur", e);
      this.state.focus = false;
    },
    handleConfirm(e: any) {
      this.$emit("confirm", e);
    },
    handleKeyBoardHeightChange(e: any) {
      this.$emit("keyboardheightchange", e);
    },
  },
});
</script>

<style lang="scss">
.u-input {
  height: 88rpx;
  position: relative;
  padding-top: 22rpx;

  &__input {
    margin: 22rpx 0;
  }

  &--placeholder {
    color: $uni-text-color-placeholder;
  }

  &--focus {
    .u-input__outline--dynamic {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }

  &__description {
    font-size: $uni-font-size-xs;
    color: $uni-text-color-darkgrey;
  }

  &__outline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    transform: scaleY(0.5);
    background-color: $uni-text-color-placeholder;

    &--dynamic {
      background-color: $uni-text-color-darkgrey;
      transform: scaleX(0);
      transform-origin: right center;
      transition: transform 0.3s ease-in-out;
    }
  }
}
</style>
