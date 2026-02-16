import axios from "axios";

const API = "http://localhost:5000/api/activities";

export const getActivities = () => axios.get(API);
export const addActivity = (data) => axios.post(API, data);
export const deleteActivity = (id) => axios.delete(`${API}/${id}`);
export const updateActivity = (id, data) =>
  axios.put(`${API}/${id}`, data);
