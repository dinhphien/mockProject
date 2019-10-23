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
        <v-dialog v-model="dialog" width = "800">
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Hand Over
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="4">
                    <v-select
                      :items="departments"
                      label="Department"
                      item-text = "name"
                      item-value = "id"
                      required
                      @change="changDepartment"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="handOver.managedEmployeeId"
                      :items="detailedEmployeesDepartment.Employee"
                      label="Employee"
                      item-text = "name"
                      item-value = "id"
                      :disabled = "showEmployeeDepartment"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Comment"
                    v-model="handOver.comment"
                  />
                </v-col>
                </v-row>
              </v-container> 
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <material-card
          color="green"
          title="Detailed Asset"
        >
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Asset Code"
                    v-model = "editedAsset.assetCode"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Asset Type"
                    class="purple-input"
                    v-model="editedAsset.AssetType.name"
                    disabled
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Purpose"
                    class="purple-input"
                    v-model="editedAsset.Purpose.name"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Asset Infor"
                    class="purple-input"
                    v-model="editedAsset.assetInfor"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Status"
                    class="purple-input"
                    v-model="editedAsset.status"
                    disabled
                  />
                </v-col>

                

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Owner"
                    class="purple-input"
                    v-model="editedAsset.Owner.name"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Manager"
                    class="purple-input"
                    v-model="editedAsset.Manager.name"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Confirm"
                    v-model="editedAsset.confirm"
                    disabled
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Note"
                    v-model="editedAsset.note" 
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  class="text-center"
                >
                  <v-btn color="success" @click="handingOver">
                    Hand Over
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
  import { mapGetters, mapState} from 'vuex'
  export default {
    data : () => ({
      dialog: false,
      editedAsset: {
        assetCode: '',
        assetInfor: '',
        status: '',
        AssetType: {
          name: '',
        },
        Purpose: {
          name: ''
        },
        Owner: {
          name: ''
        },
        Manager: {
          name: ''
        }



      },
      showEmployeeDepartment: true,
      handOver: {
        assetId: null,
        comment: '',
        managedEmployeeId: null,
      },
      handOverDefault: {
        assetId: null,
        comment: '',
        managedEmployeeId: null,
      },
    }),
    mounted () {
      Object.assign(this.editedAsset, this.$store.state.detailedAsset)
    },

    computed : {
      detailedDevice() {

      },
      ...mapState({
        departments: 'Departments',
        detailedEmployeesDepartment: 'detailedEmployeesDepartment'

      }),


    },
    beforeCreate(){
      this.$store.dispatch("getDepartmentsDB")
    },

    methods: {
      handingOver(){
        this.dialog = true
      },
      cancel(){
        Object.assign(this.handOver, this.handOverDefault)
        this.dialog = false

      },
      submit(){
        this.handOver.assetId = this.editedAsset.id
        let handOverItem = Object.assign({}, this.handOver)
        this.$store.dispatch("handingOver", handOverItem)
        this.cancel()
      },
      changDepartment(selectedDepartmentId){
        this.showEmployeeDepartment = false
        this.handOver.managedEmployeeId = null
       this.$store.dispatch("getEmployeesDepartmentDB", selectedDepartmentId)
      }

    }


  }
</script>
