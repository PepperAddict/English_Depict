import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

DashboardSidebar.propTypes = {
  username: PropTypes.string, 
  email: PropTypes.string
};

export default function DashboardSidebar(props) {
  console.log(props);
  return (
    <Fragment>
      <div className="teacherInfo">
        <p>@{props.username}</p>
        <small>{props.email}</small>
      </div>
      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/dashboard/add_student">go to add student</a>
      </nav>
    </Fragment>
  );
}