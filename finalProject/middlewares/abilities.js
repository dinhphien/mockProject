const { AbilityBuilder, Ability } = require('casl')

function defineAbilitiesFor(user) {
  const { rules, can } = AbilityBuilder.extract()

  if (user.role === "admin") {
    //console.log("In admin branch")
    can('manage', 'all')  
  }
  else if(user.role === "employee"){
    //console.log("In employee branch")
    can(['update'], ["Users"], {id: user.id})
  }
  else{
    //console.log("In else branch")
    can(['update'], ["Users"], {id: user.id})
  }

  return new Ability(rules) 
}


module.exports = function createAbilities(req, res, next) {
  req.ability = defineAbilitiesFor(req.user)
  next()
}