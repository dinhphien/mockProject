<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/v.png"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        VUETIFY MD
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav v-if="user.isAdmin ==='true'">
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
      
      v-for="(link, i) in linksAdmin"
      :key = "i"
      :to = "link.to"
      active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>

    </v-list>
    <v-list nav v-else-if= "user.isDepartmentManager ==='true'">
       <div />

      <v-list-item
      
      v-for="(link, i) in linksManager"
      :key = "i"
      :to = "link.to"
      active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
      
    </v-list>
    <v-list nav v-else>
       <div />

      <v-list-item
      
      v-for="(link, i) in links"
      :key = "i"
      :to = "link.to"
      active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
      
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      linksAdmin: [
        {
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        },
        {
          to: '/roles',
          icon: 'mdi-clipboard-outline',
          text: 'Roles'
        },
        {
          to: '/assetTypes',
          icon: 'mdi-clipboard-outline',
          text: 'AssetTypes'
        },
        {
          to: '/purposes',
          icon: 'mdi-clipboard-outline',
          text: 'Purposes'
        },
        {
          to: '/departments',
          icon: 'mdi-clipboard-outline',
          text: 'Departments'
        },
        {
          to: '/employees',
          icon: 'mdi-clipboard-outline',
          text: 'Employees'
        },
        {
          to: '/Assets',
          icon: 'mdi-clipboard-outline',
          text: 'Assets'
        },
      ],
      linksManager: [
        {
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        },
        {
          to: '/detailed-departments',
          icon: 'mdi-clipboard-outline',
          text: 'Departments'
        },
      ],
      links: [
        {
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        },
        {
          to: '/detailed-departments',
          icon: 'mdi-clipboard-outline',
          text: 'Departments'
        },
      ]
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      user(){
        return this.$store.state.user
      },
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },
    mounted(){
      this.$store.dispatch("readUserProfile", this.$store.state.user.id)
      if(this.$store.state.user.isAdmin ==='false'){
        this.$store.commit('changeDetailedDepartmentId', this.$store.state.user.departmentId)
      }

    },
    created(){
      
      //console.log("In drawer created")
      //console.log(typeof(this.$store.state.user.isAdmin))
      
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
    }
  }
</script>
