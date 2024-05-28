<template>
  <div class="nav-ctn">
    <nav>
      <div class="nav-left">
        <NuxtLink to="/"><div class="logo"><span>DRAUGHTS</span><span class="com">.com</span></div></NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/play"><div class="nav-link">play</div></NuxtLink>
          <a><div class="nav-link">review</div></a>
        </div>
      </div>
      <div class="nav-right"></div>
    </nav>
  </div>
</template>

<style lang="scss">
.nav-ctn {
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05),0 3px 1px -2px rgba(0,0,0,0.2),0 1px 5px 0 rgba(0,0,0,0.05);;
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #ececec;
  color: #131313;
  z-index: 30;
  padding: 0 10px;
}
.nav-links {
  display: flex;
  gap: 20px;
}
nav {
  a {
    text-decoration: none;
    color: unset;
  }
  font-family: "Teachers", sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-left, .nav-right {
    display: flex;
    align-items: center;
    gap: 50px;
    .nav-link {
      letter-spacing: 1px;
      font-size: 20px;
      opacity: .9;
    }
  }
}
.logo {
  font-size: 28px;
  position: relative;
  .com {
    font-size: 20px;
  }
  ::after {
    position: absolute;
    content: "";
    top: 0;
    right: -25px;
    height: 100%;
    width: 2px;
    background-color: #131313;
    opacity: .1;
  }
}
</style>
<script setup lang="ts">
</script>