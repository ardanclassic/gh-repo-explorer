import { useNavigate } from "react-router-dom";
import { themeStore } from "states/store";

const Header = () => {
  const navigate = useNavigate();
  const theme: any = themeStore((state: any) => state.theme);
  const changeTheme = themeStore((state: any) => state.changeTheme);

  const styles = {
    header: `header flex items-center justify-center w-[300px] min-h-[44px] py-2 px-4 mx-auto rounded-bl-2xl rounded-br-2xl ${
      theme === "dark" ? " bg-slate-900" : " shadow-[0_0_12px_1px_#ccc]"
    }`,
    themeBox: `theme flex items-center gap-2 justify-center w-[300px] mx-auto my-3 py-2 px-4 rounded-md font-semibold ${
      theme === "dark" ? "text-white bg-slate-900" : "text-black shadow-[0_0_12px_1px_#ccc]"
    }`,
  };

  return (
    <>
      <div className={styles.header}>
        <div className="menu title font-semibold text-[20px]" onClick={() => navigate("/")}>
          GH Repository Explorer
        </div>
      </div>

      <div className={styles.themeBox}>
        <div className="black cursor-pointer" onClick={() => changeTheme("dark")}>
          Dark
        </div>
        <div className="white cursor-pointer" onClick={() => changeTheme("light")}>
          Light
        </div>
      </div>
    </>
  );
};

export default Header;
