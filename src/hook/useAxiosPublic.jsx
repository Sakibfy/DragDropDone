import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://drag-drop-done-server.vercel.app'
})
const useAxiosPublic = () => {

  return axiosPublic;
};

export default useAxiosPublic;
