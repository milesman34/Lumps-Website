import { useDispatch, useSelector } from "react-redux";
import { endTurn } from "../../../../../../redux/actions/game";
import { selectCurrentScore } from "../../../../../../redux/selectors/game";
import "./EndTurnButton.css"

export default () => {
    // Current dispatch
    const dispatch = useDispatch();

    // We need to get the score to pass to the end turn function
    const score = useSelector(selectCurrentScore);

    // Handles clicks
    const handleClick = event => {
        event.preventDefault();

        endTurn(dispatch, score);
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <div onClick={handleClick} className="end-turn-button">
                End Turn
            </div>
        </div>  
    );
}