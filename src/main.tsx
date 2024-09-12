import { createRoot } from 'react-dom/client'
import { Table } from '../lib/components/Table'


const App = () => <Table list={[  {
  "firstName": "Ava",
  "lastName": "Hall",
  "dateOfBirth": "1985-03-15",
  "startDate": "2020-08-01",
  "street": "1234 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701",
  "department": "Sales"
},
{
  "firstName": "Liam",
  "lastName": "Brown",
  "dateOfBirth": "1992-05-03",
  "startDate": "2020-04-01",
  "street": "5678 Oak St",
  "city": "Decatur",
  "state": "IL",
  "zipCode": "62523",
  "department": "Marketing"
}]} />

createRoot(document.getElementById('root')!).render(
  <App />
)

