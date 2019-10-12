export class SubMenu {
    name: string;
    alias: string;
    value: string;
}

export class Menu {
    name: string;
    value: string;
    subMenus: SubMenu[] = [];
}
