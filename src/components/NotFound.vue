<template>
	<div class="not_found">
		<p class="error_code">404</p>
		<h1 class="error_title">PAGE NOT FOUND</h1>
		<div class="btn_wrap">
			<router-link to="/" class="btn btn_outline btn_go_main">Go to main</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
	created () {},
	mounted () {},
	destroyed () {},
	components: {},
	filters: {},
	props: {},
	data () {
		return {}
	},
	computed: {},
	watch: {},
	methods: {}
}
</script>

<style lang="scss">
.not_found {
	position: relative;
	padding-top: 12%;
	text-align: center;

	.error_code {
		font-size: 130px;
		font-weight: 700;
		line-height: 150px;
	}
	.error_title {
		font-size: 25px;
	}
	.btn_go_main {
		margin-top: 50px;
	}
}
</style>
