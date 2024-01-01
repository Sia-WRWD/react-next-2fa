import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmarkCircle, faCircleCheck, faQuestion } from '@fortawesome/free-solid-svg-icons'

const Alert = ({ alertId, alertType, message }) => {
    const [alertClasses, setAlertClasses] = useState('');
    const [alertIcon, setAlertIcon] = useState(faQuestion);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        // Reset classes
        setAlertClasses('');

        // Add classes based on alertType
        if (alertType === 'success') {
            setAlertIcon(faCircleCheck);
            setAlertClasses('bg-green-700');
        } else if (alertType === 'warning') {
            setAlertIcon(faTriangleExclamation);
            setAlertClasses('bg-amber-500');
        } else if (alertType === 'error') {
            setAlertIcon(faXmarkCircle);
            setAlertClasses('bg-red-700');
        }

        if (message) {
            setIsVisible(true);
        }

        // Hide the alert after 3000 milliseconds (3 seconds)
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(hideTimer);
    }, [alertId, alertType]);

    return (
        <div className={`float-left fixed left-2 bottom-2 p-2 border-2 rounded border-white w-1/4 text-white ${alertClasses}`} style={{ display: isVisible ? 'block' : 'none' }}>
            <span className="flex flex-row items-center justify-center">
                <div className="mr-4 text-3xl">
                    <FontAwesomeIcon icon={alertIcon}/>
                </div>
                <div className="text-sm">
                    {message}
                </div>
            </span>
        </div>
    );
};

export default Alert;
