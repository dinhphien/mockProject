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
            <v-btn color="primary" dark class="mb-2" v-on="on">New Department</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Add Department
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model = "editedDepartment.name" label="Name"></v-text-field>
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
          title="Departments Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="departments"
            :items-per-page="5"
          >
            <template v-slot:item.action = "{ item }">
              <v-btn
                icon
              >
                <v-icon color="tertiary" @click="openDetail(item)">
                  mdi-apps
                </v-icon>
              </v-btn>
              <v-btn
                icon
              >
                <v-icon color="tertiary" @click="remove(item)">
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
          text: 'Room Owner',
          value: 'Owner.name'

        },
        {
          sortable:true,
          text: 'Room Manager',
          value: 'Manager.name'

        },
        { text: 'Actions', 
          value: 'action', 
          sortable: false 
        },
      ],
      editedDepartment: {
        name: '',
      },
      defaultDepartment: {
        name: '',
      },
    }),

    computed: {
      ...mapState({
        devices: 'devicesArray',
        roles: 'Roles',
        purposes: 'Purposes',
        departments: 'Departments'

      }),

    },
    watch : {
      devices : function() {
  
      }
    },
    beforeCreate() {
      this.$store.dispatch("getDepartmentsDB")
    },
    mounted () {

    },
    methods: {
      openDetail(selectedDepartment){
        this.$store.commit('changeDetailedDepartmentId', selectedDepartment.id)
        this.$router.push({ name: 'detailed-departments'})

      },
      cancel () {
        console.log("in cancel function")
        this.dialog = false
        this.editedIndex = -1
        Object.assign(this.editedDepartment, this.defaultDepartment)
      },
      save () {
        let item = Object.assign({}, this.editedDepartment)
        this.$store.dispatch('addNewDepartmenttoDB', item)
        this.cancel()
      },
      remove(item){
        let idItem = item.id
        this.$store.dispatch('removeDepartmentDB', idItem)
        this.$store.dispatch("getDepartmentsDB")
      }
    }
  }
</script>
