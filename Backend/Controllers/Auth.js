const jwt = require('jsonwebtoken');

module.exports.Auth = (req,res,next)=>
{ const jwt = require('jsonwebtoken');
  try{
    const token = req.headers.authtoken;
    const decodedToken = jwt.verify(token, "my-secret-token");
    req.userData = {userId:decodedToken.userId};
    next();
  }
  catch(err)
  {
    res.json({isAuth:false});
  }
}

const AccessControl = require('role-acl');

const ac = new AccessControl();

ac.grant('User')

    .execute('read').on('Product')
     .execute('create').on('Product')
   
    .execute('manage').on('Product')
    

    .execute('create').on('Reservation')
    .execute('update').on('Reservation')

    .execute('create').on('User')
   
    .execute('update').on('User')

    //admin
    .grant('Admin')                   
    .extend('User')  
    
    
    .execute('read').on('Reservation')               
    .execute('delete').on('Reservation')
    .execute('delete').on('Product')
    .execute('update').on('Product')

    .execute('delete').on('User')
    


module.exports.isAuth4Product = (req,res,next)=>
{
  const token = req.headers.authtoken;
  const decodedToken = jwt.verify(token, "my-secret-token");
  req.userData = {userId:decodedToken.userId,role:decodedToken.role};
  const Role = req.userData.role;

  const permission = ac.can(Role).execute('update').execute('delete').sync().on('Product');

  if(permission.granted)
    {
      next();
      console.log("Authorized");
    }

  else
      res.json({Error:"You're not allowed to execute Product operations"});

}



module.exports.isAuth4Reservation = (req,res,next)=>
{
  const token = req.headers.authtoken;
  const decodedToken = jwt.verify(token, "my-secret-token");
  req.userData = {userId:decodedToken.userId,role:decodedToken.role};
  
  const Role = req.userData.role;

  const permission = ac.can(Role).execute('read').execute('delete').sync().on('Reservation');

  if(permission.granted)
    {
      next();
      console.log("Authorized");
    }

  else
  res.json({Error:"You're not allowed to execute Reservation operations "});
}

module.exports.isAuth4User = (req,res,next)=>
{
  const token = req.headers.authtoken;
  const decodedToken = jwt.verify(token, "my-secret-token");
  req.userData = {userId:decodedToken.userId,role:decodedToken.role};
  
  const Role = req.userData.role;
  const permission = ac.can(Role).execute('delete').sync().on('User');

  if(permission.granted)
    {
      next();
      console.log("Authorized");
    }

  else
  res.json({Error:"You're not allowed to execute Users operations"});
}