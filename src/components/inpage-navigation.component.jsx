import { useRef, useState, useEffect } from "react";

export let activeTabLine;
export let activeTabRef;

const InpageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}) => {
  const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
  activeTabLine = useRef();
  activeTabRef = useRef();

  const changePageState = (btn, index) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.left = offsetLeft + "px";
    setInPageNavIndex(index);
  };

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, index) => (
          <button
            key={index}
            ref={index === defaultActiveIndex ? activeTabRef : null}
            className={
              "p-4 px-5 capitalize " +
              (inPageNavIndex == index ? "text-black " : "text-dark-grey ") +
              (defaultHidden.includes(route) ? " md:hidden " : " ")
            }
            onClick={(e) => {
              changePageState(e.target, index);
            }}
          >
            {route}
          </button>
        ))}
        <hr ref={activeTabLine} className="absolute bottom-0 duration-300 " />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InpageNavigation;
