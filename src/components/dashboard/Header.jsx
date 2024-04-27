import { CiSettings } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center pl-[22%] bg-[#eeeeee] pr-6 pt-6">
      <div>
        <p className=" font-bold text-2xl">Welcome,Gym</p>
        <p className=" opacity-60">manage your gym</p>
      </div>
      <div className="flex gap-3">
        <p className="h-[30px] bg-white items-center flex w-[30px] justify-center rounded-md">
          <CiSettings
            onClick={() => router.push("/panel/settings")}
            size={23}
          />
        </p>
        <p className="h-[30px] relative bg-white items-center flex w-[30px] justify-center rounded-md">
          <HiOutlineBellAlert
            onClick={() => router.push("/panel/notifications")}
            size={23}
          />
          <span className="absolute top-0 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </p>
      </div>
    </div>
  );
}

export default Header;
