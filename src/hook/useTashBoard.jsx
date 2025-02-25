import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "../Auth/useAuth";


const useTashBoard = () => {
  const axiosPublic = useAxiosPublic()
  const user = useAuth()
  const userId = user?.user?.userId;


  const { refetch, data: tasks = []} = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/Tasks/${userId}`);
      return res.data;
    }
  })
  
  // console.log( refetch);
  return [tasks, refetch]
};

export default useTashBoard;