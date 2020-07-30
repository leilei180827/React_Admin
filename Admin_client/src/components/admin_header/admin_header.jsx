import React, { useState, useEffect } from "react";
import LinkButton from "../link_button/link_button";
import { withRouter } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { connect } from "react-redux";
import "./admin_header.less";
function AdminHeader(props) {
  const [clock, setClock] = useState(Date.now());
  useEffect(() => {
    let clockTimer = setInterval(() => {
      setClock(Date.now());
    }, 1000);
    return () => {
      clearInterval(clockTimer);
    };
  }, []);
  const logout = () => {
    props.history.replace("/login");
  };
  return (
    <div className="admin-header">
      <div className="admin-header-top">
        <span>Welcome</span>
        <span>{props.user.username}</span>
        <LinkButton onClick={logout}>Logout</LinkButton>
      </div>
      <div className="admin-header-bottom">
        <span className="title">
          {props.location.pathname.replace("/", "")}
        </span>
        <span className="clock">
          {formatDate(clock, "yyyy-MM-dd hh-mm-ss")}
        </span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: "LOGOUT" }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminHeader));
