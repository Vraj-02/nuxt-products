<template>
  <!-- <NuxtLink to="/">Products</NuxtLink> -->
    <div class="cart">
      <h1>Shopping Cart</h1>
      <div v-if="cartItemCount === 0">Your cart is empty</div>
      <div v-else class="cart-items">
        <div v-for="product in cart" :key="product.id" class="cart-item">
          <img :src="product.images[0]" :alt="product.title" class="cart-item-image" />
          <div class="cart-item-details">
            <h3>{{ product.title }}</h3>
            <p>Price: ₹{{ product.price }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(product)">-</button>
              <span>{{ product.quantity }}</span>
              <button @click="increaseQuantity(product)">+</button>
            </div>
            <p>Total: ₹{{ product.price * product.quantity }}</p>
            <button @click="removeFromCart(product.id)">Remove</button>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total Items: {{ cartItemCount }}</p>
          <p>Total Price: ₹{{ cartTotalPrice }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'default',
    computed: {
      cart() {
        return this.$store.state.cart.cart;
      },
      cartItemCount() {
        return this.$store.getters['cart/cartItemCount'];
      },
      cartTotalPrice() {
        return this.$store.getters['cart/cartTotalPrice'];
      },
    },
    methods: {
        decreaseQuantity(product) {
    this.$store.dispatch('cart/decreaseProductQuantity', product.id);
  },
      increaseQuantity(product) {
    this.$store.dispatch('cart/increaseProductQuantity', product.id);
  },
      removeFromCart(productId) {
        this.$store.dispatch('cart/removeProductFromCart', productId);
      },
    },
  };
  </script>
  
  <style>
  .cart {
    padding: 20px;
  }
  
  .cart-items {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
  
  .cart-item {
    display: flex;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }
  
  .cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .cart-item-details {
    flex-grow: 1;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .quantity-controls button {
    padding: 5px 10px;
    margin-right: 5px;
  }
  
  .cart-summary {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 20px;
    text-align: right;
  }
  </style>
  