<template>
	<div class="product_layout">
    <router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'ProductLayout'
}
</script>

<style lang="scss">
.product_create,
.product_update {
  .thumbnail_wrap {
    margin-bottom: 1.5rem;
    
		img { border-radius: 0.25rem; }
		
		.img_dropzone_wrap.error {
			width: 152px;
			border: 1px solid $red;
			border-radius: 0.25rem;
		}
		.error_txt {
			font-size: .85rem;
			color: $red;
		}
  }

	.category_wrap { padding-left: 0; }
	
	@media (max-width: 767px) {
		.category_wrap { padding: 0; }
	}
}
</style>
