<template>
  <!-- <div class="nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/cart">Cart</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
    <NuxtLink to="/registration">Register</NuxtLink>
   </div> -->
  <div>
    <h2>User Profile</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error fetching profile</div>
    <div v-else>
      <h3>{{ user.name }}</h3>
      <img :src="user.avatar" :alt="user.name">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error('Access token not found in local storage');
        }

        const headers = {
          Authorization: `Bearer ${accessToken}`
        };

        this.loading = true;

        const axios = await import('axios');
        const response = await axios.default.post('https://api.escuelajs.co/graphql', {
          query: `
            query {
              myProfile {
                id
                name
                avatar
              }
            }
          `,
        }, { headers });

        this.user = response.data.data.myProfile;
        console.log(this.user);
        this.loading = false;
      } catch (error) {
        console.error('Error fetching profile:', error);
        this.error = error.message || 'An error occurred while fetching the profile';
        this.loading = false;
      }
    }
  }
};
</script>