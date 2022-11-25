import {
    Users,
    FileText,
    PieChart,
    Package,
    Layers,
    Home,
    Smile,
    FilePlus,
} from "react-feather";

const asideMenus = [
    {
        id: 1,
        label: "Bienvenidos",
        url: "/",
        Icon: PieChart,
        Rol: ["Admin", "User", "Guest"],
        submenu: [
            {
                id: 11,
                label: "Página Principal",
                url: "/home",
                Icon: Home,
                Rol: ["Admin", "User", "Guest"],
            },
        ],
    },
    {
        id: 2,
        label: "Socios",
        url: "/",
        Icon: Package,
        Rol: ["Admin", "User", "Guest"],
        submenu: [
            {
                id: 20,
                label: "Reconocer Socio",
                url: "/partners/recognize",
                Icon: Smile,
                Rol: ["Admin", "User", "Guest"],
            },
            {
                id: 21,
                label: "Listado de Socios",
                url: "/partners",
                Icon: Users,
                Rol: ["Admin", "User"],
            },
            {
                id: 22,
                label: "Alta de Multiples Socios",
                url: "/partners/create/batch",
                Icon: FilePlus,
                Rol: ["Admin", "User"],
            },
            {
                id: 23,
                label: "Alta de Socio",
                url: "/partners/create",
                Icon: FileText,
                Rol: ["Admin", "User"],
            },
        ],
    },
    {
        id: 3,
        label: "Usuarios",
        url: "/",
        Icon: Layers,
        Rol: ["Admin"],
        submenu: [
            {
                id: 23,
                label: "Listado de Usuarios",
                url: "/users",
                Icon: Users,
                Rol: ["Admin"],
            },
            {
                id: 24,
                label: "Alta de Usuario",
                url: "/users/create",
                Icon: FileText,
                Rol: ["Admin"],
            },
        ],
    },
];

export default asideMenus;
