import React, { useEffect } from 'react'

const ErrorDisplay = ({message, onDismiss}: {
    message: string;
    onDismiss: () => void;
}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 5000)
        return () => clearTimeout(timer);
    }, [message, onDismiss]);
    
  return (
    <div>ErrorDisplay</div>
  )
}

export default ErrorDisplay