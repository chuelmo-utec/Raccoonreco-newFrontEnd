import { TTheme } from "@doar/shared/types";

export const getInitialAvatar = (name: string) => {
    if (name.trim() !== "") {
        const avatarSplit = name.split(" ");
        let avatar = "";
        avatarSplit.forEach((word) => {
            avatar = `${avatar}${word[0]}`;
        });
        return avatar;
    }
};

export const transformThemeLabel = (themeLabel: TTheme) => {
    switch (themeLabel) {
        case "classic":
            return "clásico";
        case "light":
            return "claro";
        case "dark":
            return "oscuro";
        case "cool":
            return "fresco";
        default:
            return "clásico";
    }
};
