import ApdexBadge from "Components/Badges/ApdexBadge.tsx"
import { OverviewData } from "Models/Overview"
import { H3 } from "ui/Components/Typography"

import { TransactionsChart } from "./Charts"

export interface TransactionsHistoryOnQuerySuccessProps {
  data: OverviewData
  title?: string
  className?: string
}

export const TransactionsHistoryOnQuerySuccess = ({
  data,
  title,
  className,
}: TransactionsHistoryOnQuerySuccessProps) => {
  const meanDurationSeconds = Math.trunc(data.meanDuration) / 1000
  const meanApdex = Math.trunc(data.meanApdex)
  const errorsRate = Math.trunc(data.errors.rate * 100)
  return (
    <div className={className}>
      <H3>{title}</H3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="flex flex-col items-center">
          <div className="flex self-center">
            <ApdexBadge score={meanApdex} size="xl" />
          </div>
          <div className="grid grid-cols-2 text-xs text-left align-text-bottom items-center self-center ml-10 mt-10">
            <span className="font-bold">Mean duration:</span>
            <span>{meanDurationSeconds} s</span>
            <span className="font-bold">Errors:</span>
            <span>{errorsRate}%</span>
          </div>
        </div>
        <TransactionsChart data={data.transactions} width="90%" timeRange={data.timeRange}></TransactionsChart>
      </div>
    </div>
  )
}
