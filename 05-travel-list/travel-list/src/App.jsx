const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.dir(e.target[0].value);
    console.dir(e.target[1].value);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need fro you 😍 trip ?</h3>
      <select>
        {new Array(20).fill(0).map(function (_, i) {
          return (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          );
        })}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer>
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
