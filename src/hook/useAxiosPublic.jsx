import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://task-haven-server.vercel.app'
})
const useAxiosPublic = () => {

  return axiosPublic;
};

export default useAxiosPublic;
