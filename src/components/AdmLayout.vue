<template>
	<div class="adm_layout menu_expanded">
		<Nav :show="isShowNav" @toggleNav="toggleNav"></Nav>
		<div class="app_content">
			<Header @toggleNav="toggleNav"></Header>
			<router-view></router-view>
		</div>
		<div class="overlay" :class="{'show': isShowNav}" @click="toggleNav"></div>
	</div>
</template>

<script>
import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default {
	name: 'AdmLayout',
	components: {
		Header,
		Nav
	},
	created() {
		this.checkWindowWidth()

		window.addEventListener('resize', () => {
			this.checkWindowWidth()
		});
	},
	data() {
		return {
			isShowNav: true
		}
	},
	methods: {
		toggleNav() {
			this.isShowNav = !this.isShowNav
		},
		checkWindowWidth() {
			if(window.innerWidth <= 991) {
				this.isShowNav = false
			}
		}
	}
}
</script>

<style lang="scss">
.adm_layout {
	height: 100%;

	&.menu_expanded {
		.nav {
			width: 260px;
		}
		.app_content {
			margin-left: 260px;
			padding: 2rem;
		}
	}

	.overlay {
		display: none;
		opacity: 0;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		background: rgba(34,41,47,.5);
		transition: all .5s ease-in-out;
	}

	@media (max-width: 991px) {
    &.menu_expanded .app_content {
			margin-left: 0;
			padding: 1.2rem;
		}
		.overlay.show {
			display: block;
			opacity: 1;
		}
  }
}
</style>
