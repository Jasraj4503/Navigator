import { lazy } from "react";
const SingleUser = lazy(()=> import('../pages/SingleUser'))
const User_Form = lazy(()=> import('../pages/User_Form'))
const Home = lazy(()=> import('../pages/Home'))

const Routing = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/addUser',
        element: User_Form
    },
    {
        path: '/edit/:id',
        element: User_Form
    },
    {
        path: '/single-user/:id',
        element: SingleUser
    },
]

export default Routing