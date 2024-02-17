import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = ({ profile }) => {
  const { name, email, id } = profile;

  let fibercatedName;
  if (name) {
    fibercatedName = name.split(" ");
  }
  const firstName = fibercatedName ? fibercatedName[0] : null;

  let lastName;
  if (fibercatedName && fibercatedName.length > 1) {
    lastName = fibercatedName[fibercatedName.length - 1];
  }

  const imageUrl = `https://scontent.fdel3-3.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_ohc=1IEA7QUVPPQAX_g-I4G&_nc_ht=scontent.fdel3-3.fna&edm=AP4hL3IEAAAA&oh=00_AfAt_ufy77bAUnneqH0CYJ46ECECc0qZ3mlh1Y19U2Lfew&oe=65F7CE59`;
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.customerPanel}>
          <img src={imageUrl} alt="" placeholder="profilePicture" />
          <h3>{name}</h3>
          <p>
            <span>&#8226;</span>Offline
          </p>
          <div className={styles.buttonGroup}>
            <button className="call">
              {" "}
              <img src="call.png" alt="" />
              Call
            </button>
            <button className="call">
              <img src="user.png" alt="" />
              Profile
            </button>
          </div>
        </div>

        <div className={styles.customerDetails}>
          <h3>Customer Details</h3>
          <div>
            <p>Email</p>
            <p>{email}</p>
          </div>
          <div>
            <p>First Name</p>
            <p>{firstName || "No First Name!"}</p>
          </div>
          <div>
            <p>Last Name</p>
            <p>{lastName || "No Last Name"}</p>
          </div>

          <Link to="">View more details</Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
