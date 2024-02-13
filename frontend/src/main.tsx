import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Layout } from "Components/Layout"
import { OverviewPage } from "Pages/Overview"
import { SystemPage } from "Pages/System"
import GlobalStyles from "Styles/GlobalStyles"

import { TransactionsDetailPage, TransactionsListPage } from "./Pages/Transactions"

import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <OverviewPage />,
      },
      {
        path: "transactions/:id",
        element: <TransactionsDetailPage />,
      },
      {
        path: "transactions",
        element: <TransactionsListPage />,
      },
      {
        path: "system",
        element: <SystemPage />,
      },
    ],
  },
])
const queryClient = new QueryClient()

// Enable mocking in development using msw server set up for the browser
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  const { worker } = await import("./tests/mocks/browser")

  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  )
})
