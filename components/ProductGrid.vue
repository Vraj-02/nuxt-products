<template>
    <div class="product-grid">
      <input v-model="searchQuery" placeholder="Search products" @input="updateSearchQuery" />
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error loading products</div>
      <div v-else class="products">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-card-image">
            <img :src="product.images[0]" :alt="product.title" />
          </div>
          <div class="product-card-body">
            <h3 class="product-card-title">{{ product.title }}</h3>
            <details>
                <summary>Description</summary>
            <p class="product-card-description">{{ product.description }}</p>
            </details>
            <p class="product-card-price">Price: ₹{{ product.price }}</p>
            <div class="product-card-category">
              <span>{{ product.category.name }}</span>
            </div>
            <button @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true,
        error: null,
      };
    },
    computed: {
      products() {
        return this.$store.getters['products/filteredProducts'];
      },
      searchQuery: {
        get() {
          return this.$store.state.products.searchQuery;
        },
        set(value) {
          this.$store.commit('products/setSearchQuery', value);
        },
      },
    },
    methods: {
      updateSearchQuery(event) {
        this.$store.commit('products/setSearchQuery', event.target.value);
      },
      addToCart(product) {
        this.$store.dispatch('cart/addProductToCart', product);
      },
    },
    async mounted() {
      try {
        await this.$store.dispatch('products/fetchProducts');
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  
  <style>
  .product-grid {
    padding: 20px;
  }
  
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 products per row */
    gap: 20px;
  }
  
  .product-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .product-card-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .product-card-body {
    padding: 15px;
  }
  
  .product-card-title {
    font-size: 18px;
    margin: 10px 0;
  }
  
  .product-card-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .product-card-price {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-card-category {
    display: flex;
    align-items: center;
  }
  
  .category-image {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  
  .loading, .error {
    text-align: center;
    width: 100%;
    padding: 20px;
  }
  
  @media (max-width: 1200px) {
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 900px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 600px) {
    .products {
      grid-template-columns: 1fr;
    }
  }
  </style>
  