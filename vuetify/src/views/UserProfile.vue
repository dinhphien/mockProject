<template>
  <v-container
    fill-height
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <material-card
          color="green"
          title="Your Profile"
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                  <v-col cols="6">
                    <v-text-field v-model = "editedUserProfile.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field  v-model = "editedUserProfile.address" label="Address"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field  v-model = "editedUserProfile.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model = "editedUserProfile.password" label="Password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field  v-model = "editedUserProfile.idCard" label="IDCard"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field  v-model = "editedUserProfile.phoneNumber" label="Phone Number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" v-if = "editedUserProfile.Role">
                    <v-text-field  disabled :value ="editedUserProfile.Role.name" label="Role"></v-text-field>
                  </v-col>
                  <v-col cols="6" v-if = "editedUserProfile.Department">
                    <v-text-field  disabled :value = "editedUserProfile.Department.name" label="Department"></v-text-field>
                  </v-col>
                </v-row>
              <v-row>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn color="success" @click="updateProfile">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data : () => ({
      editedUserProfile: {
        id: '',
        name: '',
        address: '',
        email: '',
        password: '',
        idCard: '',
        phoneNumber: '',
      },
    }),
    computed : {
      userProfile(){
        return this.$store.state.userProfile
      },

    },
    beforeCreate(){
      
    },
    mounted(){
      Object.assign(this.editedUserProfile, this.$store.state.userProfile)
    },
    watch: {
      userProfile: function(){

      }

    },
    created(){
    },

    methods: {
      updateProfile(){
        let item = Object.assign({}, this.editedUserProfile)
        this.$store.dispatch("updateUserProfile", item)
      }
    }
  }
</script>
