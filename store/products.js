import gql from 'graphql-tag';

export const state = () => ({
    products: [],
    searchQuery: '',
    error: null,
  });
  
  export const getters = {
    filteredProducts: (state) => {
      return state.products.filter((product) =>
        product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  };
  
  export const mutations = {
    setProducts(state, products) {
      state.products = products;
    },
    setError(state, error) {
      state.error = error;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  };
  
  export const actions = {
   // Inside fetchProducts action in store/products.js

   async fetchProducts({ commit }) {
     console.log('Fetching products...');
     const query = gql`
       query {
         products {
           id
           title
           price
           description
           images
           category {
             id
             name
             image
           }
         }
       }
     `;
   
     try {
       const client = this.app.apolloProvider.defaultClient;
       console.log('Sending GraphQL query...');
       const { data } = await client.query({ query });
       console.log('Received data:', data);
       commit('setProducts', data.products);
     } catch (error) {
       console.error('Error fetching products:', error);
       commit('setError', error);
     }
   }
   
  
  };
  