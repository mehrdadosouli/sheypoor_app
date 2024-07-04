import Routers from './routes/Routers'
// react-query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import defaultConfig from './config/reactQuery'

function App() {
  const queryClient = new QueryClient({ defaultConfig })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routers />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
