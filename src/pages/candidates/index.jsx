import { useOutletContext } from "react-router";

const CandidatesPage = () => {

    const { candidates } = useOutletContext();

    return (
        <div className="page candidates-page">
            Candidates Page
            {candidates}
        </div>
    );
};

export default CandidatesPage;