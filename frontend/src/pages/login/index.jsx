import React from "react"


const LoginComp = React.lazy(() => import('../../components/loginForm/LoginComp'))

const Login = () => {
  return (
    <div><LoginComp/></div>
  )
}

export default Login