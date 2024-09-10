import { createRoot } from 'react-dom/client'
import Table from './lib/Table'

interface TableProps {
  list?: []
}

const App = ({ list = [] }: TableProps) => <Table list={list} />

createRoot(document.getElementById('root')!).render(
  <App />
)

