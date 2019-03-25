import React, { useState }from 'react';
import './loading.css'

const Loading = () => {

    const [isLoading, setIsLoading] = useState();


    return (
        <p id='loading'>기달</p>
    )
}

export default Loading