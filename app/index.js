import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './components/popular'
import Popular from './components/popular';

//What does a component have? They have their own states. And they manage em.
//They also have LifeCycle
//Then, UI
// function uwise(){
//     return false
// }
class App extends React.Component{
    render(){
        // const name='UWISE'
        return (
        // <div>
        //     {uwise()===true?<h3>HELLO {name}</h3>: <h3>WTF {name}</h3>}
        //     <p>Today's date: {new Date().toLocaleString()}</p>
        // </div>
        <Popular/>
        )
    }
}

ReactDOM.render(
<App/>,
document.getElementById('app')
)