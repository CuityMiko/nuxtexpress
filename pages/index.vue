<template>
<div class="card card-outline-secondary loginForm" >
  <div class="card-header">
    <h3 class="mb-0">Login</h3>
  </div>
  <div class="card-block">
    <form id='loginform' class="form" role="form" autocomplete="off" @submit.prevent="login">
      <div class="login_error" v-if="error">{{error}}</div>
      <div class="form-group row px-3 pt-3">
        <label for="email" class="col-sm-3 col-form-label">Email</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" name="email" required="" v-model="user.email">
        </div>
      </div>

      <div class="form-group row px-3">
        <label for="password" class="col-sm-3 col-form-label">Password</label>
        <div class="col-sm-9">
          <input type="password" class="form-control" name="password" required="" v-model="user.password">
        </div>
      </div>

      <button type="submit" class="btn btn-success btn-lg float-right mr-2">Login</button>
    </form>
  </div>
</div>
</template>

<script>
// import axios from '~/plugins/axios'

export default {
  async asyncData () {
    return {
      error: null,
      user: {
        email: '',
        password: ''
      }
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
        .then(() => {
          window.location.href = '/main'
        }).catch((e) => {
          this.error = e.message
        })
    }
  }
}
</script>

<style scoped lang="scss">
.login_error {
  color: red !important;
  margin-left: 15px;
  margin-top: 15px;
}

.loginForm {
    width: 450px;
    height: 280px;
    position: fixed;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>
