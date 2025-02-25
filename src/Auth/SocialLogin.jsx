
import { Link, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSingIn } = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const handleGoogleSingIn = () => {
    googleSingIn()
      .then(result => {
        console.log(result);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          img: result.user?.photoURL,
          userId: result.user?.uid,
        }
        console.log(userInfo)
        axiosPublic.post('/users', userInfo)
          .then(res => {
          console.log(res.data);
          navigate('/')
        })
        
    })
}
  return (
    <div className="flex justify-center md:mt-[300px] mt-[200px]">
       <div className="divider"></div>
    
       <button
           onClick={handleGoogleSingIn}
            size="lg"
            className="flex h-12 px-5 border-blue-gray-200 items-center justify-center gap-2 border-2 rounded-md py-2 hover:bg-slate-300 text-black duration-500" >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
      </button>
      
      <Link to={'/'}><button className="btn btn-neutral"><FaLongArrowAltLeft /> Back</button></Link>
    </div>
  );
};

export default SocialLogin;