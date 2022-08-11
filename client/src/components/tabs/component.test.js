import React from 'react'
import ReactDOM from 'react-dom';
import { BasicTabs } from './component';
import {isTSAnyKeyword} from '@babel/types';

it("renders without crashing", ()=>{
    const box = document.createElement("Box");
    ReactDOM.render(<Tabs></Tabs>, box)

})