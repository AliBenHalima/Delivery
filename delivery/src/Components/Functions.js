
// export const checkAuth = ()=>{
//     let token =localStorage.getItem("token");
//     if (token){
//         state.isAuthenticated = true;
        
//         }else{
//             state.isAuthenticated = false }

// return state.isAuthenticated;
// }
// export const Signout=(cb)=>{
//     state.isAuthenticated=false ;
//     setTimeout(cb, 500);
// }

// export const PrivateRoute = ({component:Component, ...rest})=>(
//     <Route {...rest } render={(props)=>(
//         checkAuth()
//          ? <Component {...props} />
//         :
//         <Redirect to="/Login" />
    
//     )} />
//         )