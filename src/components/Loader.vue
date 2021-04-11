<template>
	<div class="loader_wrap" v-if="loader">
		<div class="loader_icon_wrap">
			<b-spinner label="Spinning" class="loader__icon"></b-spinner>
			<p>로딩중입니다<br>잠시만 기다려주세요</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Loader',
	computed: {
		...mapState(['loader'])
	}
}
</script>

<style lang="scss">
.loader_wrap {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;
	background-color: rgba(255,255,255,.1);

	.loader_icon_wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		text-align: center;
		@include transform(translate(-50%, -50%));

		.loader__icon {
			display: inline-block;
			margin-bottom: 20px;
			color: $primary-purple;
		}
	}
}
</style>
