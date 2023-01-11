import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import EditProfile from "./EditProfile";

const Profile = () => {
  return (
    <div className="card p-3">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 card-toolbar nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-3x"
      >
        <Tab
          eventKey="profile"
          title="Profile"
          tabClassName="nav-text font-size-lg"
        >
          <EditProfile />
        </Tab>
        <Tab eventKey="changePassword" tabClassName="nav-text font-size-lg" title="Change Password">
          changePassword
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
