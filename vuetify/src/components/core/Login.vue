<template>
  <v-container fluid>
	    <v-row justify="center" align="center">
	      <v-col
	        cols="12"
	        lg="6"
	      >
	            <v-tabs
	              v-model="tabs"
	              background-color="green"
	              slider-color="green"
	              centered
	              grow
	            >
	            <v-tabs-slider></v-tabs-slider>
	              <v-tab class="mr-3" key = "login-tab">
	                Login
	              </v-tab>
	              <!-- <v-spacer/> -->
	             <!--  <v-tab class="mr-3" key = "register-tab">
	                Register
	              </v-tab> -->
	            </v-tabs>
	         <!--  </template> -->

	          <v-tabs-items v-model="tabs">
	          	<v-tab-item key = "login-tab">
	          		<v-card>
	          		  <v-card-text > 
				         <v-row justify = "center">
				         	<v-col cols="12" sm="6">
					            <v-text-field
					            label="Email"
					            placeholder="John@gmail.com"
					            outlined
					            v-model = "userLogin.email"
					            ></v-text-field>
					         </v-col>
				         </v-row>
				         <v-row justify = "center">
				         	<v-col cols="12" sm="6">
					            <v-text-field
					            label="PassWord"
					            placeholder="phien1234"
					            outlined
					            v-model = "userLogin.password"
					            ></v-text-field>
				         	</v-col>
				         </v-row>
	          		  </v-card-text>
				      <v-card-actions class="justify-center">
				      	<v-btn color="green" @click = "login">Login</v-btn>
				      </v-card-actions>    
	          		</v-card>	
	          	</v-tab-item>


	          	<!-- <v-tab-item key = "register-tab">
	          		<v-card>
	          		  <v-card-text > 
				         <v-row justify = "center">
				         	<v-col cols="12" sm="6">
					            <v-text-field
					            label="Email"
					            placeholder="John@gmail.com"
					            outlined
					            v-model = "userRegister.email"
					            ></v-text-field>
					         </v-col>
				         </v-row>
				         <v-row justify = "center">
				         	<v-col cols="12" sm="6">
					            <v-text-field
					            label="PassWord"
					            placeholder="phien1234"
					            outlined
					            v-model = "userRegister.password"
					            ></v-text-field>
				         	</v-col>
				         </v-row>
	          		  </v-card-text>
				      <v-card-actions class="justify-center">
				      	<v-btn color="green" @click = "register">Register</v-btn>
				      </v-card-actions>    
	          		</v-card>	
	          	</v-tab-item> -->
	          </v-tabs-items>

	      </v-col>
	    </v-row>
  </v-container>
</template>

<script>
  export default {
    data : () => ({
	    tabs: 0,
        userLogin: {
        	email: '',
        	password: ''
        },
        userRegister: {
        	email: '',
        	password: ''
        }
    
    }),
    methods: {
    	login() {
    		this.$store.dispatch("loginAccountDB", {...this.userLogin})

    	},
    	register() {
    		this.$store.dispatch("signupAccountDB", {...this.userRegister})

    	}

    }
  }
</script>
