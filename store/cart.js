export const state = () => ({
    cart: [],
  });
  
  export const getters = {
    cartItemCount: state => {
      return state.cart.reduce((total, product) => total + product.quantity, 0);
    },
    cartTotalPrice: state => {
      return state.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    },
  };
  
  export const mutations = {
    addToCart(state, product) {
      // Check if the product already exists in the cart
      const existingProductIndex = state.cart.findIndex(item => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity
        state.cart[existingProductIndex].quantity++;
      } else {
        // If the product is new, add it to the cart with quantity 1
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((product) => product.id !== productId);
    },
    increaseQuantity(state, productId) {
        const product = state.cart.find(item => item.id === productId);
        if (product) {
          product.quantity++;
        }
      },
    decreaseQuantity(state, productId) {
        const product = state.cart.find(item => item.id === productId);
        if (product) {
          product.quantity--;
        }
      },
  };
  
  
  
  export const actions = {
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeProductFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    increaseProductQuantity({ commit, state }, productId) {
        const product = state.cart.find(item => item.id === productId);
        if (product) {
          commit('increaseQuantity', productId);
        }
      },
    decreaseProductQuantity({ commit, state }, productId) {
        const product = state.cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
          commit('decreaseQuantity', productId);
        }
      },
  };
  