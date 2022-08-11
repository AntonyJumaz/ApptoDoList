import './styles.css';
import CardTask from "../card/component";
import { useEffect, useState } from 'react';
import { createTask, getTaskByStatus} from '../../services/task';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Status = {
    pending : 'pending',
    InProgress : 'In Progress',
    Done : 'Done',
};

export const MainPage=()=>{
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    const [statusForm, setStatusForm] = useState('pending');
    const [open, setOpen] = useState(false);
    const [lista, setLista]=useState([]);
    const [opened, setOpened] = useState(false);
    const handleChange = (event) => {
        setStatusForm(event.target.value);
    };

    const handleOpen = () => {
      setOpened(true);
    };

    const handleClose = () => {
      setOpened(false);
      
    };

    const handleEvent = () => {
    setOpen(true);
    };
   
    const onSubmit = async (data) => {
    const created=await createTask(data);
    if(!created){
        window.location.reload(false);
    }
    }; 

    useEffect(()=>{
        const getList=async()=>{
            const list=await getTaskByStatus("pending","","");
            setLista(list);
        }
        getList();
    },[]);

    return(
    <div>
        <div>
        <Button onClick={handleOpen}>Create new Task</Button>
        <Modal
          hideBackdrop
          open={opened}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description">
          <Box sx={{ ...style }}>
            <h2 id="child-modal-title">Create new Task</h2>
            <div className="form-options">
            <form onSubmit={handleSubmit(onSubmit)}>
           <Typography id="transition-modal-title" variant="h6" component="h2">New Title</Typography>
            <textarea id="modal-title-task" 
             {...register("title", {
                required: true,
                maxLength: 120,
                minLength:10
              })}
            />
                  {errors?.title?.type === "required" && <p>This field is required</p>}
                  {errors?.title?.type === "maxLength" && (<p>Title name cannot exceed 120 characters</p>)}
                  {errors?.title?.type === "minLength" && (<p>Title name need to be more than 10 characters</p>)}
            <Typography id="transition-modal-description" className='input-description'>New Description</Typography>
            <textarea id="modal-description-task" 
                        className='modal-description-task'
                         {...register("description", {
                            required: true,
                            maxLength: 1000,
                            minLength:100,
                          })}
            />
                            {errors?.description?.type === "required" && <p>This field is required</p>}
                            {errors?.description?.type === "maxLength" && (<p>description name cannot exceed 1000 characters</p>)}
                            {errors?.description?.type === "minLength" && (<p>description name need to be more than 100 characters</p>)}
            <div className='form-options'>
            <InputLabel id="demo-simple-select-autowidth-label">Status: </InputLabel>
            <Select
            {...register("status",{required:true})} 
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              defaultValue={statusForm}
              onChange={handleChange}
               autoWidth
               label="Age"
             >
                {Object.values(Status).map((status) => (
                    <MenuItem
                      key={'register-gender-option-' + status} value={status}> {status}
                    </MenuItem>
                  ))}
            </Select>
            </div>
            <div className='buttons-Modal'>
            <Button onClick={handleClose}>CANCEL</Button>
            <input type="submit" className="confirm-input" value="Confirm"/>
            </div>
            </form>
            </div>
          </Box>
        </Modal>
        </div>
        {Array.isArray(lista)?
        <><div className="task-Container">
                    {lista.map((lista, index) => (
                        <CardTask
                            {...lista}
                            key={`tasks-${index}`}
                            onPress={handleEvent} />
                    ))}
                </div>
                </>
        :
        <div>NO LO HACE</div>
    }
    </div>
   );
}

export default MainPage;