import classes from "./User.module.css";

const User = (props) => {
  const itemClassName = `${classes.user} ${
    props.isSelected ? classes.selected : ""
  }`;

  return (
    <li className={itemClassName} onClick={() => props.onUserClick(props.name)}>
      {props.id !== "no-data" ? (
        <>{props.name}</>
      ) : (
        <div className={classes.noData}>
          <img src={props.image} alt="No Data" />
          <span>{props.name}</span>
        </div>
      )}
    </li>
  );
};

export default User;
