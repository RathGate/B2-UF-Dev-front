<template>
  <div class="waiting-ctn">
    <div class="before">Be patient ! You're in the</div>
    <div class="waiting">
      waiting list
    </div>
    <div class="after">You'll be matched against a player soon !</div>
  </div>
</template>

<style lang="scss">
.waiting-ctn {
  font-family: "Teachers", sans-serif;
  position: relative;
  .before {
    position: absolute;
    top: 10px;
    text-transform: uppercase;
    font-size: 14px;
    opacity: .8;
    letter-spacing: 1px;
  }
  .after {
    padding-top: 40px;
  }
}
.waiting {
  font-size: 120px;
  color: #ececec;
  -webkit-text-stroke: 3px #131313;
  text-stroke: 3px #131313;
  font-weight: lighter;
}

</style>
<script setup lang="ts">
</script>