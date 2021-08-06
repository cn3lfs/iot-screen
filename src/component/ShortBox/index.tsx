import "./index.scss";
// 传递className, style等属性
function ShortBox(props) {
  return (
    <div {...props}>
      <div className="short-box">
        <div className="logo">
          <img
            className="logo-img"
            src={process.env.PUBLIC_URL + "/短背景.png"}
            alt=""
            srcSet=""
            width="100%"
          />
        </div>
        <div className="title text-center">{props.title}</div>
        <div className="inner-box">{props.children}</div>
      </div>
    </div>
  );
}

ShortBox.defaultProps = {
  title: "默认标题",
};

export default ShortBox;
