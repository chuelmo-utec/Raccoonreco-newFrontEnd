import {
    Users,
    FileText,
    PieChart,
    Package,
    Layers,
    Home
} from "react-feather";

const asideMenus = [
    {
        id: 1,
        label: "Bienvenidos",
        url: "/",
        Icon: PieChart,
        submenu: [
            {
                id: 11,
                label: "Página Principal",
                url: "/home",
                Icon: Home,
            },
        ],
    },
    {
        id: 2,
        label: "Socios",
        url: "/",
        Icon: Package,
        submenu: [
            {
                id: 21,
                label: "Listado de Socios",
                url: "/partners",
                Icon: Users,
            },
            {
                id: 22,
                label: "Alta de Socio",
                url: "/partners/create",
                Icon: FileText,
            },
        ],
    },
    {
        id: 3,
        label: "Usuarios",
        url: "/",
        Icon: Layers,
        submenu: [
            {
                id: 23,
                label: "Listado de Usuarios",
                url: "/users",
                Icon: Users,
            },
            {
                id: 24,
                label: "Alta de Usuario",
                url: "/users/create",
                Icon: FileText,
            },
        ],
    },
];

export default asideMenus;
