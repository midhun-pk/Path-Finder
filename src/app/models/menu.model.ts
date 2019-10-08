export class SubMenu {
    name: string;
    value: string;
}

export class Menu {
    name: string;
    value: string;
    subMenus: SubMenu[] = [];
}
