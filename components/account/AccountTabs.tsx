import { useEffect, useState } from 'react'
import mangoStore from '@store/mangoStore'
import TabButtons from '../shared/TabButtons'
import TokenList from '../TokenList'
import SwapHistoryTable from '../SwapHistoryTable'

const AccountTabs = () => {
  const [activeTab, setActiveTab] = useState('balances')
  const actions = mangoStore((s) => s.actions)
  const mangoAccount = mangoStore((s) => s.mangoAccount.current)
  const tradeHistory = mangoStore((s) => s.mangoAccount.stats.tradeHistory.data)
  const loading = mangoStore((s) => s.mangoAccount.stats.tradeHistory.loading)

  useEffect(() => {
    if (mangoAccount) {
      actions.fetchTradeHistory(mangoAccount.publicKey.toString())
    }
  }, [actions, mangoAccount])

  return (
    <>
      <div className="mb-4">
        <TabButtons
          activeValue={activeTab}
          onChange={(v) => setActiveTab(v)}
          values={['balances', 'swap:swap-history']}
          large
        />
      </div>
      {activeTab === 'balances' ? (
        <TokenList />
      ) : (
        <SwapHistoryTable tradeHistory={tradeHistory} loading={loading} />
      )}
    </>
  )
}

export default AccountTabs
