export const menu = [
  {
    menu: "Dashboard",
    url: "dashboard",
    icon: "/media/svg/icons/Design/Layers.svg",
  },
  {
    menu: "Users",
    url: "users",
    icon: "/media/svg/icons/Communication/Group.svg",
    submenu: [
      {
        menu: "Users List",
        url: "users/users-list",
      },
      {
        menu: "Users Type List",
        url: "users/user-type-list",
      },
      {
        menu: "Add User",
        url: "users/add-user",
      },
      {
        menu: "User Roles",
        url: "users/user-roles",
      },
    ],
  },
  {
    menu: "Customer",
    url: "customer",
    icon: "/media/svg/icons/Communication/Group.svg",
    submenu: [
      {
        menu: "Customer List",
        url: "customer/customer-list",
      },
      {
        menu: "Customer Add",
        url: "customer/customer-add-corporate",
      },
      {
        menu: "Limit Setting",
        url: "customer/limit",
      },
      {
        menu: "Limit Approval",
        url: "customer/limit-approval",
      },
    ],
  },
  {
    menu: "Admin Setting",
    url: "admin-setting",
    icon: "/media/svg/icons/Communication/Group.svg",
    submenu: [
      {
        menu: "Store",
        url: "admin-setting/store",
      },
      {
        menu: "Unit",
        url: "admin-setting/unit",
      },
      {
        menu: "Wastage",
        url: "admin-setting/wastage",
        thirdmenu: true,
      },
      {
        menu: "Zone",
        url: "admin-setting/zone",
        thirdmenu: true,
      },
      {
        menu: "Delivery",
        url: "admin-setting/delivery",
        thirdmenu: true,
      },
      {
        menu: "Packaging",
        url: "admin-setting/packaging",
        thirdmenu: true,
      },
      {
        menu: "Fabrication",
        url: "admin-setting/fabrication",
        thirdmenu: true,
      },
    ],
  },
];
