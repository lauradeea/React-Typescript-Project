import { Fragment, useState, useEffect, useRef } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
// import classes from "./UserFinder.module.scss";
import eventsImage from "../assets/images/emptyfolder.png";

interface User {
  id: string;
  name: string;
  image: string;
}

const DUMMY_USERS: User[] = [
  { id: "u1", name: "Chevrolet Camaro", image: "" },
  { id: "u2", name: "Mercedes-Benz", image: "" },
  { id: "u3", name: "Audi A3", image: "" },
  { id: "u4", name: "Austin Maestro", image: "" },
  { id: "u5", name: "Swzuki Swift", image: "" },
  { id: "u6", name: "Volkswagen T-Roc", image: "" },
  { id: "u7", name: "Volkswagen T-Cross", image: "" },
  { id: "u8", name: "Volkswagen Tiguan", image: "" },
];

const UserFinder: React.FC = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [usersVisible, setUsersVisible] = useState<boolean>(false); // State for controlling visibility

  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input element
  const dropdownRef = useRef<HTMLInputElement>(null); // Reference to the dropdown element

  useEffect(() => {
    const filtered = DUMMY_USERS.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      setFilteredUsers([
        {
          id: "no-data",
          name: "No Data",
          image: eventsImage || "",
        },
      ]);
    } else {
      setFilteredUsers(
        filtered.map((user) => ({
          ...user,
          image: user.image || "", // Provide a default value for undefined image
        }))
      );
    }
  }, [searchTerm]);

  useEffect(() => {
    // Add a click event listener to the document
    const handleDocumentClick = (event: MouseEvent) => {
      // Check if the clicked element is outside the dropdown area
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setUsersVisible(false); // Close the dropdown
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setUsersVisible(true); // Show the Users component when typing
  };

  const showButtonFilter = () => {
    setUsersVisible((prevVisible) => !prevVisible); // Show visibility when clicking the input
  };

  return (
    <Fragment>
      <div className={classes.finder} ref={dropdownRef}>
        <div className={classes.inputField}>
          <div className={classes.floatingroup}>
            <input
              type="search"
              ref={inputRef}
              onClick={showButtonFilter}
              onChange={searchChangeHandler}
              required
            />
            <label className={classes.floatinglabel}>Cars</label>
          </div>
          <div
            className={`${classes.arrow} ${
              usersVisible ? classes.arrowUp : classes.arrowDown
            }`}
          ></div>
        </div>
        {usersVisible && <Users users={filteredUsers} />}
        {/* Render Users component conditionally */}
      </div>
    </Fragment>
  );
};

export default UserFinder;
