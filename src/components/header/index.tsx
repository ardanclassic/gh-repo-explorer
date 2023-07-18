import { useNavigate } from "react-router-dom";
import { themeStore } from "states/store";
import themeicon from "assets/icons/theme.png";

const Header = () => {
  const navigate = useNavigate();
  const theme: any = themeStore((state: any) => state.theme);
  const changeTheme = themeStore((state: any) => state.changeTheme);

  const styles = {
    header: `header flex items-center justify-center w-[300px] min-h-[44px] py-2 px-4 mx-auto rounded-bl-2xl rounded-br-2xl ${
      theme === "dark" ? " bg-slate-900 shadow-[0_0_16px_-4px_#ccc]" : " shadow-[0_0_12px_1px_#ccc]"
    }`,
    themeIcon: `w-[36px] shadow-[0_0_8px_0_#ddd] cursor-pointer rounded-full mx-auto my-8`,
  };

  return (
    <>
      <div className={styles.header}>
        <div className="menu title font-semibold text-[20px]" onClick={() => navigate("/")}>
          GH Repository Explorer
        </div>
      </div>

      <img
        src={themeicon}
        alt="theme"
        onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
        className={styles.themeIcon}
      />
    </>
  );
};

export default Header;
