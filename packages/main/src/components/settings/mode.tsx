import { Check } from "react-feather";
import { TTheme } from "@doar/shared/types";
import { StyledMode, StyledSkinName } from "./style";
import { useMemo } from "react";
import { transformThemeLabel } from "../../utils/utils";

interface IProps {
    mode: TTheme;
    onClick: () => void;
    active?: boolean;
}

const Mode = ({ active, mode, onClick }: IProps) => {
    const labelMode = useMemo(() => transformThemeLabel(mode), [mode]);

    return (
        <>
            <StyledMode
                type="button"
                $mode={mode}
                data-title={mode}
                $active={active}
                onClick={onClick}
            >
                <Check width={14} height={14} />
                <span />
                <span />
            </StyledMode>
            <StyledSkinName>{labelMode}</StyledSkinName>
        </>
    );
};

export default Mode;
