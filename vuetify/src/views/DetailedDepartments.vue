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
        <v-dialog v-model="dialogBasicInfor" width = "500">
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Update Basic Information
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model = "eidtedBasicRoom.name" label="Name Department"></v-text-field>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-select
                      v-model="eidtedBasicRoom.managerId"
                      :items="detailedDepartment.Employee"
                      label="Manager"
                      item-text = "name"
                      item-value = "id"
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
        <material-card>
          <v-card-title
                class="headline green mx-auto d-block elevation-6"
                primary-title
              >
                Information
              </v-card-title>
          <v-card-text class="text-center">
            <v-row>
              <v-col cols="4">
                <v-subheader>Name Department</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                :value = "detailedDepartment.name"
                ></v-text-field>
              </v-col>
              
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-subheader>Room Owner</v-subheader>
              </v-col>
              <v-col cols="4" v-if = "detailedDepartment.Owner">
                <v-text-field
                :value = "detailedDepartment.Owner.name"

                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-subheader>Room Manager</v-subheader>
              </v-col>
              <v-col cols="4" v-if = "detailedDepartment.Manager">
                <v-text-field
                :value = "detailedDepartment.Manager.name"
                ></v-text-field>
              </v-col> 
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
              <v-btn color="green" @click="update" v-if="user.isDepartmentManager ==='true' || user.isAdmin ==='true'">Update</v-btn>
            </v-card-actions>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-dialog v-model="dialogAddEmployee" width = "500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" v-if="user.isDepartmentManager ==='true' || user.isAdmin ==='true'">Add Employee</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Add Employee
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                 <v-col cols="6">
                    <v-select
                      v-model = "addEmployeeItem.idEmployee"
                      :items="employeeCandidates"
                      label="Employee"
                      item-text = "name"
                      item-value = "id"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model = "addEmployeeItem.idRole"
                      :items="roles"
                      label="Role"
                      item-text = "name"
                      item-value = "id"
                      required
                      :disabled= "addEmployeeItem.idEmployee===null"
                    ></v-select>
                  </v-col>
                </v-row> 
              </v-container> 
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="blue darken-1" text @click="cancelDialogAddEmployee">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveDialogAddEmployee">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
       <v-dialog v-model="dialogDetailedEmployee" width = "1000">
          <material-card
            color="green"
            title="Managed Assets Table"
          >
            <v-data-table
              :headers="headersAssets"
              :items="detailedAssetsEmployee.Managed"
              :items-per-page="5"
            >
              <template v-slot:item.action = "{ item }">
                <v-btn
                  icon
                >
                  <v-icon color="tertiary" @click="openDetailAsset(item)">
                    mdi-apps
                  </v-icon>
                </v-btn>
                
              </template>
            </v-data-table>
          </material-card>
        </v-dialog>
        <material-card
          color="green"
          title="Employees Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="detailedDepartment.Employee"
            :items-per-page="5"
          >
            <template v-slot:item.action = "{ item }">
              <v-btn
                icon
              >
                <v-icon color="tertiary" @click="openManagedAssets(item)">
                  mdi-apps
                </v-icon>
              </v-btn>
              <v-btn
                icon
                v-if="user.isDepartmentManager ==='true' || user.isAdmin ==='true'"
              >
                <v-icon color="tertiary" @click="removeEmployee(item)">
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
    data : () => ({
      dialogBasicInfor: false,
      dialogDetailedEmployee: false,
      dialogAddEmployee: false,
      headers: [
        {
          sortable: true,
          text: 'Name Employee',
          value: 'name'
        },
        {
          sortable:true,
          text: 'Owner',
          value: 'Owner.name'

        },
        {
          sortable:true,
          text: 'Email',
          value: 'email'

        },
        {
          sortable:true,
          text: 'Address',
          value: 'address'

        },
        {
          sortable:true,
          text: 'Phone',
          value: 'phoneNumber'

        },
        {
          sortable:true,
          text: 'Role',
          value: 'Role.name'

        },
        { text: 'Managed Assets', 
          value: 'action', 
          sortable: false 
        },
      ],
      headersAssets: [
        {
          sortable: true,
          text: 'Asset Code',
          value: 'assetCode'
        },
        {
          sortable: true,
          text: 'Asset Type',
          value: 'AssetType.name'
        },
        {
          sortable: true,
          text: 'Purpose',
          value: 'Purpose.name'
        },
        {
          sortable:true,
          text: 'Owner',
          value: 'Owner.name'

        },
        {
          sortable:true,
          text: 'Manager',
          value: 'Manager.name'

        },
        { text: 'Actions', 
          value: 'action', 
          sortable: false 
        },
      ],
      eidtedBasicRoom: {
        name: "",
        managerId: null,
        id: null,
      },
       eidtedBasicRoomDefault: {
        name: "",
        managerId: null,
        id: null,
      },
      addEmployeeItem: {
        idRoom: null,
        idEmployee: null,
        idRole: null,
      },
      addEmployeeItemDefault: {
        idRoom: null,
        idEmployee: null,
        idRole: null,
      }

    }),
    mounted () {
      
    },
    created(){

    },

    computed : {
      detailedDevice() {

      },
      ...mapState({
        departments: 'Departments',
        detailedDepartment: 'detailedDepartment',
        detailedAssetsEmployee: 'detailedAssetsEmployee',
        user: 'user',
        employeeCandidates: 'employeeCandidates',
        roles: 'Roles',
      }),


    },
    beforeCreate(){
      this.$store.dispatch("getDetailedDepartmentDB", this.$store.state.detailedDepartmentId)
      this.$store.dispatch('getEmployeeCandidates')
      this.$store.dispatch("getRolesDB")
    },
    created(){
      if(this.user.isDepartmentManager !=='true' && this.user.isAdmin !=='true'){
        this.headersAssets.splice(this.headersAssets.length-1, 1)
        console.log(this.headersAssets)
      }
    },

    methods: {
      cancel(){
        Object.assign(this.eidtedBasicRoom, this.eidtedBasicRoomDefault)
        this.dialogBasicInfor = false

      },
      save(){
        this.eidtedBasicRoom.id = this.detailedDepartment.id
        let updateInforRoom = Object.assign({}, this.eidtedBasicRoom)

        this.$store.dispatch("updateBasicInforDepartment", updateInforRoom)
        this.cancel()
      },
      update(){
        this.eidtedBasicRoom.name = this.detailedDepartment.name
        if(this.detailedDepartment.Manager){
          this.eidtedBasicRoom.managerId = this.detailedDepartment.Manager.id
          console.log(this.detailedDepartment.Manager.id)
        }
        this.dialogBasicInfor = true

      },
      openManagedAssets(item){
        console.log(item.id)
        let idEmployee = item.id
        this.$store.dispatch('getManagedAssetsEmployee', idEmployee) 
        this.dialogDetailedEmployee = true
      },
      openDetailAsset(item){
        this.$store.commit('changeDetailedAsset', item)
        this.$router.push({ name: 'detailed-assets'})
      },
      cancelDialogAddEmployee(){
        Object.assign(this.addEmployeeItem, this.addEmployeeItemDefault)
        this.dialogAddEmployee = false

      },
      saveDialogAddEmployee(){
        this.addEmployeeItem.idRoom = this.$store.state.detailedDepartmentId
        let addItem = Object.assign({}, this.addEmployeeItem)
        console.log(addItem)
        this.$store.dispatch("addEmployeetoDepartment", addItem)
        this.cancelDialogAddEmployee()
      },
      removeEmployee(item){
        let removeItem = {idRoom: item.departmentId, idEmployee: item.id}
        this.$store.dispatch('removeEmployeeDepartment', removeItem)
        
      }

    }


  }
</script>
