<template>
  <header>
    <h1>
      <img src="@/assets/images/logo.png" alt="vue logo">
      <span>Admin</span>
    </h1>
  </header>
</template>

<script>
export default {
  name: 'AuthHeader'
}
</script>

<style lang="scss" scoped>
header {
  padding: 1rem 2rem;

  img,
  span {
    display: inline-block;
    vertical-align: middle;
  }

  img { width: 35px; }
  span {
    padding-left: 9px;
    font-size: 22px;
    font-weight: 600;
    color: #00c086;
  }
}
</style>