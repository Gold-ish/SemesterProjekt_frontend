import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export function Header({
  isLoggedIn,
  loginMsg,
  username,
  roles,
  setSearchResult,
}) {
  const [search, setSearch] = useState("");
  let history = useHistory();
  const searchF = (evt) => {
    evt.preventDefault();
    history.push("/search");
    setSearchResult(search);
    setSearch("");
  };

  const onChange = (evt) => {
    evt.preventDefault();
    setSearch(evt.target.value);
  };

  const renderRoleButton = (roles) => {
    if (roles.includes("user") || roles.includes("critic")) {
      return (
        <li className="right">
          <NavLink activeClassName="active" to="/user">
            {username}
          </NavLink>
        </li>
      );
    } else if (roles.includes("admin")) {
      return (
        <li className="right">
          <NavLink activeClassName="active" to="/admin">
            Admin page
          </NavLink>
        </li>
      );
    }
  };

  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>

      <li className="search">
        <InputGroup className="mb-3 searchform">
          <FormControl
            placeholder="Search movietitle"
            value={search}
            onChange={onChange}
          />
          <InputGroup.Append>
            <Button onClick={searchF}>search</Button>
          </InputGroup.Append>
        </InputGroup>
      </li>

      <li className="right">
        <NavLink activeClassName="active" to="/login-out">
          {loginMsg}
        </NavLink>
      </li>

      {isLoggedIn && <React.Fragment>{renderRoleButton(roles)}</React.Fragment>}

      {/* This down below? Do we still need this? */}
      {isLoggedIn && (
        <li>
          <p>
            User: {username}
            {"  "}
            Role: {roles}
          </p>
        </li>
      )}
    </ul>
  );
}
