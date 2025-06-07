
import { useSelector } from "react-redux";
import CrateCard from "../conponntas/crateCard";
import { TRootState } from "../store/store";


function CrateuserCard() {
  const user = useSelector((state: TRootState) => state.user.user);

  if(!user){
    window.location.href = "/"
    return null;
  }

  return (
    <CrateCard />
  );
}

export default CrateuserCard;