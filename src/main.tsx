import { createRoot } from 'react-dom/client'
import Table from './lib/Table'

const App = () => <Table list={[]} />

createRoot(document.getElementById('root')!).render(
  <App />
)

