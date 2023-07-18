import { useState, useEffect, useRef } from "react";
import { AccordionItem } from "@szhsin/react-accordion";
import Loader from "components/loader";
import { GET_REPOSITORY } from "services/core";
import { themeStore } from "states/store";
import blankimage from "assets/images/blank.svg";
import "./style.scss";

const UserBox = ({ user }: any) => {
  const theme: any = themeStore((state: any) => state.theme);
  const boxRepo: any = useRef();
  const [loading, setloading] = useState(false);
  const [subloading, setsubloading] = useState(false);
  const [userrepo, setuserrepo] = useState([]);
  const [page, setpage] = useState(1);

  const styles = {
    repobox: `relative text-sm p-2 rounded-md ${
      theme === "dark" ? "text-white bg-slate-800" : "text-black bg-[#e7e7e7]"
    }`,
    repoArea: `content max-h-[250px] overflow-y-auto flex flex-col gap-2 px-2 py-3`,
  };

  const onScroll = async () => {
    if (boxRepo.current) {
      const { scrollTop, scrollHeight, clientHeight } = boxRepo.current;
      if (!subloading && scrollTop + clientHeight === scrollHeight) {
        setsubloading(true);
        setpage(page + 1);
        const getListRepo: any = await GET_REPOSITORY(user.login, page + 1);
        setuserrepo((prevState): any => [...prevState, ...getListRepo.data]);
        setsubloading(false);
      }
    }
  };

  const openBox = async () => {
    setloading(true);
    setpage(1);
    const getListRepo: any = await GET_REPOSITORY(user.login, page);
    setuserrepo(getListRepo.data);
    setTimeout(() => setloading(false), 300);
  };

  const ShowRepo = () => {
    if (loading) {
      return (
        <div className="w-max mx-auto my-[24px]">
          <Loader size={24} color="#555" />
        </div>
      );
    } else {
      if (userrepo.length > 0) {
        return (
          <>
            {userrepo.map((repo: any) => {
              return (
                <div key={repo.id} className={styles.repobox}>
                  <div className="name mb-2 font-semibold break-words">{repo.name}</div>
                  <div className="desc text-[12px] w-[85%] break-words">{repo.description}</div>
                  <div className="stars font-bold text-[12px] absolute top-2 right-2">
                    {repo.stargazers_count} &#9734;
                  </div>
                </div>
              );
            })}
            {subloading && (
              <div className="w-max mx-auto my-[24px]">
                <Loader size={24} color="#555" />
              </div>
            )}
          </>
        );
      } else {
        return (
          <>
            <img src={blankimage} alt="blank" className="w-1/2 mx-auto my-3" />
            <div className="mx-auto">no data . . .</div>
          </>
        );
      }
    }
  };

  return (
    <AccordionItem header={user.login} className={`accordion-header ${theme}`} onClick={openBox}>
      <div className={styles.repoArea} onClick={(e) => e.stopPropagation()} onScroll={onScroll} ref={boxRepo}>
        <ShowRepo />
      </div>
    </AccordionItem>
  );
};

export default UserBox;
