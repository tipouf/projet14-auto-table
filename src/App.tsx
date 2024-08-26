import './App.css'
import Table from './components/Table'

type Props = []

function App(props: Props = []) {

  return (
    <>
      <Table list={props.length ? props : []}/>
    </>
  )
}

export default App
