/* eslint-disable */

const Logo = ({ width = "50px", height = "20px" }) => {
  return (
    <div>
      <img
        height={height}
        width={width}
        src="/src/assets/logo.png"
        alt="logo of the website"
      />
    </div>
  );
};

export default Logo;
