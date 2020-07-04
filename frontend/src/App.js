import React from 'react';
import './App.css';

import Search from "./components/Search";

const App = () => {
        return (
           <div className="App">
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"  crossOrigin="anonymous"/>

               <main>
               <h1>iTunes Retriever App</h1>
                <Search />
               </main>
               <footer>
               Created by Tunde Bello
               </footer>
           </div>
           );

}
export default App;
