import "./GameRollButton.css"

import { selectCanRollDice, selectNumMoreDiceToKeep } from "../../../../../../redux/selectors/game";
import { useDispatch, useSelector } from "react-redux";
import { rollDice } from "../../../../../../redux/actions/game";

// Component for the button that rolls the dice
export default () => {
    // Dispatch to use
    const dispatch = useDispatch();

    // Can the player roll the dice
    const canRoll = useSelector(selectCanRollDice);

    // How many more dice must the player keep
    const howManyMore = useSelector(selectNumMoreDiceToKeep);

    // Text for the roll dice button
    const rollDiceText = () => {
        if (canRoll) {
            return "Roll Dice";
        } else if (howManyMore === 1) {
            return "You must keep 1 more die"
        } else {
            return `You must keep ${howManyMore} more dice`
        }
    }

    // Handles clicks
    const handleClick = event => {
        event.preventDefault();

        if (canRoll) {
            dispatch(rollDice());
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <div onClick={handleClick} className={`roll-dice-button flex-center-column ${canRoll ? "roll-dice-can-roll app-button" : "roll-dice-cannot-roll app-button-inactive"}`}>
                {rollDiceText()}
            </div>
        </div>
    );
}