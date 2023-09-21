<script>
export default {
  name: "RapturePointsHeader",
  data() {
    return {
      rapturePoints: new Decimal(),
      isVisible: true
    };
  },
  methods: {
    update() {
      this.rapturePoints.copyFrom(Currency.rapturePoints);
      this.isVisible = true;//PlayerProgress.raptureUnlocked();
    }
  }
};
</script>

<template>
  <div
    v-show="isVisible"
    class="c-rapture-tab__header"
  >
    You have
    <span class="c-rapture-tab__rapture-points">{{ format(rapturePoints, 2) }}</span>
    {{ pluralize("Restless Soul", rapturePoints) }}.
  </div>
</template>

<style scoped>

</style>