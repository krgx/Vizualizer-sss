import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [option, setOption] = useState('option1');
    const [slider, setSlider] = useState(50);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [iframeSrc, setIframeSrc] = useState(''); // Инициализация пустой строки

    useEffect(() => {
        // Проверяем наличие кэшированного исходного кода iframe и устанавливаем его если есть
        const cachedIframeSrc = localStorage.getItem('cachedIframeSrc');
        if (cachedIframeSrc) {
            setIframeSrc(cachedIframeSrc);
        }
    }, []);

    const handleSubmit = () => {
        const params = new URLSearchParams({
            option,
            slider,
            text1,
            text2
        });
        // Подставить сайт в Src
        const newSrc = `https://www.epam.com/?${params.toString()}`;
        setIframeSrc(newSrc);

        // Кэшируем исходный код iframe на основе параметров
        localStorage.setItem('cachedIframeSrc', newSrc);
    };

    return (
        <div className="app">
            <h1>Vizualizer</h1>
            <div className="controls">
                <div className="control-group">
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="option1"
                            checked={option === 'option1'}
                            onChange={() => setOption('option1')}
                        /> OPTION 1
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="option"
                            value="option2"
                            checked={option === 'option2'}
                            onChange={() => setOption('option2')}
                        /> OPTION 2
                    </label>
                </div>
                <div className="control-group">
                    <label htmlFor="slider">Slider:</label>
                    <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="1"
                        max="100"
                        value={slider}
                        onChange={(e) => setSlider(e.target.value)}
                    />
                </div>
                <div className="control-group">
                    <label htmlFor="text1">Text 1:</label>
                    <input
                        type="text"
                        id="text1"
                        name="text1"
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                    />
                </div>
                <div className="control-group">
                    <label htmlFor="text2">Text 2:</label>
                    <input
                        type="text"
                        id="text2"
                        name="text2"
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>Apply</button>
            </div>
            <div className="iframe-container">
                <iframe
                    title="iframe"
                    className="iframe"
                    src={iframeSrc} // Динамически устанавка исходного кода iframe
                />
            </div>
        </div>
    );
};

export default App;
