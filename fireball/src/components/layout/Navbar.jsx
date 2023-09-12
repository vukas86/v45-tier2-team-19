import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { MdMenu } from 'react-icons/md';
import starryBg from '../../assets/starryMeteorHeader.png'

const Navbar = function ({ headerHeight }) {
  const [sticky, setSticky] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false)
  const [smallScreen, setSmallScreen] = useState(null)
  const navRef = useRef(null);

  useEffect(() => {
    if (collapsed) {
      setSmallScreen(true)
    }
  }, [])

  function handleSticky() {
    if (window.scrollY > headerHeight) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  function toggleCollapse() {
    if (window.outerWidth < 500) {
      setCollapsed(true);

    } else {
      setCollapsed(false);
    }


  }

  useEffect(() => {
    window.addEventListener("scroll", handleSticky, { passive: true });
  });

  useEffect(() => {
    window.addEventListener("resize", toggleCollapse, { passive: true });
  }, [collapsed]);

  useEffect(() => {
    toggleCollapse()
  }, [collapsed]);

  let menuList = [
    {
      name: 'Home',
      link: ""
    },
    {
      name: 'Table',
      link: 'Table'
    },
    {
      name: 'Map',
      link: "Map"
    },
    {
      name: 'Summary',
      link: "Summary"
    },
    {
      name: 'Credits',
      link: "Credits"
    }
  ]


  function handleMenuClose() {
    setToggled(!toggled)


  }
  return (

    <div className="navbar">
      <nav
        ref={navRef}
        style={
          sticky
            ? {
              position: "fixed",
              left: "0px",
              top: "0px",

            }
            : {}
        }
      >
        {collapsed == false ? (
          <ul>

            {menuList.map((item, index) => {
              return (
                <a href={`#${item.link}`} onClick={() => { handleMenuClose() }} key={index} >
                  <li>{item.name}</li>

                </a>)
            })}
          </ul>
        ) : (
          <div>
            {!toggled || smallScreen ? (
              <button className='collapsedBtn' onClick={() => { setToggled(!toggled) }} style={sticky ? { fontSize: '1em', backgroundColor: 'transparent' } : { padding: '0px', fontSize: '5em', alignSelf: 'center' }}><MdMenu /></button>

            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}>

                <nav  >
                  <ul className='collapsedUl' style={{
                    width: '100vw',
                    height: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    top: '0em',
                    left: '0px',
                    alignItems: 'center',
                    backgroundColor: 'var(--primary)',

                  }} >
                    {menuList.map((item, index) => {
                      return (
                        <a href={`#${item.link}`} onClick={() => { handleMenuClose() }} key={index} >
                          <li>{item.name}</li>

                        </a>

                      )


                    })}
                  </ul>

                </nav>
              </div>

            )
            }

          </div >

        )
        }
      </nav >
    </div >
  );
};

export default Navbar;
