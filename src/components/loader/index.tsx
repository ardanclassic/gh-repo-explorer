import "./style.scss";

interface Loader {
  size: number;
  color: string;
}

const Loader = ({ size, color }: Loader) => {
  return (
    <div className="spinner" style={{ width: size, height: size, borderTopColor: color, borderRightColor: color }} />
  );
};

export default Loader;
