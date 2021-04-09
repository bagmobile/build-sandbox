import Calc from "./calc";
import Log from "./log";
import img from "./123.jpg"
import React from 'react';
import ReactDOM from 'react-dom';
import './new.scss'
import './main.css'

const App = () => (<>
    <p className="my">Hello world 123</p>
    <p className="my">dfgdfgdgdfg</p>
</>);

ReactDOM.render(<App/>, document.getElementById('root'));

const calc = new Calc();
const log = new Log();

log.log(calc.sum(1, 2, 3, 4, 5, 6, 7));

const el = document.createElement('img');
el.src = img;
document.body.append(el);
