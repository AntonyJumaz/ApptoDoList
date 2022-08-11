import './styles.css';
import {useState } from 'react';
import ModalCard from '../modal/component';
export const CardTask = ({_id,title,description,status,onPress})=>{
    const [open,setOpen] = useState(false);
    const handleEvent = () => {
        setOpen(true);
      };
    let limit=120;
    return(
        <>
        <div className="list-card" onClick={handleEvent}>
            <div className = "card-wrapper">
                    <div className= "card-status">{status}</div>
                    <div className= "card-title">{title}</div>
                    <div className= "card-description">{description.length > limit?description.substring(0,limit) +"...":"nono"}</div>
            </div>
        </div>
        <div>
        <>{open? <ModalCard setOpen={setOpen} title={title} description={description} status={status} _id={_id} />:""} </>
        </div>
        </>
    );
}

export default CardTask;