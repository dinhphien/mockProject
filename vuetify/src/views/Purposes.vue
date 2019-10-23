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
            <v-btn color="primary" dark class="mb-2" v-on="on">New Purpose</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              {{titleDialogAddNewPurpose}}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model = "editedPurpose.name" label="Name"></v-text-field>
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
          title="Purposes Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="purposes"
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
          text: 'Name Purpose',
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
      editedPurpose: {
        name: '',
      },
      defaultPurpose: {
        name: '',
      },
    }),

    computed: {
      titleDialogAddNewPurpose() {
        return this.editedIndex === -1 ? "Add Purpose" : 'Edit Purpose'
      },
      ...mapState({
        devices: 'devicesArray',
        roles: 'Roles',
        purposes: 'Purposes',

      }),

    },
    watch : {
      devices : function() {
  
      }
    },
    beforeCreate() {
      this.$store.dispatch("getPurposesDB")
    },
    mounted () {

    },
    methods: {
      openDetail(selectedDevice){
        this.$store.commit('changeDetailedDevice', selectedDevice)
        this.$router.push({ name: 'detailed-devices'})

      },

      editItem(item) {
        console.log(" in editItem")
        this.editedIndex = this.purposes.indexOf(item)
        console.log(this.editedIndex)
        this.editedPurpose = Object.assign({}, item)
        console.log(this.editedPurpose)
        this.dialog = true
        
      },
      deleteItem(item) {
        this.$store.dispatch('deletePurposeDB', item)
      },
      cancel () {
        console.log("in cancel function")
        this.dialog = false
        this.editedIndex = -1
        Object.assign(this.editedPurpose, this.defaultPurpose)
      },
      save () {
        if(this.editedIndex > -1){
          // update the device
          console.log("In save function Purposes.vue")
          let item = {editedPurpose: this.editedPurpose, index: this.editedIndex}
          this.$store.dispatch('editPurposeDB', item)
        }else {
          // create a new device
          let item = Object.assign({}, this.editedPurpose)
          this.$store.dispatch('addNewPurposetoDB', item)
        }
        this.cancel()
      }
    }
  }
</script>
