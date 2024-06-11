<template>
  <div>
    <h1>Products</h1>
    <NuxtLink to="/cart">Cart</NuxtLink>
    <ProductGrid />
  </div>
</template>

<script>
import ProductGrid from '~/components/ProductGrid.vue';

export default {
  components: {
    ProductGrid
  }
}
</script>
