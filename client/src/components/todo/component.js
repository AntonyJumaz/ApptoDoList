import './styles.css';
import CardTask from "../card/component";
import AdjustIcon from '@mui/icons-material/Adjust';
import { green, orange, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { getTaskByStatus} from '../../services/task';
import UsePagination from '../pagination/component';
import ControllableStates from '../filter/component';

export const TodoPage=()=>{
    const [value, setValue] = useState();
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(10);
    const [pending, setPending]=useState([]);
    const [inProgress, setinProgress]=useState([]);
    const [Done, setDone]=useState([]);
    useEffect(()=>{
        const getList=async()=>{
            const listPending=await getTaskByStatus("pending",page,3);
            setPending(listPending);
            const listProgress=await getTaskByStatus("In Progress",page,3);
            setinProgress(listProgress);
            const listDone=await getTaskByStatus("Done",page,9);
            setDone(listDone);
            setNumberOfPages(9);
        }
        getList();
    },[page, value]);

    return(
    <div className='container'>
    <ControllableStates setValues={setValue}/>
    <div className="task-todoContainer">
     {value === "All" || value=== undefined || value===null? (
        <><div className='column-container'>
        <div className='status'> 
            <AdjustIcon style={{ color: red[500] }}/>
            <p> Pending</p>
        </div>
        {pending.map((pending,index)=>(
            <CardTask
            {...pending}
            key={`tasks-${index}`}
            />
        ))}
    </div>
    <div className='column-container'>
        <div className='status'> 
            <AdjustIcon style={{ color: orange[500] }}/>
            <p> In Progress</p>
        </div>
        {inProgress.map((inProgress,index)=>(
            <CardTask
            {...inProgress}
            key={`tasks-${index}`}
            />
        ))}
    </div>
    <div className='column-container'>
        <div className='status'> 
            <AdjustIcon style={{ color: green[500] }}/>
            <p>Done</p>
        </div>
        {Done.map((Done,index)=>(
            <CardTask
            {...Done}
            key={`tasks-${index}`}
            />
        ))}
        </div></>
     ):
     <>
     {value === "Pending" ? (
    <><div className='column-container'> <div className='status'> 
     <AdjustIcon style={{ color: red[500] }}/>
                            <p> Pending</p></div>{pending.map((pending,index)=>(<CardTask {...pending}key={`tasks-${index}`}/>
        ))}
    </div><div className='column-container'></div><div className='column-container'></div></>) : 
    <>{value==="In Progress"?(<>
        <div className='column-container'></div>
        <div className='column-container'>
        <div className='status'> 
            <AdjustIcon style={{ color: orange[500] }}/>
            <p> In Progress</p>
        </div>
        {inProgress.map((inProgress,index)=>(
            <CardTask
            {...inProgress}
            key={`tasks-${index}`}
            />
        ))}
    </div>
    <div className='column-container'></div>
        </>):
        <>
        <div className='column-container'></div>
        <div className='column-container'></div>
        <div className='column-container'>
        <div className='status'> 
            <AdjustIcon style={{ color: green[500] }}/>
            <p>Done</p>
        </div>
        {Done.map((Done,index)=>(
            <CardTask
            {...Done}
            key={`tasks-${index}`}
            />
        ))}
        </div>
        </>
        }</>
        }
     </>}
        
        <UsePagination setPage={setPage} pageNumber={numberOfPages} />
    </div>
    </div>
   );
}

export default TodoPage;