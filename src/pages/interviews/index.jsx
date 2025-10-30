import { useOutletContext } from 'react-router';

const InterviewsPage = () => {

    const interviews = useOutletContext();

    return (
        <div className="page interviews-page">
            Interviews Page
            {interviews}
        </div>
    );
};

export default InterviewsPage;