export const Backdrop = ({ backdrop, type, style }) => {
  return (
    <div
      className={`root backdrop`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        ...style,
      }}
    ></div>
  );
};
