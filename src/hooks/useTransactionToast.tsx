import { toast } from 'sonner'
import { ExplorerLink } from '../components/cluster/ClusterUI'

export function useTransactionToast() {
  return (signature: string) => {
    toast('Transaction sent', {
      description: <ExplorerLink transaction={signature} label="View Transaction" />,
    })
  }
}
