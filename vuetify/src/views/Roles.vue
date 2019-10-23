<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">
        <v-dialog v-model="dialog" width = "500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Role</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              {{titleDialogAddNewRole}}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model = "editedRole.name" label="Name"></v-text-field>
                </v-row> 
              </v-container> 
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <material-card
          color="green"
          title="Roles Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="roles"
            :items-per-page="5"
          >
            <template v-slot:item.action = "{ item }">
              <v-btn
                icon
              >
                <v-icon color="tertiary" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                icon
              >
                <v-icon color="tertiary" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters, mapState} from 'vuex'
  export default {
    data: () => ({
      
      dialog: false,
      headers: [
        {
          sortable: true,
          text: 'Name Role',
          value: 'name'
        },
        {
          sortable:true,
          text: 'Owner',
          value: 'Employee.name'

        },
        { text: 'Actions', 
          value: 'action', 
          sortable: false 
        },
      ],
      editedIndex: -1,
      editedRole: {
        name: '',
      },
      defaultRole: {
        name: '',
      },
    }),

    computed: {
      titleDialogAddNewRole() {
        return this.editedIndex === -1 ? "Add Role" : 'Edit Role'
      },
      ...mapState({
        devices: 'devicesArray',
        roles: 'Roles',

      }),

    },
    watch : {
      devices : function() {
  
      }
    },
    beforeCreate() {
      this.$store.dispatch("getRolesDB")
    },
    mounted () {

    },
    methods: {
      openDetail(selectedDevice){
        this.$store.commit('changeDetailedDevice', selectedDevice)
        this.$router.push({ name: 'detailed-devices'})

      },

      editItem(item) {
        this.editedIndex = this.roles.indexOf(item)
        this.editedRole = Object.assign({}, item)
        this.dialog = true
        
      },
      deleteItem(item) {
        this.$store.dispatch('deleteRoleDB', item)
      },
      cancel () {
        this.dialog = false
        this.editedIndex = -1
        Object.assign(this.editedRole, this.defaultRole)
      },
      save () {
        if(this.editedIndex > -1){
          // update the device
          console.log("In save function Roles.vue")
          let item = {editedRole: this.editedRole, index: this.editedIndex}
          this.$store.dispatch('editRoleDB', item)
        }else {
          // create a new device
          let item = Object.assign({}, this.editedRole)
          this.$store.dispatch('addNewRoletoDB', item)
        }
        this.cancel()
      }
    }
  }
</script>
