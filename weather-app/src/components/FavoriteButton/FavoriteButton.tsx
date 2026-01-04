import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isCityinFavoriteList } from "../../utils/cityUtils";

interface FavButtonProps {
    cityName: string;
    favoritesList?: string[];
    size: number;
    onClickedFavorite: () => void;
}

const FavButton = ({
    cityName,
    favoritesList,
    size,
    onClickedFavorite,
}: FavButtonProps) => {
    const cityIsFavorite =
        favoritesList && isCityinFavoriteList(cityName, favoritesList);
    let newFavoritesList: string[] = [];

    /**
     * Toggles the favoritization of a specific city and updates favorites in local storage
     */
    const toogle = () => {
        if (cityIsFavorite) {
            newFavoritesList = favoritesList.filter(
                (city) => city !== cityName
            );
            localStorage.setItem("favorites", JSON.stringify(newFavoritesList));
        } else {
            newFavoritesList = favoritesList ? [...favoritesList] : [];
            newFavoritesList.push(cityName);
            localStorage.setItem("favorites", JSON.stringify(newFavoritesList));
        }
        onClickedFavorite();
    };

    if (cityIsFavorite)
        return (
            <AiFillHeart
                background="transparent"
                color="red"
                size={size}
                onClick={toogle}
                data-testid="heartIconId"
            />
        );
    else return <AiOutlineHeart size={size} onClick={toogle} />;
};

export default FavButton;
