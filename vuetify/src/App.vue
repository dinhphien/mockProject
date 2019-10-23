<template>
  <v-app>
   <div v-if="user.id >= 0">
      <core-app-bar />
      <core-drawer />
      <core-view/>
      <core-footer />
   </div>
   <div v-else>
     <core-login />
   </div>
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
      CoreLogin: () => import('@/components/core/Login')
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    created(){
    }
  }
</script>
  