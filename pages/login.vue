<template>
  <!-- <div class="nav">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/cart">Cart</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
    <NuxtLink to="/registration">Register</NuxtLink>
   </div> -->
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit" class="login-button">Login</button>
      <NuxtLink to="/registration">Click here to register</NuxtLink>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const mutation = `
          mutation {
            login(email: "${this.email}", password: "${this.password}") {
              access_token
              refresh_token
            }
          }
        `;

        const axios = await import('axios');
        const response = await axios.default.post('https://api.escuelajs.co/graphql', {
          query: mutation
        });

        const { access_token } = response.data.data.login;

        // Save access token to local storage
        localStorage.setItem('accessToken', access_token);

        console.log('Login successful. Access token saved:');
        this.$router.push('/');

        // Handle success response (e.g., redirect to dashboard)
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure (e.g., display error message)
      }
    }
  }
};
</script>

<style scoped>
/* Background */
body {
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Arial', sans-serif;
}

/* Container styles */
.login-container {
  max-width: 360px;
  margin: 100px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  text-align: center;
}

/* Title styles */
.login-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Form styles */
.login-form {
  display: flex;
  flex-direction: column;
}

/* Form group styles */
.form-group {
  margin-bottom: 20px;
}

/* Label styles */
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

/* Input styles */
.form-group input {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #667eea;
}

/* Button styles */
.login-button {
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

.login-button:hover {
  background: #764ba2;
  transform: translateY(-2px);
}

/* Add some space at the bottom for better appearance */
.login-container {
  margin-bottom: 50px;
}
</style>



