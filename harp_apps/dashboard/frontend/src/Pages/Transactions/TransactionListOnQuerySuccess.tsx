import { useState } from "react"
import { QueryObserverSuccessResult } from "react-query/types/core/types"
import { useLocation, useNavigate } from "react-router-dom"

import { OnQuerySuccess } from "Components/Utilities/OnQuerySuccess.tsx"
import { ItemList } from "Domain/Api/Types"
import { useTransactionsDetailQuery } from "Domain/Transactions"
import { Transaction } from "Models/Transaction"
import { Filters } from "Types/filters"

import { DetailsCloseButton, FiltersHideButton, FiltersShowButton, OpenInNewWindowLink } from "./Components/Buttons.tsx"
import { TransactionDataTable } from "./Components/List/index.ts"
import { FiltersSidebar } from "./Containers/index.ts"
import { TransactionDetailOnQuerySuccess } from "./TransactionDetailOnQuerySuccess.tsx"

export function TransactionListOnQuerySuccess({
  query,
  filters,
  setFilters,
}: {
  query: QueryObserverSuccessResult<ItemList<Transaction> & { total: number; pages: number; perPage: number }>
  filters: Filters
  setFilters: (filters: Filters) => void
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const [selected, setSelected] = useState<Transaction | null>(null)
  const selectedId = selected?.id || queryParams.get("selected")
  const hasSelection = !!selectedId
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)
  const detailQuery = useTransactionsDetailQuery(selected?.id || selectedId!)

  const updateQueryParam = (paramName: string, paramValue: string | undefined) => {
    if (paramValue) {
      queryParams.set(paramName, paramValue)
    } else {
      queryParams.delete(paramName)
    }

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    })
  }

  return (
    <div className="flex w-full items-start gap-x-8 relative">
      {isFiltersOpen ? (
        <aside className="sticky top-8 hidden w-1/5 min-w-40 max-w-60 2xl:min-w-52 2xl:max-w-72 shrink-0 lg:block">
          <div className="text-right">
            <FiltersHideButton onClick={() => setIsFiltersOpen(false)} />
          </div>
          <FiltersSidebar filters={filters} setFilters={setFilters} />
        </aside>
      ) : (
        <FiltersShowButton onClick={() => setIsFiltersOpen(true)} />
      )}

      <main className="flex-1 overflow-auto">
        <TransactionDataTable
          transactions={query.data.items}
          onSelectionChange={(newSelected) =>
            newSelected && newSelected.id && (!hasSelection || selected?.id != newSelected.id)
              ? (setSelected(newSelected), updateQueryParam("selected", newSelected.id))
              : (setSelected(null), updateQueryParam("selected", undefined))
          }
          selected={selected ? selected : undefined}
        />
      </main>

      {hasSelection ? (
        <aside className="sticky top-8 w-2/5 min-w-96 shrink-0 block">
          <div className="text-right">
            <OpenInNewWindowLink id={selectedId} />
            <DetailsCloseButton onClick={() => (setSelected(null), updateQueryParam("selected", undefined))} />
          </div>

          <OnQuerySuccess
            query={detailQuery}
            onQueryError={() => (setSelected(null), updateQueryParam("selected", undefined))}
          >
            {(query) => {
              setSelected(query.data)
              return <TransactionDetailOnQuerySuccess query={query} />
            }}
          </OnQuerySuccess>
        </aside>
      ) : null}
    </div>
  )
}
