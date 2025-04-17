import InputTodo from "./components/InputTodo";
import BasicTable from "./components/ShowTodo";

function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <br />
        <BasicTable />
      </div>
    </>
  );
}

export default App;
