<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">
         <v-dialog v-model="dialog" width = "800">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Employee</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              {{titleDialogAddNewEmployee}}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model = "editedEmployee.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model = "editedEmployee.address" label="Address"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model = "editedEmployee.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model = "editedEmployee.password" label="Password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model = "editedEmployee.idCard" label="IDCard"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model = "editedEmployee.phoneNumber" label="Phone Number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">
                    <v-checkbox
                      v-model="editedEmployee.isAdmin"
                      label="isAdmin?"
                      required
                      @change= "checkIsAdmin"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="editedEmployee.departmentId"
                      :items="departments"
                      :disabled= "editedEmployee.isAdmin"
                      label="Department"
                      item-text = "name"
                      item-value = "id"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="editedEmployee.employeeRoleId"
                      :items="roles"
                      :disabled= "editedEmployee.isAdmin"
                      item-text = "name"
                      item-value = "id"
                      label="Role"
                      required
                    ></v-select>
                  </v-col>
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
          title="Employees Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="employees"
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
          text: 'Name Employee',
          value: 'name'
        },
        {
          sortable: true,
          text: 'Department',
          value: 'Department.name'
        },
        {
          sortable: true,
          text: 'Role',
          value: 'Role.name'
        },
        {
          sortable:true,
          text: 'Owner',
          value: 'Owner.name'

        },
        { text: 'Actions', 
          value: 'action', 
          sortable: false 
        },
      ],
      editedIndex: -1,
      editedEmployee: {
        id: null,
        name: '',
        email: '',
        password: '',
        address: '',
        idCard: '',
        phoneNumber: '',
        isAdmin: true,
        employeeRoleId: null,
        departmentId: null

      },
      defaultEmployee: {
        id: null,
        name: '',
        email: '',
        password: '',
        address: '',
        idCard: '',
        phoneNumber: '',
        isAdmin: true,
        employeeRoleId: null,
        departmentId: null
      },
    }),

    computed: {
      titleDialogAddNewEmployee() {
        return this.editedIndex === -1 ? "Add Employee" : 'Edit Employee'
      },
      ...mapState({
        devices: 'devicesArray',
        roles: 'Roles',
        departments: 'Departments',
        employees: 'Employees'

      }),

    },
    watch : {
      devices : function() {
  
      }
    },
    beforeCreate() {
      this.$store.dispatch("getRolesDB")
      this.$store.dispatch("getDepartmentsDB")
      this.$store.dispatch("getEmployeesDB")
    },
    mounted () {

    },
    methods: {
      openDetail(selectedDevice){
        this.$store.commit('changeDetailedDevice', selectedDevice)
        this.$router.push({ name: 'detailed-devices'})

      },
      checkIsAdmin(isAdmin){
        if(isAdmin){
          this.editedEmployee.employeeRoleId = null
          this.editedEmployee.departmentId = null
        }
      },

      editItem(item) {
        console.log(" in editItem")
        this.editedIndex = this.employees.indexOf(item)
        console.log(this.editedIndex)
        this.editedEmployee = Object.assign({}, item)
        console.log(this.editedEmployee)
        this.dialog = true
        
      },
      deleteItem(item) {
        this.$store.dispatch('deleteEmployeeDB', item)
      },
      cancel () {
        console.log("in cancel function")
        this.dialog = false
        this.editedIndex = -1
        Object.assign(this.editedEmployee, this.defaultEmployee)
      },
      save () {
        if(this.editedIndex > -1){
          let updatedItem = {
           id: this.editedEmployee.id,
           name: this.editedEmployee.name,
           address:this.editedEmployee.address,
           idCard: this.editedEmployee.idCard,
           phoneNumber: this.editedEmployee.phoneNumber,
           email: this.editedEmployee.email,
           password: this.editedEmployee.password,
           isAdmin: this.editedEmployee.isAdmin,
           employeeRoleId: this.editedEmployee.employeeRoleId,
           departmentId: this.editedEmployee.departmentId,
          }
          let item = {editedEmployee: updatedItem, index: this.editedIndex}
          console.log(item)
          this.$store.dispatch('editEmployeeDB', item)
        }else {
          // create a new device
          console.log(this.editedEmployee)
          let item = Object.assign({}, this.editedEmployee)
          this.$store.dispatch('addNewEmployeetoDB', item)
        }
        this.cancel()
      }
    }
  }
</script>
