/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TicketsImport } from './routes/tickets'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as CreateImport } from './routes/create'
import { Route as IndexImport } from './routes/index'
import { Route as TicketsTicketIdImport } from './routes/tickets/$ticketId'
import { Route as TicketTicketIdImport } from './routes/ticket.$ticketId'

// Create/Update Routes

const TicketsRoute = TicketsImport.update({
  path: '/tickets',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const CreateRoute = CreateImport.update({
  path: '/create',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TicketsTicketIdRoute = TicketsTicketIdImport.update({
  path: '/$ticketId',
  getParentRoute: () => TicketsRoute,
} as any)

const TicketTicketIdRoute = TicketTicketIdImport.update({
  path: '/ticket/$ticketId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/create': {
      id: '/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof CreateImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/tickets': {
      id: '/tickets'
      path: '/tickets'
      fullPath: '/tickets'
      preLoaderRoute: typeof TicketsImport
      parentRoute: typeof rootRoute
    }
    '/ticket/$ticketId': {
      id: '/ticket/$ticketId'
      path: '/ticket/$ticketId'
      fullPath: '/ticket/$ticketId'
      preLoaderRoute: typeof TicketTicketIdImport
      parentRoute: typeof rootRoute
    }
    '/tickets/$ticketId': {
      id: '/tickets/$ticketId'
      path: '/$ticketId'
      fullPath: '/tickets/$ticketId'
      preLoaderRoute: typeof TicketsTicketIdImport
      parentRoute: typeof TicketsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CreateRoute,
  DashboardRoute,
  TicketsRoute: TicketsRoute.addChildren({ TicketsTicketIdRoute }),
  TicketTicketIdRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/create",
        "/dashboard",
        "/tickets",
        "/ticket/$ticketId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/create": {
      "filePath": "create.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/tickets": {
      "filePath": "tickets.tsx",
      "children": [
        "/tickets/$ticketId"
      ]
    },
    "/ticket/$ticketId": {
      "filePath": "ticket.$ticketId.tsx"
    },
    "/tickets/$ticketId": {
      "filePath": "tickets/$ticketId.tsx",
      "parent": "/tickets"
    }
  }
}
ROUTE_MANIFEST_END */
