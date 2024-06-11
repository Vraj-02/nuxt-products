<template>
  <div>
    <div class="nav">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/cart">Cart</NuxtLink>
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/registration">Register</NuxtLink>
      <NuxtLink to="/user_profile">User Profile</NuxtLink>
     </div>
    <h1>Products</h1>
    <!-- <NuxtLink to="/cart">Cart</NuxtLink> -->
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
