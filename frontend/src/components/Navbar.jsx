import { memo } from "react";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const image = `https://scontent.fdel11-4.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_ohc=1IEA7QUVPPQAX-G0KdA&_nc_ht=scontent.fdel11-4.fna&edm=AP4hL3IEAAAA&oh=00_AfCCrl4pLe7ch3ZC-e7Hyrs4oSp93qjKbMXTElagDFp9xA&oe=65F83ED9`;

  const { profileData } = useSelector((state) => state.pages);
  let url;
  if (profileData) {
    url = profileData.picture.data.url;
  }
  // const inboxIcon = "/Vector.png";

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.master}>
          <a>
            <img className={styles.iconBackground} src="/social.png"></img>
          </a>
          <a className={styles.selected}>
            <img src="/inbox_blue.png"></img>
          </a>
          <a>
            <img src="/group.png"></img>
          </a>
          <a>
            <img src="/growth.png"></img>
          </a>
        </div>
        <div className={styles.image}>
          <img className={styles.profilePic} src={url || image}></img>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
