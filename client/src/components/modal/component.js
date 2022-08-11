import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useState } from 'react';
import './styles.css';
import { useForm } from "react-hook-form";
import { deleteTask, updateTask } from '../../services/task';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
function ChildModal({title,id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleConfirm = () => {
      deleteTask(id);
    };
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Delete</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 350, height:200 }}>
            <h2 id="child-modal-title">Confirm to delete {title}</h2>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
}
export default function ModalCard({setOpen,_id, title, description, status}) {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
  const handleClose = () => setOpen(false);
  const [statusForm, setStatusForm] = useState(status);
  const [edit, setEdit]=useState(false);
  const handleChange = (event) => {
    setStatusForm(event.target.value);
  };
  const editTaskPopUp = (event) => {
    setEdit(true);
  };
  const cancel = (event) => {
    setEdit(false);
  };
  const onSubmit = async (data) => {
   updateTask(_id,data);
  }; 
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Boolean(setOpen)}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Boolean(setOpen)}>
        <Box sx={style}>
          {edit?          
          <div className="form-options">
            <form onSubmit={handleSubmit(onSubmit)}>
           <Typography id="transition-modal-title" variant="h6" component="h2">New Title</Typography>
            <input id="modal-title-task" 
              defaultValue={title}
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
            <input id="modal-title-task" 
                          defaultValue={description}
                         {...register("description", {
                            required: true,
                            maxLength: 1000,
                            minLength:120,
                          })}
            />
                            {errors?.description?.type === "required" && <p>This field is required</p>}
                            {errors?.description?.type === "maxLength" && (<p>Title name cannot exceed 1000 characters</p>)}
                            {errors?.description?.type === "minLength" && (<p>Title name need to be more than 120 characters</p>)}
            <div className='form-options'>
            <InputLabel id="demo-simple-select-autowidth-label">Status: </InputLabel>
            {status==="Done"?"Done":<><Select
            {...register("status",{required:true})} 
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={handleChange}
               autoWidth
               label="Age"
               defaultValue={statusForm}
             >
                {Object.values(Status).map((status) => (
                    <MenuItem
                    key={'register-gender-option-' + status} value={status}> {status}
                  </MenuItem>
                  ))}
            </Select></>}
            </div>
            <div className='buttons-Modal'>
            <Button onClick={cancel}>CANCEL</Button>
            <input type="submit"/>
            </div>
            </form>
            </div>
         :
         <div className="form-options">
         <Typography id="transition-modal-title" variant="h6" component="h2">
          {title}
         </Typography>
         <Typography id="transition-modal-description" className='input-description'>
         {description}
         </Typography>
         <div className='form-options'>
         <InputLabel id="demo-simple-select-autowidth-label">Status: </InputLabel>
         <Typography id="transition-modal-description" >
          {status}
         </Typography> 
         </div>
         <div className='buttons-Modal'>
         <ChildModal title={title} id={_id}/>
         <Button onClick={editTaskPopUp}>EDITAR</Button>
         </div>
       </div>
          }
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}