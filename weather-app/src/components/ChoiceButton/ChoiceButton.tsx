import "./ChoiceButton.css";
import { useState } from "react";

interface ChoiceButtonProps {
    ChoiceButtons: string[];
    onSelectedChoice: (choice: string) => void;
}

const ChoiceButton = ({
    ChoiceButtons,
    onSelectedChoice,
}: ChoiceButtonProps) => {
    const [selectedChoice, setSelectedChoice] = useState(-1);

    return (
        <>
            {ChoiceButtons.map((choice, index) => (
                <button
                    className={
                        (sessionStorage.getItem("selectedCountryIndex") ||
                            selectedChoice) === index
                            ? "choice-button active"
                            : "choice-button not-active"
                    }
                    key={index}
                    onClick={() => {
                        setSelectedChoice(index);
                        onSelectedChoice(choice);
                        localStorage.setItem("choice", JSON.stringify(choice));
                    }}
                    data-testid={`choice-button-${choice}`}
                >
                    {choice}
                </button>
            ))}
        </>
    );
};

export default ChoiceButton;
