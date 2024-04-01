import { useDispatch } from "react-redux";
import authService from "../../utils/auth.utils";
import { logout } from "../../store/authslice.store";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  function Logouthandler() {
    authService.logout().then(() => dispatch(logout()));
  }

  return (
    <button
      onClick={Logouthandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
