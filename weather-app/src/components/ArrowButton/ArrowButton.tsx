import "./ArrowButton.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface ArrowButtonProps {
    forward: boolean;
}

const ArrowButton = ({ forward }: ArrowButtonProps) => {
    return (
        <>
            <section className="arrow-button" data-testid="arrow-button">
                {forward ? (
                    <FaChevronRight size={80} />
                ) : (
                    <FaChevronLeft size={80} />
                )}
            </section>
        </>
    );
};

export default ArrowButton;
