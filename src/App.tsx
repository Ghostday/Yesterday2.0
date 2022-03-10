import { useState } from 'react';

import './App.css';
import SearchBar from './Components/SearchBar'
import OverviewQuote from './Components/OverviewQuote'

function App() {
  const [search, setSearch] = useState<string>("")

  console.log(search)

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar searchFunc={setSearch} />
        {search ? <OverviewQuote stock={search} /> : null}
      </header>
    </div>
  );
}

export default App;
