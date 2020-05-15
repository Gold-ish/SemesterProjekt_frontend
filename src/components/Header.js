import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import logo from '../styles/pictures/blue-gold-fish5.png';

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
        <Nav.Link className="right">
          <NavLink activeClassName="active" to="/user">
            <p className="headerText">{username}</p>
          </NavLink>
        </Nav.Link>
      );
    } else if (roles.includes("admin")) {
      return (
        <Nav.Link className="right">
          <NavLink activeClassName="active" to="/admin">
            <p className="headerText">Admin page</p>
          </NavLink>
        </Nav.Link>
      );
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <NavLink exact activeClassName="active" to="/">
            <img src={logo} alt="Blue Goldfish" className="logo" />
          </NavLink>
        </Navbar.Brand>
        <Form inline className="searchform" onSubmit={searchF}>
          <FormControl type="text" className="mr-sm-2 search"
            placeholder="Search movietitle"
            value={search}
            onChange={onChange} />
          <Button variant="outline-info" onClick={searchF}>Search</Button>
        </Form>
        <Nav className="mr-auto">
          {isLoggedIn && <React.Fragment>{renderRoleButton(roles)}</React.Fragment>}
          <Nav.Link>
            <NavLink activeClassName="active" to="/login-out">
              <p className="headerText">{loginMsg}</p>
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
