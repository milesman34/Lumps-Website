import { useSelector } from "react-redux";
import "./GameScoreHeader.css"

import GameScoreHeaderItem from "./score-header-item/GameScoreHeaderItem";

// This component displays the scores of the game
export default () => {
    const scores = useSelector(state => state.game.scores);

    // Score elements to display
    const scoreElements = scores.map((score, index) => <GameScoreHeaderItem key={index} score={score} id={index + 1} />);

    return (
        <div className="game-score-header" style={{ gridTemplateColumns: `repeat(${scores.length}, auto)` }}>
            {scoreElements}
        </div>
    );
}