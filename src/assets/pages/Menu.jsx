import TwoItems from "../../Component/TwoItems";
import SelectVN from "../../Component/SelectVN";
import Input from "../../Component/Input";
import Menuheader from "../../Component/Menuheader";
import MenuBox from "../../Component/MenuBox";
import { getmenu } from "../../ApiFeature";
import { useLoaderData } from "react-router-dom";
import Seemore from "../../Component/Seemore";
function Menu() {
  const menu = useLoaderData();
  //const navigator = useNavigation();
  return (
    <div className="max-h-screen h-screen  p-1">
      <Menuheader />
      <Input />
      <MenuBox menu={menu} />
      <SelectVN />
      <TwoItems menu={menu} />
      <Seemore />
    </div>
  );
}

export async function menuloader() {
  const menu = await getmenu();
  return menu;
}
export default Menu;
