import "./index.scss";
// 传递className, style等属性
function LongBox(props) {
  return (
    <div {...props}>
      <div className="long-box">
        <div className="logo">
          <img
            className="logo-img"
            src={process.env.PUBLIC_URL + "/长背景.png"}
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

LongBox.defaultProps = {
  title: "默认标题",
};

export default LongBox;
