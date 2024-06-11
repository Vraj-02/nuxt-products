<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      
      <div class="form-group">
        <label for="avatar">Avatar URL:</label>
        <input type="url" v-model="avatar" id="avatar" required>
      </div>
      
      <button type="submit" class="register-button">Register</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">Registration successful!</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      avatar: '',
      error: null,
      success: false
    };
  },
  methods: {
    async register() {
      try {
        const mutation = `
          mutation {
            addUser(
              data: {
                name: "${this.name}",
                email: "${this.email}",
                password: "${this.password}",
                avatar: "${this.avatar}"
              }
            ) {
              id
              name
              avatar
            }
          }
        `;

        const { default: axios } = await import('axios');
        const response = await axios.post('https://api.escuelajs.co/graphql', {
          query: mutation
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        console.log('Registration successful:', response.data.data.addUser);
        this.success = true;
        this.error = null;
      } catch (error) {
        console.error('Registration failed:', error);
        this.error = error.message || 'An error occurred while registering';
        this.success = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
<style scoped>
/* Background */
body {
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
  font-family: 'Arial', sans-serif;
}

/* Container styles */
.register-container {
  max-width: 360px;
  margin: 100px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  text-align: center;
}

/* Title styles */
.register-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Form styles */
.register-form {
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
  border-color: #ff758c;
}

/* Button styles */
.register-button {
  padding: 12px;
  background: #ff758c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
}

.register-button:hover {
  background: #ff7eb3;
  transform: translateY(-2px);
}

/* Error and Success message styles */
.error {
  margin-top: 20px;
  color: #e74c3c;
}

.success {
  margin-top: 20px;
  color: #2ecc71;
}
</style>

