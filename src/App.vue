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
@import "./styles/iconfont.scss";
@import "./styles/common.scss";

page {
  background-color: $uni-bg-color;
}
</style>
