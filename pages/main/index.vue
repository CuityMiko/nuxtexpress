<template lang="html">
  <nav class="navbar navbar-expand-sm navbar-light bg-faded">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>

  <!-- Brand -->
  <a class="navbar-brand" href="#">{{ $store.state.authUser._id}}</a>

  <!-- Links -->
  <div class="collapse navbar-collapse" id="nav-content">
  <ul class="navbar-nav">
  <li class="nav-item">
  <a class="nav-link" href="#">Link 1</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="#">Link 2</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="#">Link 3</a>
  </li>
  </ul>
  </div>
  </nav>
</template>

<script>
export default {
  async asyncData () {
    return {
      email: ''
    }
  },
  head () {
    return {
      title: 'Main'
    }
  },
  methods: {
  }
}
</script>

<style lang="css">

</style>
