import React, { useState } from 'react';
import axios from 'axios';
import './BlueprintList.css';

const BlueprintList = () => {
    const [author, setAuthor] = useState('');
    const [blueprints, setBlueprints] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);

    const getBlueprints = () => {
        axios.get(`http://localhost:8080/blueprints/${author}`)
            .then(response => {
                const blueprintData = response.data.map(bp => ({
                    name: bp.name,
                    points: bp.points.length
                }));
                setBlueprints(blueprintData);

                // Calculate total points
                const total = blueprintData.reduce((sum, bp) => sum + bp.points, 0);
                setTotalPoints(total);
            })
            .catch(error => {
                console.error("There was an error fetching the blueprints!", error);
            });
    };

    return (
        <div className="container">
            <h1>Blueprints</h1>
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
            />
            <button onClick={getBlueprints}>Get Blueprints</button>

            <h3>{author}'s blueprints:</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Blueprint name</th>
                        <th>Number of points</th>
                    </tr>
                </thead>
                <tbody>
                    {blueprints.map((bp, index) => (
                        <tr key={index}>
                            <td>{bp.name}</td>
                            <td>{bp.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>Total user points: {totalPoints}</h4>
        </div>
    );
};

export default BlueprintList;
