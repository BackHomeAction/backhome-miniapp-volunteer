<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  onLaunch() {
    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
});
</script>
<style lang="scss">
page {
  background-color: $uni-bg-color;
}

.u-line-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.u-fix-ios-appearance {
  -webkit-appearance: none;
}
</style>
