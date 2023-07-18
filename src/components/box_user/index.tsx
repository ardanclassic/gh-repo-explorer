import { useState, useEffect, useRef } from "react";
import { AccordionItem } from "@szhsin/react-accordion";
import Loader from "components/loader";
import { GET_REPOSITORY } from "services/core";
import "./style.scss";

const UserBox = ({ user }: any) => {
  const boxRepo: any = useRef();
  const [loading, setloading] = useState(false);
  const [userrepo, setuserrepo] = useState([]);
  const [page, setpage] = useState(1);

  const onScroll = async () => {
    if (boxRepo.current) {
      const { scrollTop, scrollHeight, clientHeight } = boxRepo.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setpage(page + 1);
        const getListRepo: any = await GET_REPOSITORY(user.login, page + 1);
        setuserrepo((prevState): any => [...prevState, ...getListRepo.data]);
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
          <Loader size={24} color="#000" />
        </div>
      );
    } else {
      if (userrepo.length > 0) {
        return (
          <>
            {userrepo.map((repo: any) => {
              return (
                <div key={repo.id} className="relative text-sm bg-gray-800 p-2 rounded-md">
                  <div className="name mb-2 font-semibold break-words">{repo.name}</div>
                  <div className="desc text-[12px] w-[85%] break-words">{repo.description}</div>
                  <div className="stars font-bold text-[12px] absolute top-2 right-2">
                    {repo.stargazers_count} &#9734;
                  </div>
                </div>
              );
            })}
          </>
        );
      } else {
        return <div className="text-sm">no repo exist . . .</div>;
      }
    }
  };

  return (
    <AccordionItem header={user.login} onClick={openBox}>
      <div
        className="content max-h-[250px] overflow-y-auto flex flex-col gap-2 px-2 py-3"
        onClick={(e) => e.stopPropagation()}
        onScroll={onScroll}
        ref={boxRepo}
      >
        <ShowRepo />
      </div>
    </AccordionItem>
  );
};

export default UserBox;
