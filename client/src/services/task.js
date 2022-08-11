export const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/task/get', {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
        },
      });
      if (response.status !== 200) return "";
      const task= await response.json();
      return task;
      } catch (err) {
      throw err;
      }
};
export const getTaskByStatus = async (status,page,pageSize) => {
  try {
    const response = await fetch(`http://localhost:3000/task?status=${status}&pageSize=${pageSize}&page=${page}`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
    });
    if (response.status !== 200) return "";
    const task= await response.json();
    return task;
    } catch (err) {
    throw err;
    }
};
export const deleteTask = async (_id) => {
  try {
    const response = await fetch(`http://localhost:3000/task/delete?_id=${_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
      },
    });
    if (response.status !== 200) return "";
    const task= await response.json();
    window.location.reload(false);
    return task;
    } catch (err) {
    throw err;
    }
};
export const updateTask = async (_id,data) => {
  console.log(data)
  try {
    const response = await fetch(`http://localhost:3000/task/update?_id=${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) return "";
    const task= await response.json();
    window.location.reload(false);
    return task;
    } catch (err) {
    throw err;
    }
};
export const createTask = async (data) => {
  console.log(data)
  try {
    const response = await fetch(`http://localhost:3000/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) return "";
    const task= await response.json();
    return task;
    } catch (err) {
    throw err;
    }
};