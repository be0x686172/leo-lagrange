import './style.scss';
import { X } from 'lucide-react';
import ButtonUI from '../../components/ui/button';
import SwitchUI from '../../components/ui/switch';
import SelectUI from '../../components/ui/select';

const FiltersModal = ({ version, isOpen, onClose, filters, onFiltersChange }) => {
    if (!isOpen) return null;

    const handleFilterChange = (key, value) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    const handleReset = () => {
        const resetFilters = Object.keys(filters).reduce((acc, key) => {
            if (key === 'candidates_access' || key === 'interviews_access' || key === 'application_status' || key === 'interview_status' || key === 'interview_decision') {
                acc[key] = '';
            }
            return acc;
        }, {});
        onFiltersChange(resetFilters);
    };

    return (
        <div className='filters-modal-overlay' onClick={onClose}>
            <div className='filters-modal' onClick={(e) => e.stopPropagation()}>
                <div className='filters-modal-header'>
                    <h2>Filtres</h2>
                    <X className='close-icon' onClick={onClose} />
                </div>

                <div className='filters-modal-content'>
                    {version === 'users' && (
                        <>
                            <div className='filter-group'>
                                <label>Accès candidats</label>
                                <div className='filter-options'>
                                    <label className='checkbox-label'>
                                        <input
                                            type='checkbox'
                                            checked={filters.candidates_access === 'yes'}
                                            onChange={(e) => handleFilterChange('candidates_access', e.target.checked ? 'yes' : '')}
                                        />
                                        <span>Oui</span>
                                    </label>
                                    <label className='checkbox-label'>
                                        <input
                                            type='checkbox'
                                            checked={filters.candidates_access === 'no'}
                                            onChange={(e) => handleFilterChange('candidates_access', e.target.checked ? 'no' : '')}
                                        />
                                        <span>Non</span>
                                    </label>
                                </div>
                            </div>

                            <div className='filter-group'>
                                <label>Accès entretiens</label>
                                <div className='filter-options'>
                                    <label className='checkbox-label'>
                                        <input
                                            type='checkbox'
                                            checked={filters.interviews_access === 'yes'}
                                            onChange={(e) => handleFilterChange('interviews_access', e.target.checked ? 'yes' : '')}
                                        />
                                        <span>Oui</span>
                                    </label>
                                    <label className='checkbox-label'>
                                        <input
                                            type='checkbox'
                                            checked={filters.interviews_access === 'no'}
                                            onChange={(e) => handleFilterChange('interviews_access', e.target.checked ? 'no' : '')}
                                        />
                                        <span>Non</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    {version === 'candidates' && (
                        <>
                            <div className='filter-group'>
                                <label>Statut de candidature</label>
                                <div className='filter-options'>
                                    {['À rappeler', 'RDV à prendre', 'intéressé'].map((status) => (
                                        <label key={status} className='checkbox-label'>
                                            <input
                                                type='checkbox'
                                                checked={filters.application_status === status}
                                                onChange={(e) => handleFilterChange('application_status', e.target.checked ? status : '')}
                                            />
                                            <span>{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {version === 'interviews' && (
                        <>
                            <div className='filter-group'>
                                <label>Statut d'entretien</label>
                                <div className='filter-options'>
                                    {['À traiter', 'Présent(e)', 'Absent(e)'].map((status) => (
                                        <label key={status} className='checkbox-label'>
                                            <input
                                                type='checkbox'
                                                checked={filters.interview_status === status}
                                                onChange={(e) => handleFilterChange('interview_status', e.target.checked ? status : '')}
                                            />
                                            <span>{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className='filter-group'>
                                <label>Décision</label>
                                <div className='filter-options'>
                                    {['En attente', 'Éligible', 'Non éligible', 'Sélectionné(e)'].map((decision) => (
                                        <label key={decision} className='checkbox-label'>
                                            <input
                                                type='checkbox'
                                                checked={filters.interview_decision === decision}
                                                onChange={(e) => handleFilterChange('interview_decision', e.target.checked ? decision : '')}
                                            />
                                            <span>{decision}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className='filters-modal-footer'>
                    <ButtonUI text={'Réinitialiser'} className={'button-tertiary'} action={handleReset} />
                    <ButtonUI text={'Fermer'} className={'button-primary'} action={onClose} />
                </div>
            </div>
        </div>
    );
};

export default FiltersModal;
