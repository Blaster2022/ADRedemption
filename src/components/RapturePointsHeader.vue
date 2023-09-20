<script>
export default {
  name: "RapturePointsHeader",
  data() {
    return {
      rapturePoints: 0,//new Decimal(),
      isVisible: true
    };
  },
  methods: {
    update() {
      this.rapturePoints.copyFrom(Currency.rapturePoints);
      this.isVisible = true;//PlayerProgress.infinityUnlocked();
    }
  }
};
</script>

<template>
  <div
    v-show="isVisible"
    class="c-infinity-tab__header"
  >
    You have
    <span class="c-infinity-tab__infinity-points">{{ format(rapturePoints, 2) }}</span>
    {{ pluralize("Restless Soul", rapturePoints) }}.
  </div>
</template>

<style scoped>

</style>