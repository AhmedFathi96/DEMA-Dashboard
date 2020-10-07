import Admins from "./views/pages/Admins";
import Statistics from "./views/pages/Statistics";
import Contacts from "./views/pages/Contacts";
import ItemInfo from "./views/pages/ItemInfo";
import Slider from "./views/pages/Slider";
import Info from "./views/pages/Info";
import About from "./views/pages/About";
import Collections from './views/pages/Collection';
import Category from './views/pages/Category';
import Team from './views/pages/Team';
import Products from './views/pages/Products';

const routes = [
  {

    icon: "ni ni-single-02 text-primary",
    path: "admins",
    name: "Admins",
    miniName: "D",
    component: Admins,
    layout: "/"
  },
  {

    icon: "ni ni-image text-primary",
    path: "slider",
    name: "Slider",
    miniName: "F",
    component: Slider,
    layout: "/"
  },
  {
    icon: "ni ni-paper-diploma text-primary",
    path: "about",
    name: "About",
    miniName: "F",
    component: About,
    layout: "/"
  },
  {

    icon: "ni ni-collection text-primary",
    path: "itemInfo",
    name: "ItemInfo",
    miniName: "I",
    component: ItemInfo,
    layout: "/"
  },
  {

    icon: "ni ni-collection text-primary",
    path: "collections",
    name: "Collections",
    miniName: "I",
    component: Collections,
    layout: "/"
  },
  {

    icon: "ni ni-collection text-primary",
    path: "category",
    name: "Categories",
    miniName: "I",
    component: Category,
    layout: "/"
  },
  
  {

    icon: "ni ni-chart-bar-32 text-primary",
    path: "Products",
    name: "Products",
    miniName: "p",
    component: Products,
    layout: "/"
  },

  {

    icon: "ni ni-chart-bar-32 text-primary",
    path: "statistics",
    name: "Statistics",
    miniName: "s",
    component: Statistics,
    layout: "/"
  },

  {

    icon: "ni ni-chart-bar-32 text-primary",
    path: "team",
    name: "Team",
    miniName: "F",
    component: Team,
    layout: "/"
  },
  
  {
    icon: "ni ni-email-83 text-primary",
    path: "contacts",
    name: "Contacts",
    miniName: "F",
    component: Contacts,
    layout: "/"
  },
  {
    icon: "ni ni-settings-gear-65 text-primary",
    path: "info",
    name: "Info",
    miniName: "F",
    component: Info,
    layout: "/"
  },
  
];

export default routes;
