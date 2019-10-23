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
            <v-btn color="primary" dark class="mb-2" v-on="on">New Asset</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              {{titleDialogAddNewAsset}}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model = "editedAsset.assetCode" label="Asset Code"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model = "editedAsset.assetInfor" label="Asset Info"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-select
                      v-model="editedAsset.status"
                      :items="statuses"
                      label="Status"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="editedAsset.assetTypeId"
                      :items="assetTypes"
                      label="AssetType"
                      item-text = "name"
                      item-value = "id"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      v-model="editedAsset.assetPurposeId"
                      :items="purposes"
                      item-text = "name"
                      item-value = "id"
                      label="AssetPurpose"
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
          title="Assets Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="assets"
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
              <v-btn
                icon
              >
                <v-icon color="tertiary" @click="openDetail(item)">
                  mdi-apps
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
      editedIndex: -1,
      editedAsset: {
        id: null,
        assetCode: '',
        assetTypeId: null,
        assetInfor: '',
        assetPurposeId: null,
        status: '',
      },
      defaultAsset: {
        id: null,
        assetCode: '',
        assetTypeId: null,
        assetInfor: '',
        assetPurposeId: null,
        status: '',
      },
      statuses: [
        "In use",
      ]
    }),

    computed: {
      titleDialogAddNewAsset() {
        return this.editedIndex === -1 ? "Add Asset" : 'Edit Asset'
      },
      ...mapState({
        devices: 'devicesArray',
        roles: 'Roles',
        departments: 'Departments',
        employees: 'Employees',
        assetTypes: 'AssetTypes',
        purposes: 'Purposes',
        assets: 'Assets',

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
      this.$store.dispatch("getAssetTypesDB")
      this.$store.dispatch("getPurposesDB")
      this.$store.dispatch("getAssetsDB")
    },
    mounted () {

    },
    methods: {
      openDetail(selectedAsset){
        this.$store.commit('changeDetailedAsset', selectedAsset)
        this.$router.push({ name: 'detailed-assets'})

      },
      editItem(item){
        console.log(" in editItem")
        this.editedIndex = this.assets.indexOf(item)
        console.log(this.editedIndex)
        this.editedAsset = Object.assign({}, item)
        console.log(this.editedAsset)
        this.dialog = true
        
      },
      deleteItem(item) {
        this.$store.dispatch('deleteAssetDB', item)
      },
      cancel () {
        console.log("in cancel function")
        this.dialog = false
        this.editedIndex = -1
        Object.assign(this.editedAsset, this.defaultAsset)
      },
      save () {
        if(this.editedIndex > -1){
          // update the device
          console.log("In save function Assets.vue")
          let updatedItem = {
            id: this.editedAsset.id,
            assetCode: this.editedAsset.assetCode,
            assetTypeId:this.editedAsset.assetTypeId,
            assetInfor: this.editedAsset.assetInfor,
            assetPurposeId: this.editedAsset.assetPurposeId,
            status: this.editedAsset.status,
          }
          let item = {editedAsset: updatedItem, index: this.editedIndex}
          this.$store.dispatch('editAssetDB', item)
        }else {
          // create a new device
          let item = Object.assign({}, this.editedAsset)
          this.$store.dispatch('addNewAssettoDB', item)
        }
        this.cancel()
      }
    }
  }
</script>
