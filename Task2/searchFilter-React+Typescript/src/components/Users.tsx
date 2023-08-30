import { useState } from "react";
import User from "./User";

import classes from "./Users.module.css";
// import classes from "./Users.module.scss";

interface User2 {
  id: string;
  name: string;
  image: string;
}

interface UsersProps {
  users: User2[];
}

const Users: React.FC<UsersProps> = (props) => {
  const [selectedUserName, setSelectedUserName] = useState<string[]>([]);

  const handleUserClick = (userName: string) => {
    setSelectedUserName((prevUserNames) => {
      if (prevUserNames.includes(userName)) {
        return prevUserNames.filter((name) => name !== userName);
      } else {
        return [...prevUserNames, userName];
      }
    });
  };

  const usersList = (
    <div className={classes.scrollableList}>
      <ul>
        {props.users.map((user) => (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            isSelected={selectedUserName.includes(user.name)}
            onUserClick={handleUserClick}
          />
        ))}
      </ul>
    </div>
  );

  return (
    <div className={classes.users}>
      {usersList}

      {selectedUserName && (
        <div className={classes.list}>
          {selectedUserName.map((name) => (
            <span key={name} className={classes.selectedUser}>
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default Users;
