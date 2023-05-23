import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import Link from '../components/Link';

function Project({ userName }) {
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState([]);
    const { name } = useParams();
    const items = [
        {
            field: 'html_url',
            value: <Link url={project.html_url}
                title={project.html_url} />,
        },
        {
            field: 'collaborators_url',
            value: <Link url={project.collaborators_url}
                title={project.collaborators_url} />,
        },
        { field: 'name', value: project.name },
        { field: 'created_at', value: project.created_at },
        { field: 'updated_at', value: project.updated_at },
        { field: 'default_branch', value: project.default_branch },
    ];

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`https://api.github.com/repos/${userName}/${name}`);
            const result = await data.json();
            if (result) {
                setProject(result);
                setLoading(false);
            }
        }
        if (userName && name) {
            fetchData();
        }
    }, [userName, name]);
    return (
        <div className='Project-container'>
            <h2>Project: {project.name}</h2>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    <List items={items} />
                </div>
            )}
        </div>
    );
}
export default Project;    