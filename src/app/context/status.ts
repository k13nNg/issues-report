import {useState, createContext, useContext} from 'react';

const StatusContext = createContext({status: "", setStatus: (param:any) => param});


export default StatusContext;