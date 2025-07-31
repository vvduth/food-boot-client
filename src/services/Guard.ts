
import React, { type ComponentType } from "react"
import { useLocation, Navigate } from "react-router-dom"
import ApiService from "./ApiService"


// CustomerRoute component that protects routes for customer users only
export const CustomerRoute = ({element: Component}: {element: ComponentType}): React.ReactElement => {
  const location = useLocation()
  return ApiService.isCustomer() ? (
    React.createElement(Component)
  ): (
    React.createElement(Navigate, { to: "/login", state: { from: location }, replace: true })
  )
}

export const AdminRoute = ({element: Component}: {element: ComponentType}): React.ReactElement => {
  const location = useLocation()
  return ApiService.isAdmin() ? (
    React.createElement(Component)
  ): (
    React.createElement(Navigate, { to: "/login", state: { from: location }, replace: true })
  )
}

// export const DeliveryRoute = ({element: Component}: {element: ComponentType}): React.ReactElement => {
//   const location = useLocation()
//   return ApiService.isDeliveryPerson() ? (
//     React.createElement(Component)
//   ): (
//     React.createElement(Navigate, { to: "/login", state: { from: location }, replace: true })
//   )
// }