<template>
	<div class="store_layout">
    <router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'StoreLayout'
}
</script>

<style lang="scss">
.store_new,
.store_update {
  .form-group_address.error {
    .zonecode,
    .address {
      border: 1px solid $red;
    }
  }

  .zonecode {
    display: inline-block;
    margin-right: 5px;
    width: calc(100% - 126px);
    max-width: 150px;
    vertical-align: middle;
  }
  .address {
    margin: 6px 0 0;
    padding: .638rem 1rem .438rem;
    min-height: 38px;
    color: $text-color;
    background-color: #2e3751;
    border-color: #2e3751;
    border-radius: 0.25rem;

    &.no_data { color: #787a7e; }
  }
  .address_detail { margin-top: 6px; }
}
</style>
