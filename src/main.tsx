import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Table from './components/Table'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Table list={[]} />
  </StrictMode>,
)

