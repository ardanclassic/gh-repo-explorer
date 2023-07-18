import { useState, useEffect } from "react";
import { Accordion } from "@szhsin/react-accordion";
import Loader from "components/loader";
import UserBox from "components/box_user";
import { GET_LIMIT_INFO, GET_USERNAME } from "services/core";
import { themeStore } from "states/store";
import nouser from "assets/images/no-user.svg";

const Home = () => {
  const theme: any = themeStore((state: any) => state.theme);
  const [loading, setloading] = useState(false);
  const [username, setUsername] = useState("");
  const [userlist, setUserlist] = useState([]);
  const [blankStatus, setblankStatus] = useState("");

  const styles = {
    actionBox: `wrapper flex flex-col gap-3 w-[300px] mx-auto px-3 py-6 rounded-3xl shadow-[0_0_16px_-4px_#ccc] ${
      theme === "dark" ? "text-white bg-slate-900" : "text-black"
    }`,
    inputField: `font-semibold py-2 px-3 rounded-md outline-none border ${
      theme === "dark" ? "text-white bg-slate-900 border-slate-700" : "text-black border-gray-300"
    }`,
    button: `py-2 px-6 rounded-md outline-none border cursor-pointer disabled:hover:bg-transparent disabled:text-gray-300 font-semibold hover:bg-slate-300 hover:text-slate-900 ${
      theme === "dark" ? " border-slate-500" : " shadow-[0_0_8px_0px_#ccc]"
    }`,
  };

  const getData = async (e: any) => {
    setloading(true);
    setUserlist([]);
    setblankStatus("enter username");
    e.preventDefault();

    try {
      const getLimitInfo: any = await GET_LIMIT_INFO();
      const getUser: any = await GET_USERNAME(username);
      getUser?.data?.items.length > 0 ? setUserlist(getUser?.data?.items) : setblankStatus("no user exist . . .");
      console.log(getLimitInfo.data.rate.remaining);
      setloading(false);
      return getUser;
    } catch (error: any) {
      setloading(false);
      setblankStatus("no user exist . . .");
      console.log(error.response.data.message);
    }
  };

  const ShowResult = () => {
    if (loading) {
      return (
        <div className="w-max mx-auto my-[20%]">
          <Loader size={24} color="#666" />
        </div>
      );
    } else {
      if (userlist.length > 0) {
        return (
          <div className="result-area">
            <div className="my-3 mx-auto text-gray-400 text-sm">Showing users from "{username}"</div>
            <Accordion className="flex flex-col gap-3">
              {userlist.map((user: any) => (
                <UserBox key={user.id} user={user} />
              ))}
            </Accordion>
          </div>
        );
      } else {
        return (
          <>
            {blankStatus && <img src={nouser} alt="empty" className="w-1/2 mx-auto my-3" />}
            <div className="mx-auto">{blankStatus}</div>
          </>
        );
      }
    }
  };

  return (
    <div className={styles.actionBox}>
      <div className="action-area">
        <form onSubmit={getData} className="flex flex-col gap-2">
          <input
            name="name"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
          />
          <button disabled={!username} type="submit" className={styles.button}>
            search
          </button>
        </form>
      </div>
      <ShowResult />
    </div>
  );
};

export default Home;
