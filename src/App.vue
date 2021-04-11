<template>
  <div id="app">
		<router-view/>
		<loader></loader>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style lang="scss">
// Bootstrap style
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

@import '@/assets/scss/index.scss';

#app {
	min-height: 100vh;
	background-color: $dark-purple;
}
</style>
