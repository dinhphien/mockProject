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
            <v-btn color="primary" dark class="mb-2" v-on="on">New AssetType</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              {{titleDialogAddNewAssetType}}
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model = "editedAssetType.name" label="Name"></v-text-field>
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
          title="AssetTypes Table"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="assetTypes"
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
          text: 'Name AssetType',
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
      editedAssetType: {
        name: '',
      },
      defaultAssetType: {
        name: '',
      },
    }),

    computed: {
      titleDialogAddNewAssetType() {
        return this.editedIndex === -1 ? "Add AssetType" : 'Edit AssetType'
      },
      ...mapState({
        devices: 'devicesArray',
        roles: 'Roles',
        assetTypes: 'AssetTypes',

      }),

    },
    watch : {
      devices : function() {
  
      }
    },
    beforeCreate() {
      this.$store.dispatch("getAssetTypesDB")
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
        this.editedIndex = this.assetTypes.indexOf(item)
        console.log(this.editedIndex)
        this.editedAssetType = Object.assign({}, item)
        console.log(this.editedAssetType)
        this.dialog = true
        
      },
      deleteItem(item) {
        this.$store.dispatch('deleteAssetTypeDB', item)
      },
      cancel () {
        console.log("in cancel function")
        this.dialog = false
        this.editedIndex = -1
        Object.assign(this.editedAssetType, this.defaultAssetType)
      },
      save () {
        if(this.editedIndex > -1){
          // update the device
          let item = {editedAssetType: this.editedAssetType, index: this.editedIndex}
          this.$store.dispatch('editAssetTypeDB', item)
        }else {
          // create a new device
          let item = Object.assign({}, this.editedAssetType)
          this.$store.dispatch('addNewAssetTypetoDB', item)
        }
        this.cancel()
      }
    }
  }
</script>
