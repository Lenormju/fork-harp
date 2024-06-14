import { OnQuerySuccess } from "Components/Utilities/OnQuerySuccess.tsx"
import { useOverviewDataQuery } from "Domain/Overview"

import { TransactionsHistoryOnQuerySuccess } from "./TransactionsHistoryOnQuerySuccess.tsx"

interface TransactionsHistoryProps {
  endpoint?: string
  title?: string
  className?: string
  timeRange?: string
}

export const TransactionsHistory = ({ endpoint, title, className, timeRange }: TransactionsHistoryProps) => {
  const query = useOverviewDataQuery(endpoint, timeRange)

  return (
    <OnQuerySuccess query={query} queries={[query, query]}>
      {(query) => {
        return <TransactionsHistoryOnQuerySuccess data={query.data} title={title} className={className} />
      }}
    </OnQuerySuccess>
  )
}
